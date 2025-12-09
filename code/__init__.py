"""
BiteBox - Canteen Management System

A comprehensive application for managing school/college canteen operations with features including:
- Student meal ordering and tracking
- Health profile management and dietary preferences
- Parental controls and monitoring
- Gamification and rewards system
- Subscription plans for convenient access
- Analytics and reporting for administrators
- Invoice and billing management

This package contains both the backend (Flask API) and frontend (HTML/CSS/JavaScript) components.
"""

from .backend import app, db

__version__ = '1.0.0'
__author__ = 'BiteBox Development Team'
__license__ = 'MIT'
__description__ = 'BiteBox Canteen Management System'

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
}

__all__ = ['app', 'db', 'FEATURES', 'APP_NAME']
