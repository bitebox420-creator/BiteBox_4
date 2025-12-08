import os
from flask import Flask, jsonify, request, render_template, redirect, url_for, session, send_file
from flask_cors import CORS
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
from io import BytesIO
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib import colors
import json
import random
import requests

from models import db, User, HealthProfile, MenuItem, Order, OrderItem, Invoice, SubscriptionPlan, Subscription, ParentalControl, Gamification, Notification, Feedback, Analytics

app = Flask(__name__, template_folder='../frontend', static_folder='../frontend/static')
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'bitebox-secret-key-2024')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app, supports_credentials=True)
db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login_page'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

def send_order_email(order_data):
    """Send order notification to bitebox105@gmail.com via Formspree"""
    formspree_url = "https://formspree.io/f/movglgrr"
    
    email_content = f"""
    New Order Received!
    
    Order ID: {order_data['order_id']}
    Student Name: {order_data['student_name']}
    Student ID: {order_data['student_id']}
    Class: {order_data['class_name']}
    Total Amount: ₹{order_data['total_amount']}
    Order Date: {order_data['order_date']}
    
    Items Ordered:
    {order_data['items_list']}
    
    Status: {order_data['status']}
    """
    
    payload = {
        "email": "bitebox105@gmail.com",
        "message": email_content,
        "order_id": order_data['order_id'],
        "student_name": order_data['student_name'],
        "total_amount": order_data['total_amount']
    }
    
    try:
        response = requests.post(formspree_url, json=payload)
        return response.status_code == 200
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

def seed_menu_items():
    items = [
        {"name": "Red Apple", "category": "Fruits", "price": 15, "calories": 95, "protein": 0.5, "carbs": 25, "fats": 0.3, "health_score": 9, "is_vegetarian": True, "is_vegan": True, "image_url": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400", "description": "Crisp and sweet, excellent source of fiber and vitamin C"},
        {"name": "Banana", "category": "Fruits", "price": 10, "calories": 105, "protein": 1.3, "carbs": 27, "fats": 0.4, "health_score": 8, "is_vegetarian": True, "is_vegan": True, "image_url": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400", "description": "Energy-boosting, rich in potassium"},
        {"name": "Orange", "category": "Fruits", "price": 12, "calories": 62, "protein": 1.2, "carbs": 15, "fats": 0.2, "health_score": 9, "is_vegetarian": True, "is_vegan": True, "image_url": "https://images.unsplash.com/photo-1547514701-42782101795e?w=400", "description": "Packed with Vitamin C"},
        {"name": "Mixed Green Salad", "category": "Salads", "price": 35, "calories": 30, "protein": 2, "carbs": 5, "fats": 0.5, "health_score": 10, "is_vegetarian": True, "is_vegan": True, "image_url": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400", "description": "Fresh mixed greens with cucumber and tomatoes"},
        {"name": "Quinoa Power Bowl", "category": "Meals", "price": 65, "calories": 220, "protein": 8, "carbs": 35, "fats": 6, "health_score": 9, "is_vegetarian": True, "is_vegan": True, "image_url": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400", "description": "Complete protein grain with vegetables"},
        {"name": "Whole Wheat Sandwich", "category": "Meals", "price": 45, "calories": 220, "protein": 12, "carbs": 30, "fats": 5, "health_score": 8, "is_vegetarian": True, "image_url": "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400", "description": "Fresh vegetables and hummus on whole grain bread"},
        {"name": "Oatmeal Bowl", "category": "Breakfast", "price": 35, "calories": 150, "protein": 5, "carbs": 27, "fats": 3, "health_score": 9, "is_vegetarian": True, "image_url": "https://images.unsplash.com/photo-1517673132405-a56a6b18caf1?w=400", "description": "Warm oats topped with fresh fruits and nuts"},
        {"name": "Greek Yogurt", "category": "Proteins", "price": 35, "calories": 130, "protein": 15, "carbs": 8, "fats": 4, "health_score": 9, "is_vegetarian": True, "image_url": "https://images.unsplash.com/photo-1488477304112-4944851de03d?w=400", "description": "Probiotic-rich Greek yogurt"},
        {"name": "Coconut Water", "category": "Beverages", "price": 30, "calories": 45, "protein": 0, "carbs": 11, "fats": 0, "health_score": 8, "is_vegetarian": True, "is_vegan": True, "image_url": "https://images.unsplash.com/photo-1585121267405-24a4ee8a5cde?w=400", "description": "Natural electrolyte drink"},
        {"name": "Mixed Nuts", "category": "Snacks", "price": 35, "calories": 160, "protein": 5, "carbs": 6, "fats": 14, "health_score": 8, "is_vegetarian": True, "is_vegan": True, "image_url": "https://images.unsplash.com/photo-1599599810694-57a2ca8276a8?w=400", "description": "Almonds, walnuts, and cashews mix"},
        
        {"name": "Fresh Orange Juice", "category": "Beverages", "price": 35, "calories": 110, "protein": 2, "carbs": 26, "fats": 0, "health_score": 8, "is_vegetarian": True, "is_vegan": True, "image_url": "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400", "description": "Freshly squeezed orange juice"},
        {"name": "Brown Rice Bowl", "category": "Meals", "price": 55, "calories": 195, "protein": 4, "carbs": 45, "fats": 2, "health_score": 8, "is_vegetarian": True, "is_vegan": True, "image_url": "https://images.unsplash.com/photo-1586201375761-8e865001e31c?w=400", "description": "Nutty brown rice with steamed vegetables"},
        {"name": "Paneer Tikka", "category": "Proteins", "price": 60, "calories": 250, "protein": 18, "carbs": 8, "fats": 16, "health_score": 7, "is_vegetarian": True, "image_url": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400", "description": "Grilled cottage cheese with Indian spices"},
        {"name": "Masala Dosa", "category": "Breakfast", "price": 40, "calories": 180, "protein": 5, "carbs": 30, "fats": 5, "health_score": 7, "is_vegetarian": True, "is_vegan": True, "image_url": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400", "description": "Crispy South Indian crepe with potato filling"},
    ]
    
    for item in items:
        menu_item = MenuItem(
            name=item["name"],
            category=item["category"],
            price=item["price"],
            calories=item["calories"],
            protein=item.get("protein", 0),
            carbs=item.get("carbs", 0),
            fats=item.get("fats", 0),
            health_score=item["health_score"],
            is_vegetarian=item.get("is_vegetarian", False),
            is_vegan=item.get("is_vegan", False),
            is_gluten_free=item.get("is_gluten_free", False),
            image_url=item["image_url"],
            description=item["description"],
            stock=random.randint(20, 100)
        )
        db.session.add(menu_item)
    
    plans = [
        {"name": "Weekly Healthy Pack", "description": "5 healthy meals per week", "plan_type": "weekly", "price": 299, "meals_per_week": 5, "discount_percentage": 10},
        {"name": "Monthly Diet Pack", "description": "22 meals per month with personalized diet", "plan_type": "monthly", "price": 999, "meals_per_week": 22, "discount_percentage": 15},
        {"name": "Student Premium Pack", "description": "Daily healthy meals with nutrition tracking", "plan_type": "monthly", "price": 1499, "meals_per_week": 30, "discount_percentage": 20},
    ]
    
    for plan in plans:
        sub_plan = SubscriptionPlan(**plan)
        db.session.add(sub_plan)
    
    db.session.commit()

# Initialize database
with app.app_context():
    db.create_all()
    if MenuItem.query.count() == 0:
        seed_menu_items()

# ==================== PAGE ROUTES ====================

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login_page():
    return render_template('login.html')

@app.route('/register')
def register_page():
    return render_template('register.html')

@app.route('/dashboard')
@login_required
def dashboard():
    if current_user.role == 'parent':
        return render_template('parent_dashboard.html')
    elif current_user.role == 'admin':
        return render_template('admin_dashboard.html')
    elif current_user.role == 'vendor':
        return render_template('vendor_dashboard.html')
    return render_template('student_dashboard.html')

@app.route('/menu')
def menu_page():
    return render_template('menu.html')

# ==================== AUTH API ====================

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400
    
    role = data.get('role', 'student')
    
    user = User(
        email=data['email'],
        name=data['name'],
        password_hash=generate_password_hash(data['password']),
        role=role,
        student_id=data.get('student_id') if role == 'student' else None,
        class_name=data.get('class_name') if role == 'student' else None
    )
    db.session.add(user)
    db.session.commit()
    
    health_profile = HealthProfile(user_id=user.id)
    gamification = Gamification(user_id=user.id)
    db.session.add(health_profile)
    db.session.add(gamification)
    db.session.commit()
    
    login_user(user)
    return jsonify({'message': 'Registration successful', 'user': {'id': user.id, 'name': user.name, 'role': user.role}})

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    
    if user and check_password_hash(user.password_hash, data['password']):
        login_user(user)
        return jsonify({'message': 'Login successful', 'user': {'id': user.id, 'name': user.name, 'role': user.role, 'email': user.email}})
    
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/auth/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'})

@app.route('/api/auth/me')
@login_required
def get_current_user():
    return jsonify({
        'id': current_user.id,
        'name': current_user.name,
        'email': current_user.email,
        'role': current_user.role,
        'student_id': current_user.student_id,
        'class_name': current_user.class_name
    })

# ==================== MENU API ====================

@app.route('/api/menu')
def get_menu():
    category = request.args.get('category')
    query = MenuItem.query.filter_by(is_available=True, is_vegetarian=True)
    
    if category:
        query = query.filter_by(category=category)
    
    items = query.all()
    return jsonify([{
        'id': item.id,
        'name': item.name,
        'description': item.description,
        'category': item.category,
        'price': item.price,
        'calories': item.calories,
        'protein': item.protein,
        'carbs': item.carbs,
        'fats': item.fats,
        'health_score': item.health_score,
        'image_url': item.image_url,
        'is_vegetarian': item.is_vegetarian,
        'is_vegan': item.is_vegan,
        'is_gluten_free': item.is_gluten_free,
        'stock': item.stock
    } for item in items])

@app.route('/api/menu/categories')
def get_categories():
    categories = db.session.query(MenuItem.category).distinct().all()
    return jsonify([c[0] for c in categories])

@app.route('/api/menu/search')
def search_menu():
    query = request.args.get('q', '')
    max_price = request.args.get('max_price', type=float)
    min_protein = request.args.get('min_protein', type=float)
    max_calories = request.args.get('max_calories', type=int)
    vegetarian = request.args.get('vegetarian', type=bool)
    
    items = MenuItem.query.filter(MenuItem.is_available == True, MenuItem.is_vegetarian == True)
    
    if query:
        items = items.filter(MenuItem.name.ilike(f'%{query}%') | MenuItem.description.ilike(f'%{query}%'))
    if max_price:
        items = items.filter(MenuItem.price <= max_price)
    if min_protein:
        items = items.filter(MenuItem.protein >= min_protein)
    if max_calories:
        items = items.filter(MenuItem.calories <= max_calories)
    if vegetarian:
        items = items.filter(MenuItem.is_vegetarian == True)
    
    return jsonify([{
        'id': item.id,
        'name': item.name,
        'description': item.description,
        'category': item.category,
        'price': item.price,
        'calories': item.calories,
        'protein': item.protein,
        'health_score': item.health_score,
        'image_url': item.image_url
    } for item in items.all()])

# ==================== ORDER API ====================

@app.route('/api/orders', methods=['POST'])
@login_required
def create_order():
    data = request.json
    
    if not data or not data.get('items') or len(data['items']) == 0:
        return jsonify({'error': 'Cart is empty'}), 400
    
    total = 0
    health_points_earned = 0
    order_items_to_add = []
    
    for item_data in data['items']:
        menu_item = MenuItem.query.get(item_data['menu_item_id'])
        if not menu_item:
            return jsonify({'error': f'Menu item {item_data["menu_item_id"]} not found'}), 400
        if not menu_item.is_available:
            return jsonify({'error': f'{menu_item.name} is not available'}), 400
        if menu_item.stock < item_data['quantity']:
            return jsonify({'error': f'Insufficient stock for {menu_item.name}. Only {menu_item.stock} available'}), 400
        
        order_items_to_add.append({
            'menu_item': menu_item,
            'quantity': item_data['quantity'],
            'price': menu_item.price
        })
        total += menu_item.price * item_data['quantity']
        
        if menu_item.health_score >= 7:
            health_points_earned += menu_item.health_score * item_data['quantity']
    
    order = Order(
        student_id=current_user.id,
        total_amount=total,
        order_type=data.get('order_type', 'regular'),
        pickup_time=datetime.strptime(data['pickup_time'], '%Y-%m-%dT%H:%M') if data.get('pickup_time') else None,
        delivery_location=data.get('delivery_location'),
        notes=data.get('notes')
    )
    db.session.add(order)
    db.session.flush()
    
    for item_info in order_items_to_add:
        order_item = OrderItem(
            order_id=order.id,
            menu_item_id=item_info['menu_item'].id,
            quantity=item_info['quantity'],
            price=item_info['price']
        )
        db.session.add(order_item)
        item_info['menu_item'].stock -= item_info['quantity']
    
    gamification = Gamification.query.filter_by(user_id=current_user.id).first()
    if not gamification:
        gamification = Gamification(user_id=current_user.id, health_points=0, total_healthy_meals=0, streak_days=0, rank=0)
        db.session.add(gamification)
        db.session.flush()
    
    current_points = gamification.health_points or 0
    current_meals = gamification.total_healthy_meals or 0
    
    gamification.health_points = current_points + health_points_earned
    if health_points_earned > 0:
        gamification.total_healthy_meals = current_meals + 1
    
    db.session.commit()
    
    # Send email notification via Formspree
    email_data = {
        'order_id': order.id,
        'student_name': current_user.name,
        'student_id': current_user.student_id or 'N/A',
        'class_name': current_user.class_name or 'N/A',
        'total_amount': total,
        'order_date': order.created_at.strftime('%Y-%m-%d %H:%M:%S'),
        'items_list': '\n'.join([f"{item.menu_item.name} x{item.quantity} - ₹{item.price * item.quantity}" for item in order.items]),
        'status': order.status
    }
    send_order_email(email_data)
    
    return jsonify({
        'message': 'Order placed successfully',
        'order_id': order.id,
        'total': total,
        'health_points_earned': health_points_earned
    })

@app.route('/api/orders')
@login_required
def get_orders():
    from sqlalchemy.orm import joinedload
    
    if current_user.role == 'admin' or current_user.role == 'vendor':
        orders = Order.query.options(
            joinedload(Order.items).joinedload(OrderItem.menu_item)
        ).order_by(Order.created_at.desc()).all()
    else:
        orders = Order.query.filter_by(student_id=current_user.id).options(
            joinedload(Order.items).joinedload(OrderItem.menu_item)
        ).order_by(Order.created_at.desc()).all()
    
    return jsonify([{
        'id': order.id,
        'total_amount': order.total_amount,
        'status': order.status,
        'order_type': order.order_type,
        'created_at': order.created_at.isoformat(),
        'items': [{
            'name': item.menu_item.name if item.menu_item else 'Unknown',
            'quantity': item.quantity,
            'price': item.price
        } for item in order.items]
    } for order in orders])

@app.route('/api/orders/<int:order_id>/status', methods=['PUT'])
@login_required
def update_order_status(order_id):
    if current_user.role not in ['admin', 'vendor']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    order = Order.query.get_or_404(order_id)
    data = request.json
    order.status = data['status']
    db.session.commit()
    
    notification = Notification(
        user_id=order.student_id,
        title=f'Order #{order.id} Update',
        message=f'Your order status has been updated to: {order.status}',
        type='order_update'
    )
    db.session.add(notification)
    db.session.commit()
    
    return jsonify({'message': 'Order status updated'})

# ==================== PARENT DASHBOARD API ====================

@app.route('/api/parent/children')
@login_required
def get_children():
    if current_user.role != 'parent':
        return jsonify({'error': 'Unauthorized'}), 403
    
    children = User.query.filter_by(parent_id=current_user.id).all()
    return jsonify([{
        'id': child.id,
        'name': child.name,
        'class_name': child.class_name,
        'student_id': child.student_id
    } for child in children])

@app.route('/api/parent/child/<int:child_id>/nutrition')
@login_required
def get_child_nutrition(child_id):
    if current_user.role != 'parent':
        return jsonify({'error': 'Unauthorized'}), 403
    
    child = User.query.get_or_404(child_id)
    if child.parent_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    week_ago = datetime.utcnow() - timedelta(days=7)
    orders = Order.query.filter(Order.student_id == child_id, Order.created_at >= week_ago).all()
    
    total_calories = 0
    total_protein = 0
    total_spending = 0
    categories = {}
    
    for order in orders:
        total_spending += order.total_amount
        for item in order.items:
            total_calories += (item.menu_item.calories or 0) * item.quantity
            total_protein += (item.menu_item.protein or 0) * item.quantity
            cat = item.menu_item.category
            categories[cat] = categories.get(cat, 0) + item.quantity
    
    return jsonify({
        'weekly_calories': total_calories,
        'weekly_protein': total_protein,
        'weekly_spending': total_spending,
        'category_breakdown': categories,
        'orders_count': len(orders)
    })

@app.route('/api/parent/child/<int:child_id>/controls', methods=['GET', 'POST'])
@login_required
def manage_parental_controls(child_id):
    if current_user.role != 'parent':
        return jsonify({'error': 'Unauthorized'}), 403
    
    child = User.query.get_or_404(child_id)
    if child.parent_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    if request.method == 'POST':
        data = request.json
        control = ParentalControl.query.filter_by(parent_id=current_user.id, child_id=child_id).first()
        
        if not control:
            control = ParentalControl(parent_id=current_user.id, child_id=child_id)
            db.session.add(control)
        
        control.approved_items = json.dumps(data.get('approved_items', []))
        
        blocked_items = data.get('blocked_items', [])
        if data.get('block_junk_food') and 'junk_food' not in blocked_items:
            blocked_items.append('junk_food')
        if data.get('block_sugary_drinks') and 'sugary_drinks' not in blocked_items:
            blocked_items.append('sugary_drinks')
        control.blocked_items = json.dumps(blocked_items)
        
        control.daily_limit = data.get('daily_limit')
        control.spending_limit = data.get('spending_limit')
        control.require_approval = data.get('require_approval', False)
        control.allowed_categories = json.dumps(data.get('allowed_categories', []))
        
        db.session.commit()
        return jsonify({'message': 'Parental controls updated'})
    
    control = ParentalControl.query.filter_by(parent_id=current_user.id, child_id=child_id).first()
    if control:
        blocked_items = json.loads(control.blocked_items or '[]')
        return jsonify({
            'approved_items': json.loads(control.approved_items or '[]'),
            'blocked_items': blocked_items,
            'daily_limit': control.daily_limit,
            'spending_limit': control.spending_limit,
            'require_approval': control.require_approval,
            'allowed_categories': json.loads(control.allowed_categories or '[]'),
            'block_junk_food': 'junk_food' in blocked_items,
            'block_sugary_drinks': 'sugary_drinks' in blocked_items
        })
    return jsonify({})

# ==================== ADMIN ANALYTICS API ====================

@app.route('/api/admin/analytics')
@login_required
def get_analytics():
    if current_user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    today = datetime.utcnow().date()
    week_ago = today - timedelta(days=7)
    month_ago = today - timedelta(days=30)
    
    daily_orders = Order.query.filter(db.func.date(Order.created_at) == today).all()
    weekly_orders = Order.query.filter(Order.created_at >= week_ago).all()
    monthly_orders = Order.query.filter(Order.created_at >= month_ago).all()
    
    daily_revenue = sum(o.total_amount for o in daily_orders)
    weekly_revenue = sum(o.total_amount for o in weekly_orders)
    monthly_revenue = sum(o.total_amount for o in monthly_orders)
    
    item_sales = db.session.query(
        MenuItem.name,
        db.func.sum(OrderItem.quantity).label('total_sold')
    ).join(OrderItem).group_by(MenuItem.id).order_by(db.desc('total_sold')).limit(10).all()
    
    low_stock = MenuItem.query.filter(MenuItem.stock < 10).all()
    
    daily_sales = db.session.query(
        db.func.date(Order.created_at).label('date'),
        db.func.sum(Order.total_amount).label('revenue'),
        db.func.count(Order.id).label('orders')
    ).filter(Order.created_at >= week_ago).group_by(db.func.date(Order.created_at)).all()
    
    return jsonify({
        'daily_revenue': daily_revenue,
        'weekly_revenue': weekly_revenue,
        'monthly_revenue': monthly_revenue,
        'daily_orders_count': len(daily_orders),
        'weekly_orders_count': len(weekly_orders),
        'monthly_orders_count': len(monthly_orders),
        'top_items': [{'name': name, 'sold': sold} for name, sold in item_sales],
        'low_stock_items': [{'id': item.id, 'name': item.name, 'stock': item.stock} for item in low_stock],
        'daily_sales': [{'date': str(d), 'revenue': r, 'orders': o} for d, r, o in daily_sales]
    })

@app.route('/api/admin/inventory', methods=['GET', 'PUT'])
@login_required
def manage_inventory():
    if current_user.role not in ['admin', 'vendor']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    if request.method == 'PUT':
        data = request.json
        item = MenuItem.query.get_or_404(data['item_id'])
        item.stock = data['stock']
        item.is_available = data.get('is_available', item.is_available)
        db.session.commit()
        return jsonify({'message': 'Inventory updated'})
    
    items = MenuItem.query.all()
    return jsonify([{
        'id': item.id,
        'name': item.name,
        'stock': item.stock,
        'is_available': item.is_available,
        'category': item.category
    } for item in items])

# ==================== HEALTH & BMI API ====================

@app.route('/api/health/profile', methods=['GET', 'POST'])
@login_required
def manage_health_profile():
    profile = HealthProfile.query.filter_by(user_id=current_user.id).first()
    
    if request.method == 'POST':
        data = request.json
        if not profile:
            profile = HealthProfile(user_id=current_user.id)
            db.session.add(profile)
        
        profile.height = data.get('height')
        profile.weight = data.get('weight')
        profile.fitness_goal = data.get('fitness_goal')
        profile.allergies = json.dumps(data.get('allergies', []))
        profile.dietary_preferences = json.dumps(data.get('dietary_preferences', []))
        
        if profile.height and profile.weight:
            height_m = profile.height / 100
            profile.bmi = round(profile.weight / (height_m * height_m), 2)
        
        db.session.commit()
        return jsonify({'message': 'Profile updated', 'bmi': profile.bmi})
    
    if profile:
        return jsonify({
            'height': profile.height,
            'weight': profile.weight,
            'bmi': profile.bmi,
            'fitness_goal': profile.fitness_goal,
            'allergies': json.loads(profile.allergies or '[]'),
            'dietary_preferences': json.loads(profile.dietary_preferences or '[]'),
            'health_points': profile.health_points
        })
    return jsonify({})

@app.route('/api/health/diet-plan')
@login_required
def get_diet_plan():
    profile = HealthProfile.query.filter_by(user_id=current_user.id).first()
    
    if not profile or not profile.bmi:
        return jsonify({'error': 'Please update your health profile first'}), 400
    
    allergies = json.loads(profile.allergies or '[]')
    goal = profile.fitness_goal or 'maintain'
    
    items = MenuItem.query.filter(MenuItem.is_available == True, MenuItem.health_score >= 7).all()
    
    if goal == 'lose_weight':
        items = [i for i in items if i.calories < 200]
    elif goal == 'gain_muscle':
        items = [i for i in items if i.protein and i.protein > 10]
    
    breakfast = [i for i in items if i.category == 'Breakfast'][:2]
    lunch = [i for i in items if i.category == 'Meals'][:2]
    snacks = [i for i in items if i.category in ['Snacks', 'Fruits']][:3]
    dinner = [i for i in items if i.category == 'Meals'][2:4]
    
    return jsonify({
        'bmi': profile.bmi,
        'goal': goal,
        'plan': {
            'breakfast': [{'name': i.name, 'calories': i.calories, 'protein': i.protein} for i in breakfast],
            'lunch': [{'name': i.name, 'calories': i.calories, 'protein': i.protein} for i in lunch],
            'snacks': [{'name': i.name, 'calories': i.calories, 'protein': i.protein} for i in snacks],
            'dinner': [{'name': i.name, 'calories': i.calories, 'protein': i.protein} for i in dinner]
        },
        'daily_calories': sum(i.calories for i in breakfast + lunch + snacks + dinner if i.calories),
        'daily_protein': sum(i.protein for i in breakfast + lunch + snacks + dinner if i.protein)
    })

# ==================== GAMIFICATION API ====================

@app.route('/api/gamification/stats')
@login_required
def get_gamification_stats():
    stats = Gamification.query.filter_by(user_id=current_user.id).first()
    
    if not stats:
        stats = Gamification(user_id=current_user.id)
        db.session.add(stats)
        db.session.commit()
    
    return jsonify({
        'health_points': stats.health_points,
        'rank': stats.rank,
        'badges': json.loads(stats.badges or '[]'),
        'total_healthy_meals': stats.total_healthy_meals,
        'streak_days': stats.streak_days
    })

@app.route('/api/gamification/leaderboard')
def get_leaderboard():
    top_users = db.session.query(
        User.name,
        Gamification.health_points,
        Gamification.total_healthy_meals
    ).join(Gamification).order_by(Gamification.health_points.desc()).limit(10).all()
    
    return jsonify([{
        'name': name,
        'health_points': points,
        'healthy_meals': meals,
        'rank': idx + 1
    } for idx, (name, points, meals) in enumerate(top_users)])

@app.route('/api/gamification/redeem', methods=['POST'])
@login_required
def redeem_points():
    data = request.json
    points_to_redeem = data.get('points', 0)
    
    stats = Gamification.query.filter_by(user_id=current_user.id).first()
    
    if not stats or stats.health_points < points_to_redeem:
        return jsonify({'error': 'Insufficient points'}), 400
    
    discount = points_to_redeem * 0.1
    stats.health_points -= points_to_redeem
    db.session.commit()
    
    return jsonify({
        'message': f'Redeemed {points_to_redeem} points',
        'discount': discount,
        'remaining_points': stats.health_points
    })

# ==================== SUBSCRIPTION API ====================

@app.route('/api/subscriptions/plans')
def get_subscription_plans():
    plans = SubscriptionPlan.query.all()
    return jsonify([{
        'id': plan.id,
        'name': plan.name,
        'description': plan.description,
        'plan_type': plan.plan_type,
        'price': plan.price,
        'meals_per_week': plan.meals_per_week,
        'discount_percentage': plan.discount_percentage
    } for plan in plans])

@app.route('/api/subscriptions', methods=['GET', 'POST'])
@login_required
def manage_subscriptions():
    if request.method == 'POST':
        data = request.json
        plan = SubscriptionPlan.query.get_or_404(data['plan_id'])
        
        existing = Subscription.query.filter_by(user_id=current_user.id, is_active=True).first()
        if existing:
            existing.is_active = False
        
        end_date = datetime.utcnow() + timedelta(days=30 if plan.plan_type == 'monthly' else 7)
        
        subscription = Subscription(
            user_id=current_user.id,
            plan_id=plan.id,
            end_date=end_date
        )
        db.session.add(subscription)
        db.session.commit()
        
        return jsonify({'message': 'Subscription activated', 'end_date': end_date.isoformat()})
    
    subscriptions = Subscription.query.filter_by(user_id=current_user.id).all()
    return jsonify([{
        'id': sub.id,
        'plan_name': sub.plan.name,
        'start_date': sub.start_date.isoformat(),
        'end_date': sub.end_date.isoformat() if sub.end_date else None,
        'is_active': sub.is_active
    } for sub in subscriptions])

# ==================== INVOICE API ====================

@app.route('/api/invoices/<int:order_id>')
@login_required
def get_invoice(order_id):
    order = Order.query.get_or_404(order_id)
    
    if order.student_id != current_user.id and current_user.role not in ['admin', 'parent']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4
    
    p.setFont("Helvetica-Bold", 24)
    p.drawString(50, height - 50, "BiteBox Smart Canteen")
    p.setFont("Helvetica", 12)
    p.drawString(50, height - 70, "Silverline Prestige School, Ghaziabad")
    
    p.setFont("Helvetica-Bold", 16)
    p.drawString(50, height - 120, f"Invoice #{order.id}")
    p.setFont("Helvetica", 12)
    p.drawString(50, height - 140, f"Date: {order.created_at.strftime('%Y-%m-%d %H:%M')}")
    p.drawString(50, height - 160, f"Status: {order.status}")
    
    p.line(50, height - 180, width - 50, height - 180)
    
    y = height - 210
    p.setFont("Helvetica-Bold", 12)
    p.drawString(50, y, "Item")
    p.drawString(300, y, "Qty")
    p.drawString(400, y, "Price")
    p.drawString(480, y, "Total")
    
    y -= 25
    p.setFont("Helvetica", 11)
    for item in order.items:
        p.drawString(50, y, item.menu_item.name)
        p.drawString(300, y, str(item.quantity))
        p.drawString(400, y, f"₹{item.price}")
        p.drawString(480, y, f"₹{item.price * item.quantity}")
        y -= 20
    
    p.line(50, y - 10, width - 50, y - 10)
    p.setFont("Helvetica-Bold", 14)
    p.drawString(400, y - 35, f"Total: ₹{order.total_amount}")
    
    p.setFont("Helvetica", 10)
    p.drawString(50, 50, "Thank you for choosing BiteBox Smart Canteen!")
    
    p.showPage()
    p.save()
    
    buffer.seek(0)
    return send_file(buffer, as_attachment=True, download_name=f'invoice_{order.id}.pdf', mimetype='application/pdf')

@app.route('/api/invoices/monthly')
@login_required
def get_monthly_summary():
    month_start = datetime.utcnow().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    
    if current_user.role == 'parent':
        children = User.query.filter_by(parent_id=current_user.id).all()
        child_ids = [c.id for c in children]
        orders = Order.query.filter(Order.student_id.in_(child_ids), Order.created_at >= month_start).all()
    else:
        orders = Order.query.filter(Order.student_id == current_user.id, Order.created_at >= month_start).all()
    
    total_spent = sum(o.total_amount for o in orders)
    total_orders = len(orders)
    
    return jsonify({
        'month': month_start.strftime('%B %Y'),
        'total_spent': total_spent,
        'total_orders': total_orders,
        'average_per_order': total_spent / total_orders if total_orders > 0 else 0
    })

@app.route('/api/invoices/monthly/pdf')
@login_required
def get_monthly_pdf():
    month_start = datetime.utcnow().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    
    if current_user.role == 'parent':
        children = User.query.filter_by(parent_id=current_user.id).all()
        child_ids = [c.id for c in children]
        orders = Order.query.filter(Order.student_id.in_(child_ids), Order.created_at >= month_start).all()
    else:
        orders = Order.query.filter(Order.student_id == current_user.id, Order.created_at >= month_start).all()
    
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4
    
    p.setFont("Helvetica-Bold", 24)
    p.drawString(50, height - 50, "BiteBox Smart Canteen")
    p.setFont("Helvetica", 12)
    p.drawString(50, height - 70, "Monthly Summary Report")
    
    p.setFont("Helvetica-Bold", 16)
    p.drawString(50, height - 110, f"Month: {month_start.strftime('%B %Y')}")
    p.setFont("Helvetica", 12)
    p.drawString(50, height - 130, f"Generated: {datetime.utcnow().strftime('%Y-%m-%d %H:%M')}")
    
    p.line(50, height - 150, width - 50, height - 150)
    
    total_spent = sum(o.total_amount for o in orders)
    p.setFont("Helvetica-Bold", 14)
    p.drawString(50, height - 180, f"Total Orders: {len(orders)}")
    p.drawString(50, height - 200, f"Total Spent: ₹{total_spent}")
    p.drawString(50, height - 220, f"Average per Order: ₹{total_spent / len(orders) if orders else 0:.2f}")
    
    y = height - 260
    p.setFont("Helvetica-Bold", 12)
    p.drawString(50, y, "Order #")
    p.drawString(120, y, "Date")
    p.drawString(250, y, "Items")
    p.drawString(400, y, "Amount")
    
    y -= 25
    p.setFont("Helvetica", 10)
    for order in orders[:20]:
        p.drawString(50, y, str(order.id))
        p.drawString(120, y, order.created_at.strftime('%Y-%m-%d'))
        p.drawString(250, y, str(len(order.items)))
        p.drawString(400, y, f"₹{order.total_amount}")
        y -= 18
        if y < 100:
            p.showPage()
            y = height - 50
    
    p.setFont("Helvetica", 10)
    p.drawString(50, 50, "Thank you for choosing BiteBox Smart Canteen!")
    
    p.showPage()
    p.save()
    
    buffer.seek(0)
    return send_file(buffer, as_attachment=True, download_name=f'monthly_summary_{month_start.strftime("%Y_%m")}.pdf', mimetype='application/pdf')

@app.route('/api/parent/activity')
@login_required
def get_parent_activity():
    if current_user.role != 'parent':
        return jsonify({'error': 'Unauthorized'}), 403
    
    children = User.query.filter_by(parent_id=current_user.id).all()
    child_ids = [c.id for c in children]
    child_names = {c.id: c.name for c in children}
    
    from sqlalchemy.orm import joinedload
    recent_orders = Order.query.filter(Order.student_id.in_(child_ids)).options(
        joinedload(Order.items).joinedload(OrderItem.menu_item)
    ).order_by(Order.created_at.desc()).limit(10).all()
    
    activities = []
    for order in recent_orders:
        items_str = ', '.join([item.menu_item.name for item in order.items[:3]])
        if len(order.items) > 3:
            items_str += f' +{len(order.items) - 3} more'
        
        activities.append({
            'type': 'order',
            'child_name': child_names.get(order.student_id, 'Unknown'),
            'description': f'Ordered: {items_str}',
            'amount': order.total_amount,
            'time': order.created_at.isoformat(),
            'status': order.status
        })
    
    return jsonify(activities)

@app.route('/api/parent/stats')
@login_required
def get_parent_stats():
    if current_user.role != 'parent':
        return jsonify({'error': 'Unauthorized'}), 403
    
    children = User.query.filter_by(parent_id=current_user.id).all()
    child_ids = [c.id for c in children]
    
    from sqlalchemy.orm import joinedload
    month_start = datetime.utcnow().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    
    orders = Order.query.filter(
        Order.student_id.in_(child_ids),
        Order.created_at >= month_start
    ).options(joinedload(Order.items).joinedload(OrderItem.menu_item)).all()
    
    total_items = 0
    healthy_items = 0
    total_spent = 0
    
    for order in orders:
        total_spent += order.total_amount
        for item in order.items:
            total_items += item.quantity
            if item.menu_item and item.menu_item.health_score >= 7:
                healthy_items += item.quantity
    
    healthy_percent = round((healthy_items / total_items * 100) if total_items > 0 else 0)
    
    return jsonify({
        'children_count': len(children),
        'monthly_spent': total_spent,
        'total_meals': len(orders),
        'healthy_percent': healthy_percent
    })

# ==================== NOTIFICATIONS API ====================

@app.route('/api/notifications')
@login_required
def get_notifications():
    notifications = Notification.query.filter_by(user_id=current_user.id).order_by(Notification.created_at.desc()).limit(20).all()
    return jsonify([{
        'id': n.id,
        'title': n.title,
        'message': n.message,
        'type': n.type,
        'is_read': n.is_read,
        'created_at': n.created_at.isoformat()
    } for n in notifications])

@app.route('/api/notifications/<int:notification_id>/read', methods=['PUT'])
@login_required
def mark_notification_read(notification_id):
    notification = Notification.query.get_or_404(notification_id)
    if notification.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403
    notification.is_read = True
    db.session.commit()
    return jsonify({'message': 'Notification marked as read'})

# ==================== ADMIN USERS API ====================

@app.route('/api/admin/users')
@login_required
def get_user_stats():
    if current_user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    students = User.query.filter_by(role='student').count()
    parents = User.query.filter_by(role='parent').count()
    vendors = User.query.filter_by(role='vendor').count()
    admins = User.query.filter_by(role='admin').count()
    
    return jsonify({
        'students': students,
        'parents': parents,
        'vendors': vendors,
        'admins': admins,
        'total': students + parents + vendors + admins
    })

# ==================== ADMIN REPORTS API ====================

@app.route('/api/admin/reports/<report_type>')
@login_required
def generate_admin_report(report_type):
    if current_user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    today = datetime.utcnow().date()
    
    if report_type == 'daily':
        start_date = today
        title = f"Daily Sales Report - {today.strftime('%B %d, %Y')}"
        orders = Order.query.filter(db.func.date(Order.created_at) == today).all()
    elif report_type == 'weekly':
        start_date = today - timedelta(days=7)
        title = f"Weekly Sales Report - {start_date.strftime('%b %d')} to {today.strftime('%b %d, %Y')}"
        orders = Order.query.filter(Order.created_at >= start_date).all()
    else:
        start_date = today - timedelta(days=30)
        title = f"Monthly Sales Report - {start_date.strftime('%B %Y')}"
        orders = Order.query.filter(Order.created_at >= start_date).all()
    
    total_revenue = sum(o.total_amount for o in orders)
    total_orders = len(orders)
    
    item_sales = {}
    category_sales = {}
    for order in orders:
        for item in order.items:
            item_name = item.menu_item.name if item.menu_item else 'Unknown'
            category = item.menu_item.category if item.menu_item else 'Unknown'
            item_sales[item_name] = item_sales.get(item_name, 0) + item.quantity
            category_sales[category] = category_sales.get(category, 0) + (item.price * item.quantity)
    
    top_items = sorted(item_sales.items(), key=lambda x: x[1], reverse=True)[:10]
    
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4
    
    p.setFont("Helvetica-Bold", 24)
    p.drawString(50, height - 50, "BiteBox Smart Canteen")
    p.setFont("Helvetica", 12)
    p.drawString(50, height - 70, "Silverline Prestige School, Ghaziabad")
    
    p.setFont("Helvetica-Bold", 16)
    p.drawString(50, height - 110, title)
    p.setFont("Helvetica", 12)
    p.drawString(50, height - 130, f"Generated: {datetime.utcnow().strftime('%Y-%m-%d %H:%M')}")
    
    p.line(50, height - 150, width - 50, height - 150)
    
    p.setFont("Helvetica-Bold", 14)
    p.drawString(50, height - 180, "Summary")
    p.setFont("Helvetica", 12)
    p.drawString(50, height - 200, f"Total Orders: {total_orders}")
    p.drawString(50, height - 220, f"Total Revenue: Rs.{total_revenue}")
    p.drawString(50, height - 240, f"Average Order Value: Rs.{total_revenue / total_orders if total_orders > 0 else 0:.2f}")
    
    p.setFont("Helvetica-Bold", 14)
    p.drawString(50, height - 280, "Top Selling Items")
    
    y = height - 305
    p.setFont("Helvetica-Bold", 11)
    p.drawString(50, y, "Rank")
    p.drawString(100, y, "Item Name")
    p.drawString(350, y, "Quantity Sold")
    
    y -= 20
    p.setFont("Helvetica", 11)
    for idx, (name, qty) in enumerate(top_items, 1):
        p.drawString(50, y, f"#{idx}")
        p.drawString(100, y, name[:40])
        p.drawString(350, y, str(qty))
        y -= 18
        if y < 150:
            break
    
    y -= 30
    p.setFont("Helvetica-Bold", 14)
    p.drawString(50, y, "Sales by Category")
    y -= 25
    p.setFont("Helvetica", 11)
    for cat, amount in sorted(category_sales.items(), key=lambda x: x[1], reverse=True):
        p.drawString(50, y, f"{cat}: Rs.{amount}")
        y -= 18
        if y < 80:
            break
    
    p.setFont("Helvetica", 10)
    p.drawString(50, 50, "BiteBox Smart Canteen - Automated Report")
    
    p.showPage()
    p.save()
    
    buffer.seek(0)
    return send_file(buffer, as_attachment=True, download_name=f'{report_type}_report_{today.strftime("%Y_%m_%d")}.pdf', mimetype='application/pdf')

# ==================== AI CHAT API ====================

@app.route('/api/ai/chat', methods=['POST'])
@login_required
def ai_chat():
    from google import genai
    
    data = request.json
    user_message = data.get('message', '')
    
    if not user_message:
        return jsonify({'error': 'Message is required'}), 400
    
    try:
        # Initialize Gemini client
        client = genai.Client(api_key="AIzaSyBONjV4J1h3W-4xQeO7wgkBLxqnp8nCh3g")
        
        # Get user's health profile for context
        profile = HealthProfile.query.filter_by(user_id=current_user.id).first()
        context = f"You are a nutrition and health assistant for BiteBox Smart Canteen. "
        
        if profile:
            context += f"The user has a BMI of {profile.bmi}, fitness goal: {profile.fitness_goal}. "
            if profile.allergies:
                context += f"Allergies: {profile.allergies}. "
        
        context += "Provide helpful, accurate, and concise answers about nutrition, healthy eating, menu items, and wellness. Keep responses under 150 words."
        
        # Generate response
        full_prompt = f"{context}\n\nUser question: {user_message}"
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp",
            contents=full_prompt
        )
        
        return jsonify({
            'response': response.text,
            'timestamp': datetime.utcnow().isoformat()
        })
        
    except Exception as e:
        print(f"AI Chat Error: {e}")
        return jsonify({'error': 'Failed to get AI response. Please try again.'}), 500

# ==================== FEEDBACK API ====================

@app.route('/api/feedback', methods=['GET', 'POST'])
@login_required
def manage_feedback():
    if request.method == 'POST':
        data = request.json
        feedback = Feedback(
            user_id=current_user.id,
            rating=data['rating'],
            comment=data.get('comment'),
            category=data.get('category', 'general')
        )
        db.session.add(feedback)
        db.session.commit()
        return jsonify({'message': 'Feedback submitted successfully'})
    
    if current_user.role == 'admin':
        feedbacks = Feedback.query.order_by(Feedback.created_at.desc()).all()
    else:
        feedbacks = Feedback.query.filter_by(user_id=current_user.id).all()
    
    return jsonify([{
        'id': f.id,
        'rating': f.rating,
        'comment': f.comment,
        'category': f.category,
        'created_at': f.created_at.isoformat()
    } for f in feedbacks])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
