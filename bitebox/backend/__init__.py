"""
BiteBox Backend Module - Flask Application & Database

This module initializes and exports the core Flask application and database
for the BiteBox Canteen Management System.

=====================================
Core Components
=====================================
- app: Flask application instance configured with all routes and error handlers
- db: SQLAlchemy database instance for ORM operations

=====================================
Database Models
=====================================
User Models:
  - User: Main user table with authentication and profile info
  - HealthProfile: Health metrics, allergies, and dietary preferences
  - ParentalControl: Parental restrictions and spending limits

Order Management:
  - MenuItem: Menu items with nutritional information
  - Order: Customer orders with status tracking
  - OrderItem: Individual items in an order
  - Invoice: Order invoices and billing records

Features:
  - SubscriptionPlan: Available subscription packages
  - Subscription: User subscriptions with dates
  - Gamification: User achievements and leaderboard data
  - Notification: System notifications for users
  - Feedback: Customer feedback and ratings
  - Analytics: Usage tracking and analytics

=====================================
Routes Structure
=====================================
Page Routes (/):
  - / - Home page
  - /login - Login page
  - /register - Registration page
  - /dashboard - User dashboard (role-based)
  - /menu - Menu browsing page

API Routes (/api/):
  - /api/auth/* - Authentication endpoints
  - /api/orders/* - Order management
  - /api/health/* - Health profiles and diet plans
  - /api/gamification/* - Points and leaderboards
  - /api/subscriptions/* - Subscription management
  - /api/parent/* - Parental controls and monitoring
  - /api/inventory/* - Stock management
  - /api/invoices/* - Invoice generation
  - /api/analytics/* - Analytics and reports
  - /api/chat/* - AI nutrition assistant
  - /api/feedback/* - Feedback submission

=====================================
Configuration Details
=====================================
Flask Config:
  - Template folder: ../frontend
  - Static folder: ../frontend/static
  - JSON sort keys: False (performance)
  - JSON response: Compact format

Database Config:
  - ORM: SQLAlchemy 2.0+
  - Track modifications: False (production optimization)
  - Pool pre-ping: True (connection validation)
  - Pool size: 10 connections
  - Max overflow: 20 additional connections
  - Pool recycle: 3600 seconds

CORS Config:
  - All origins allowed for development
  - Credentials: Enabled
  - Methods: GET, POST, PUT, DELETE, OPTIONS
  - Headers: Content-Type, Authorization

=====================================
Authentication & Security
=====================================
Password Security:
  - Hashing algorithm: Werkzeug bcrypt (via generate_password_hash)
  - Password verification: check_password_hash
  - Salting: Automatic via Werkzeug

Session Management:
  - Framework: Flask-Login
  - User loader callback: load_user(user_id)
  - Login required decorator: @login_required
  - Anonymous user handler: Enabled

Access Control:
  - Role-based: student, parent, admin, vendor, nurse
  - Endpoint protection: @login_required decorator
  - Role validation: Custom checks in routes

=====================================
Database Initialization
=====================================
On Application Startup:
  1. Create all tables (db.create_all())
  2. Seed menu items if empty
  3. Seed subscription plans if empty
  4. Initialize user relationships
  5. Create health profiles for new users

Environment-Specific:
  Development:
    - SQLite option available
    - Debug SQL logging enabled
    - Auto-migrations supported

  Production (Render):
    - PostgreSQL required
    - Connection pooling enabled
    - Read-only for backups supported

=====================================
Error Handling
=====================================
HTTP Errors:
  - 400: Bad Request (invalid data)
  - 401: Unauthorized (login required)
  - 403: Forbidden (permission denied)
  - 404: Not Found (resource missing)
  - 409: Conflict (duplicate entry)
  - 500: Server Error (unexpected issue)

Database Errors:
  - Connection: Automatic retry with pooling
  - Integrity: Rollback and error response
  - Timeout: Connection recycle

API Errors:
  - Validation: JSON error response with details
  - Authorization: 403 with error message
  - Not Found: 404 with resource info

=====================================
Performance Optimizations
=====================================
Database:
  - Connection pooling: Reduces connection overhead
  - Lazy loading relationships: Optional joinedload for optimization
  - Index usage: On foreign keys and frequently queried fields
  - Query optimization: Avoid N+1 problems

Caching:
  - Session caching: Flask-Login
  - Static file caching: Browser cache headers
  - API response: JSON serialization optimization

=====================================
Logging & Monitoring
=====================================
Log Levels:
  - INFO: Application events (startup, shutdown)
  - WARNING: Potential issues (connection issues)
  - ERROR: Failures that need attention
  - DEBUG: Detailed information for debugging

Monitored Metrics:
  - Database connection pool status
  - API response times
  - Error rates and types
  - User activity logs
  - Failed authentication attempts

=====================================
Testing Support
=====================================
Test Mode:
  - SQLALCHEMY_TRACK_MODIFICATIONS = False
  - Can use in-memory SQLite for tests
  - Session management compatible with test client
  - Database rollback between test runs

Test Routes:
  - /api/test/health - Health check endpoint
  - Can be customized in app.py

=====================================
Deployment Checklist
=====================================
Before Production:
  ✓ Set all required environment variables
  ✓ Configure production database URL
  ✓ Set SECRET_KEY to secure random value
  ✓ Disable debug mode (debug=False)
  ✓ Configure CORS appropriately
  ✓ Set up error logging
  ✓ Configure backup strategy
  ✓ Test all API endpoints
  ✓ Verify static file serving
  ✓ Check database migrations

On Deploy:
  ✓ Run migrations (if any)
  ✓ Seed initial data
  ✓ Verify environment variables
  ✓ Test database connection
  ✓ Monitor application logs
  ✓ Verify all services operational

=====================================
Troubleshooting
=====================================
Import Errors:
  - Verify all model imports in __init__.py
  - Check for circular imports
  - Ensure models.py is valid

Database Issues:
  - Check DATABASE_URL format
  - Verify database exists and is accessible
  - Check user permissions
  - Review connection pool settings

Route Issues:
  - Verify route decorators are correct
  - Check request method (GET/POST/etc)
  - Validate JSON request format
  - Check authentication requirements

Static File Issues:
  - Verify template_folder and static_folder paths
  - Check file permissions
  - Clear browser cache
  - Verify file exists in correct folder

=====================================
Module Usage
=====================================
Importing the App:
  from bitebox.backend import app, db

Running Locally:
  python main.py

Running with Gunicorn:
  gunicorn bitebox.backend.app:app

Environment Requirements:
  - Python 3.11+
  - PostgreSQL 12+ (production)
  - SQLite (development, optional)
  - All dependencies from pyproject.toml

=====================================
Dependencies
=====================================
Core Framework:
  - Flask 3.1.2+: Web framework
  - Gunicorn 23.0.0+: Production server
  - Werkzeug 3.1.4+: Security utilities

Database:
  - Flask-SQLAlchemy 3.1.1+: ORM integration
  - SQLAlchemy 2.0.44+: Database abstraction
  - psycopg2-binary 2.9.11+: PostgreSQL adapter

Security & Auth:
  - Flask-Login 0.6.3+: Session management
  - Flask-CORS 6.0.1+: CORS support

Utilities:
  - Python-dotenv 1.2.1+: Environment variables
  - Requests 2.32.5+: HTTP client
  - Pillow 12.0.0+: Image processing
  - ReportLab 4.4.5+: PDF generation
  - Google-GenAI 1.53.0+: AI features

=====================================
Version History
=====================================
v1.0.0 (Current):
  - Initial release
  - All core features implemented
  - Production-ready
  - PostgreSQL support
  - Gunicorn compatibility

=====================================
Author & License
=====================================
Author: BiteBox Development Team
License: MIT
Repository: https://github.com/bitebox105-crypto/bitebox_2
Created: 2024
Last Updated: 2025

=====================================
"""

import os
import logging
from typing import Any

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

try:
    from .app import app
    from .models import (
        db,
        User,
        HealthProfile,
        MenuItem,
        Order,
        OrderItem,
        Invoice,
        SubscriptionPlan,
        Subscription,
        ParentalControl,
        Gamification,
        Notification,
        Feedback,
        Analytics,
    )
    logger.info("✓ BiteBox Backend initialized successfully")
except ImportError as e:
    logger.error(f"✗ Failed to import backend modules: {e}")
    raise
except Exception as e:
    logger.error(f"✗ Unexpected error during backend initialization: {e}")
    raise

# Package exports
__all__ = [
    'app',
    'db',
    'User',
    'HealthProfile',
    'MenuItem',
    'Order',
    'OrderItem',
    'Invoice',
    'SubscriptionPlan',
    'Subscription',
    'ParentalControl',
    'Gamification',
    'Notification',
    'Feedback',
    'Analytics',
]

# Version and metadata
__version__ = '1.0.0'
__author__ = 'BiteBox Team'
__description__ = 'Backend module for BiteBox Canteen Management System'
__license__ = 'MIT'
__email__ = 'support@bitebox.com'
__website__ = 'https://bitebox.com'

# Module info
MODULE_INFO = {
    'name': 'BiteBox Backend',
    'version': __version__,
    'author': __author__,
    'description': __description__,
    'license': __license__,
    'python_version': '3.11+',
    'database': 'PostgreSQL 12+',
    'framework': 'Flask 3.1.2',
    'server': 'Gunicorn 23.0.0',
}

# Feature flags
BACKEND_FEATURES = {
    'authentication': True,
    'database_orm': True,
    'cors_support': True,
    'session_management': True,
    'error_handling': True,
    'logging': True,
    'api_routes': True,
}

# Log startup information
def log_startup_info() -> None:
    """Log backend initialization information."""
    logger.info("=" * 60)
    logger.info("BiteBox Backend - Initialization Information")
    logger.info("=" * 60)
    for key, value in MODULE_INFO.items():
        logger.info(f"  {key}: {value}")
    logger.info("=" * 60)
    logger.info("Features enabled:")
    for feature, enabled in BACKEND_FEATURES.items():
        status = "✓" if enabled else "✗"
        logger.info(f"  {status} {feature}")
    logger.info("=" * 60)

# Call startup info
log_startup_info()
