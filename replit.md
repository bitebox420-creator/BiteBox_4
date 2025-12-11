# BiteBox Smart Canteen

## Overview

BiteBox is a comprehensive smart canteen management system designed for schools and educational institutions. The application enables students to order meals, parents to monitor their children's nutrition and spending, and administrators to manage inventory, orders, and analytics.

The system provides:
- Multi-role user management (Student, Parent, Admin, Vendor, Nurse)
- Real-time order placement and tracking
- Health profile management with dietary preferences and allergies
- Parental controls for spending limits and food restrictions
- Gamification with points and rewards
- Subscription plans for meal packages
- AI-powered nutrition chatbot assistance
- Invoice generation and PDF reports
- Analytics dashboard for administrators

## Recent Updates (December 2025)

### Homepage Improvements
- **Silverline Prestige School Branding**: Updated hero section with headline "Smart Canteen Management for Silverline Prestige School"
- **Exclusive School Platform**: Emphasized that BiteBox is deployed exclusively for Silverline Prestige School (Ghaziabad)
- **Working Parent & Admin Dashboards**: Added direct links to fully functional Parent and Admin dashboards
- **Visual Demo Section**: Added side-by-side mockups showing Parent vs Student dashboard views
- **Testimonials**: Added testimonial cards from Parent, Student, and School Admin with quantified impact
- **Improved CTAs**: Schedule Demo button, prominent Login, and direct dashboard access links
- **FAQ Section**: Covers integration, deployment, security, and pricing
- **Contact Form**: Demo request form for school administrators

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Backend Architecture

**Framework**: Flask 3.1.2 with Python 3.11+

The backend follows a monolithic architecture with all routes defined in a single `app.py` file. Key architectural decisions:

- **Database ORM**: Flask-SQLAlchemy for database operations with PostgreSQL
- **Authentication**: Flask-Login for session-based user authentication with role-based access control
- **Password Security**: Werkzeug for password hashing
- **CORS**: Flask-CORS enabled for cross-origin requests with credentials support
- **PDF Generation**: ReportLab for invoice and report generation

**Route Structure**:
- Page routes serve HTML templates from the frontend directory
- API routes under `/api/` handle data operations
- Role-based dashboard routing (student, parent, admin, vendor)

**Database Models** (defined in `models.py`):
- User (with self-referential parent-child relationship)
- HealthProfile (allergies, dietary preferences, BMI)
- MenuItem (with nutritional information)
- Order and OrderItem
- Invoice
- SubscriptionPlan and Subscription
- ParentalControl
- Gamification
- Notification
- Feedback
- Analytics

### Frontend Architecture

**Technology**: Server-rendered HTML templates with vanilla JavaScript

The frontend uses a template-based approach where Flask serves HTML files directly:
- Templates stored in `bitebox/frontend/`
- Static assets (CSS, JS) in `bitebox/frontend/static/`
- Single CSS file (`style.css`) with CSS custom properties for theming
- Separate JavaScript files per dashboard type (dashboard.js, parent-dashboard.js, admin-dashboard.js)

**UI Features**:
- Dark/light theme toggle using CSS custom properties
- Responsive sidebar navigation for dashboards
- Role-specific dashboard views
- PWA manifest for mobile app-like experience

### Application Entry Points

- **Development**: `main.py` runs Flask development server on port 5000
- **Production**: Gunicorn with command `gunicorn -w 4 -b 0.0.0.0:5000 bitebox.backend.app:app`

### Directory Structure

```
bitebox/
├── backend/
│   ├── __init__.py
│   ├── app.py          # Flask app with all routes
│   └── models.py       # SQLAlchemy models
└── frontend/
    ├── *.html          # Page templates
    └── static/
        ├── style.css   # Global styles
        ├── app.js      # Common utilities
        ├── menu.js     # Menu page logic
        ├── dashboard.js # Student dashboard
        ├── parent-dashboard.js
        └── admin-dashboard.js
```

## External Dependencies

### Database
- **PostgreSQL**: Primary database, configured via `DATABASE_URL` environment variable or individual `PG*` environment variables (PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE)
- **psycopg2-binary**: PostgreSQL adapter for Python

### AI Services
- **Google GenAI** (google-genai): AI-powered nutrition chatbot functionality

### Email/Notifications
- **Formspree**: External service for order notification emails (sends to bitebox105@gmail.com)

### Key Python Packages
- flask >= 3.1.2
- flask-cors >= 6.0.1
- flask-login >= 0.6.3
- flask-sqlalchemy >= 3.1.1
- google-genai >= 1.53.0
- gunicorn >= 23.0.0
- pillow >= 12.0.0
- reportlab >= 4.4.5
- python-dotenv >= 1.2.1
- werkzeug >= 3.1.4

### Frontend Dependencies (CDN)
- Google Fonts (Poppins)
- Font Awesome 6.4.0

### Environment Variables Required
- `SECRET_KEY`: Flask session secret
- `DATABASE_URL`: PostgreSQL connection string (or individual PG* variables)
- Google GenAI API credentials (for chatbot feature)