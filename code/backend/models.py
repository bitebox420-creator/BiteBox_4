from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime
import json

db = SQLAlchemy()

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    password_hash = db.Column(db.String(255))
    role = db.Column(db.String(20), default='student')  # student, parent, admin, vendor, nurse
    student_id = db.Column(db.String(50), unique=True)
    class_name = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Parent-Child relationship (self-referential)
    parent_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    # Health profile
    health_profile = db.relationship('HealthProfile', backref='user', uselist=False)
    orders = db.relationship('Order', backref='student', lazy=True)
    
    def get_children(self):
        return User.query.filter_by(parent_id=self.id).all()

class HealthProfile(db.Model):
    __tablename__ = 'health_profiles'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    height = db.Column(db.Float)
    weight = db.Column(db.Float)
    bmi = db.Column(db.Float)
    fitness_goal = db.Column(db.String(100))
    allergies = db.Column(db.Text)  # JSON array
    dietary_preferences = db.Column(db.Text)  # JSON array
    health_points = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class MenuItem(db.Model):
    __tablename__ = 'menu_items'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    calories = db.Column(db.Integer)
    protein = db.Column(db.Float)
    carbs = db.Column(db.Float)
    fats = db.Column(db.Float)
    health_score = db.Column(db.Integer, default=0)
    image_url = db.Column(db.String(500))
    is_vegetarian = db.Column(db.Boolean, default=False)
    is_vegan = db.Column(db.Boolean, default=False)
    is_gluten_free = db.Column(db.Boolean, default=False)
    is_available = db.Column(db.Boolean, default=True)
    stock = db.Column(db.Integer, default=0)
    allergens = db.Column(db.Text)  # JSON array
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, preparing, ready, completed, cancelled
    order_type = db.Column(db.String(20), default='regular')  # regular, subscription, group, preorder
    pickup_time = db.Column(db.DateTime)
    delivery_location = db.Column(db.String(100))
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    items = db.relationship('OrderItem', backref='order', lazy=True, cascade='all, delete-orphan')
    invoice = db.relationship('Invoice', backref='order', uselist=False)

class OrderItem(db.Model):
    __tablename__ = 'order_items'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    menu_item_id = db.Column(db.Integer, db.ForeignKey('menu_items.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    price = db.Column(db.Float)
    
    menu_item = db.relationship('MenuItem', backref='order_items')

class Invoice(db.Model):
    __tablename__ = 'invoices'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    invoice_number = db.Column(db.String(50), unique=True)
    amount = db.Column(db.Float)
    tax = db.Column(db.Float, default=0)
    total = db.Column(db.Float)
    pdf_path = db.Column(db.String(255))
    generated_at = db.Column(db.DateTime, default=datetime.utcnow)

class SubscriptionPlan(db.Model):
    __tablename__ = 'subscription_plans'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    plan_type = db.Column(db.String(20))  # weekly, monthly
    price = db.Column(db.Float)
    meals_per_week = db.Column(db.Integer)
    discount_percentage = db.Column(db.Float, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Subscription(db.Model):
    __tablename__ = 'subscriptions'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    plan_id = db.Column(db.Integer, db.ForeignKey('subscription_plans.id'), nullable=False)
    start_date = db.Column(db.DateTime, default=datetime.utcnow)
    end_date = db.Column(db.DateTime)
    is_active = db.Column(db.Boolean, default=True)
    
    plan = db.relationship('SubscriptionPlan', backref='subscriptions')

class ParentalControl(db.Model):
    __tablename__ = 'parental_controls'
    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    child_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    approved_items = db.Column(db.Text)  # JSON array
    blocked_items = db.Column(db.Text)  # JSON array
    daily_limit = db.Column(db.Float)
    spending_limit = db.Column(db.Float)
    require_approval = db.Column(db.Boolean, default=False)
    allowed_categories = db.Column(db.Text)  # JSON array
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Gamification(db.Model):
    __tablename__ = 'gamification'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    health_points = db.Column(db.Integer, default=0)
    rank = db.Column(db.Integer, default=0)
    badges = db.Column(db.Text)  # JSON array
    total_healthy_meals = db.Column(db.Integer, default=0)
    streak_days = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Notification(db.Model):
    __tablename__ = 'notifications'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(200))
    message = db.Column(db.Text)
    type = db.Column(db.String(50))  # order_ready, low_balance, new_item, etc
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Feedback(db.Model):
    __tablename__ = 'feedback'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    rating = db.Column(db.Integer)
    comment = db.Column(db.Text)
    category = db.Column(db.String(50))  # food_quality, service, hygiene, etc
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Analytics(db.Model):
    __tablename__ = 'analytics'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, default=datetime.utcnow)
    total_orders = db.Column(db.Integer, default=0)
    total_revenue = db.Column(db.Float, default=0)
    popular_items = db.Column(db.Text)  # JSON
    low_stock_items = db.Column(db.Text)  # JSON
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
