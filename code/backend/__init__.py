"""
BiteBox Backend Module

This module contains the core backend application logic for the BiteBox Canteen Management System.
It includes Flask application setup, database models, and API endpoints for managing:
- User authentication and management
- Menu items and ordering
- Health profiles and nutritional tracking
- Parental controls and gamification
- Subscriptions and billing
- Analytics and feedback

The application uses Flask as the web framework and SQLAlchemy for database ORM.
"""

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

__version__ = '1.0.0'
__author__ = 'BiteBox Team'
__description__ = 'Backend module for BiteBox Canteen Management System'
