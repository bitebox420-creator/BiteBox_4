"""
BiteBox Smart Canteen - Comprehensive Canteen Management System

A complete full-stack application for managing school/college canteen operations with:
- Student meal ordering and real-time tracking
- Health profile management and dietary preferences tracking
- Parental controls and comprehensive monitoring
- Gamification system with rewards and leaderboards
- Flexible subscription plans for convenient meal access
- Advanced analytics and reporting for administrators
- Invoice generation and billing management
- AI-powered nutritional chatbot assistance
- Multi-role access control (Student, Parent, Admin, Vendor, Nurse)

====================
PROJECT STRUCTURE
====================
├── backend/          - Flask API server
│   ├── app.py        - Main Flask application with all routes
│   ├── models.py     - SQLAlchemy database models
│   └── __init__.py   - Backend package initialization
├── frontend/         - HTML/CSS/JavaScript frontend
│   ├── *.html        - HTML templates
│   └── static/       - CSS and JavaScript files
└── main.py          - Entry point for local development

====================
KEY FEATURES
====================
✓ User Authentication & Authorization
✓ Real-time Order Management
✓ Health & Nutritional Tracking
✓ Parental Controls & Monitoring
✓ Gamification & Rewards System
✓ Subscription Management
✓ Invoice & PDF Generation
✓ Analytics Dashboard
✓ AI Nutrition Assistant
✓ Feedback Management

====================
DEPLOYMENT INFO
====================
Version: 1.0.0
Framework: Flask 3.1.2
Database: PostgreSQL
Python: 3.11+
Server: Gunicorn 23.0.0

====================
TECHNOLOGY STACK
====================
Backend:
  - Flask: Web framework
  - Flask-CORS: Cross-origin resource sharing
  - Flask-Login: User session management
  - Flask-SQLAlchemy: ORM for database
  - SQLAlchemy: Database abstraction

Database:
  - PostgreSQL: Primary database
  - psycopg2-binary: PostgreSQL adapter

Security:
  - Werkzeug: Password hashing & security utilities
  - Python-dotenv: Environment variable management

Additional Libraries:
  - Google-GenAI: Nutrition AI assistant
  - ReportLab: PDF invoice generation
  - Pillow: Image processing
  - Requests: HTTP client for email services

====================
ENVIRONMENT VARIABLES REQUIRED
====================
Production (Render):
  - DATABASE_URL: PostgreSQL connection string
  - SECRET_KEY: Flask session secret key
  - GOOGLE_API_KEY: Google GenAI API key (optional, for AI features)

Development (Replit):
  - PGHOST: Database host
  - PGPORT: Database port (default: 5432)
  - PGUSER: Database user
  - PGPASSWORD: Database password
  - PGDATABASE: Database name
  - SECRET_KEY: Session secret

====================
CONFIGURATION
====================
Database:
  - ORM: SQLAlchemy 2.0+
  - Connection pooling: Enabled
  - Track modifications: Disabled (production optimization)

CORS:
  - Cross-origin requests: Enabled
  - Credentials: Supported
  - Methods: GET, POST, PUT, DELETE, OPTIONS

Flask:
  - Template folder: ../frontend
  - Static folder: ../frontend/static
  - Debug mode: Enabled in development, disabled in production

====================
DATABASE MODELS
====================
Core Models:
  - User: User accounts with roles (student, parent, admin, vendor, nurse)
  - HealthProfile: Health metrics and dietary preferences
  - MenuItem: Menu items with nutritional information
  - Order: Student food orders with status tracking
  - OrderItem: Individual items in an order
  - Invoice: Order invoices for billing

Additional Models:
  - SubscriptionPlan: Flexible meal subscription plans
  - Subscription: User subscription records
  - ParentalControl: Parental restrictions and allowances
  - Gamification: User health points and achievements
  - Notification: System notifications for users
  - Feedback: User feedback and ratings
  - Analytics: Usage analytics and insights

====================
API ENDPOINTS (SAMPLE)
====================
Authentication:
  POST /api/auth/register       - Register new user
  POST /api/auth/login          - Login user
  POST /api/auth/logout         - Logout user
  GET  /api/auth/me             - Current user profile

Orders:
  POST /api/orders              - Place order
  GET  /api/orders              - Get user orders
  PUT  /api/orders/<id>/status  - Update order status

Health:
  GET  /api/health/profile      - Get health profile
  POST /api/health/profile      - Update health profile
  GET  /api/health/diet-plan    - Get personalized diet plan

Gamification:
  GET  /api/gamification/stats  - Get user gamification stats
  GET  /api/gamification/leaderboard - Get leaderboard

Subscriptions:
  GET  /api/subscriptions/plans - Get available plans
  GET  /api/subscriptions       - Get user subscriptions
  POST /api/subscriptions       - Subscribe to plan

Parent:
  GET  /api/parent/children     - Get child accounts
  GET  /api/parent/activity     - Get child activity
  POST /api/parent/child/<id>/controls - Set parental controls

Admin:
  GET  /api/inventory           - Get inventory
  PUT  /api/inventory           - Update inventory
  GET  /api/analytics/summary   - Get analytics

====================
SECURITY NOTES
====================
✓ Password hashing using Werkzeug
✓ Session management with Flask-Login
✓ CSRF protection available
✓ SQL injection prevention via SQLAlchemy ORM
✓ Environment variable protection for secrets
✓ Role-based access control

⚠ Always use HTTPS in production
⚠ Keep SECRET_KEY secure and unique
⚠ Use strong database passwords
⚠ Regularly update dependencies

====================
COMMON ISSUES & SOLUTIONS
====================
Database Connection Error:
  → Verify DATABASE_URL or individual PG* environment variables
  → Check PostgreSQL is running and accessible
  → Ensure database user has proper permissions

Import Error on Deploy:
  → Verify all dependencies in pyproject.toml
  → Check Python version matches (3.11+)
  → Run 'uv sync --frozen' locally before deploying

Static Files Not Loading:
  → Verify static folder path in Flask config
  → Check file permissions
  → Clear browser cache

AI Features Not Working:
  → Set GOOGLE_API_KEY environment variable
  → Verify API key is valid
  → Check internet connectivity

====================
MAINTENANCE
====================
Database Migrations:
  - Use SQLAlchemy ORM for schema changes
  - Test migrations locally before deploying
  - Keep backup of production database

Dependency Updates:
  - Regularly check for updates: pip list --outdated
  - Update with: uv pip compile --upgrade
  - Test updates in development first

Monitoring:
  - Monitor error logs on Render
  - Check database connection pool
  - Monitor API response times
  - Track gamification calculations

====================
SUPPORT & DOCUMENTATION
====================
GitHub: https://github.com/bitebox105-crypto/bitebox_2
Issues: Report via GitHub Issues
Contributors: BiteBox Development Team

"""

# Import core modules
from .backend import app, db

# Version and metadata
__version__ = '1.0.0'
__author__ = 'BiteBox Development Team'
__license__ = 'MIT'
__description__ = 'BiteBox Smart Canteen Management System'
__repository__ = 'https://github.com/bitebox105-crypto/bitebox_2'

# Application configuration
APP_NAME = 'BiteBox'
APP_ENVIRONMENT = 'production'

# Feature flags
FEATURES = {
    'authentication': True,
    'menu_management': True,
    'ordering': True,
    'health_tracking': True,
    'parental_controls': True,
    'gamification': True,
    'subscriptions': True,
    'analytics': True,
    'ai_chat': True,
    'invoices': True,
    'notifications': True,
    'feedback': True,
}

# Database configuration
DB_CONFIG = {
    'pool_pre_ping': True,
    'pool_size': 10,
    'max_overflow': 20,
    'pool_recycle': 3600,
}

# Supported user roles
USER_ROLES = {
    'student': 'Student - Can order meals and track health',
    'parent': 'Parent - Can monitor children and set controls',
    'admin': 'Admin - Full system management',
    'vendor': 'Vendor - Manage inventory and orders',
    'nurse': 'Nurse - Health monitoring and records',
}

# API response status codes
API_STATUS = {
    'success': 200,
    'created': 201,
    'bad_request': 400,
    'unauthorized': 401,
    'forbidden': 403,
    'not_found': 404,
    'conflict': 409,
    'server_error': 500,
}

__all__ = [
    'app',
    'db',
    'FEATURES',
    'APP_NAME',
    'USER_ROLES',
    'API_STATUS',
    'DB_CONFIG',
    '__version__',
    '__author__',
    '__description__',
]
