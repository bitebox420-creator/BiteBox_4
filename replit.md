# BiteBox Smart Canteen App

## Project Overview
A world-class school canteen management system with AI-powered nutrition guidance. The website features student ordering, health tracking, admin analytics, parent controls, and gamification. AI chat provides personalized meal recommendations and nutrition advice.

## Recent Updates (December 13, 2025)
- Fixed requirements.txt typo (fla -> flask)
- Fixed database initialization race condition with try-except handling
- Fixed Google Generative AI import (google.com -> google.generativeai)
- Added SQLAlchemy error handling for duplicate table creation
- Fixed cart sidebar CSS with proper header, overlay, and animations
- Added cart overlay for better UX when cart is open
- Fixed logo 404 error by adding attached_assets route
- Fixed logo image path in all HTML files
- Improved cart item actions styling
- Configured deployment settings for autoscale

## Previous Updates (December 12, 2025)
- ✅ Implemented AI Chat Interface with modern neon aesthetic (cyan/orange/yellow)
- ✅ Created `/chat` route and `chat.html` page with beautiful UI
- ✅ Added `chat.js` for real-time message handling and API communication
- ✅ Integrated Google Generative AI backend at `/api/chat` endpoint
- ✅ Added "AI Chat" link to main navigation in index.html
- ✅ Integrated GOOGLE_GENAI_API_KEY secret for AI features
- ✅ Full CSS styling for chat with animations, message bubbles, suggestions
- ✅ Responsive design with sidebar tips and popular queries

## Features Implemented
- **Authentication**: Student/Parent/Vendor/Admin login with role-based access
- **Menu Management**: Rich meal catalog with nutritional info and health badges
- **Order System**: Students can browse and order meals with cart management
- **Health Tracking**: BMI calculator, nutritional intake tracking, meal suggestions
- **Gamification**: Health points, streak tracking, achievement badges
- **Parent Controls**: Parent approval for orders, spending limits, purchase history
- **Admin Analytics**: Sales analytics, top meals, time-based insights, revenue reports
- **AI Chat**: Google Gemini-powered nutrition assistant (NEW!)
- **Notifications**: Real-time order updates and health reminders
- **Feedback System**: User reviews and ratings for meals

## Technology Stack
- **Frontend**: HTML5, CSS3 (Neon gradient aesthetic), JavaScript ES6+, Font Awesome icons
- **Backend**: Flask 3.1.2, Python 3.11
- **Database**: PostgreSQL (Neon-backed via Replit)
- **AI**: Google Generative AI (Gemini Pro)
- **Server**: Gunicorn 23.0.0
- **Key Libraries**: Flask-Login, Flask-CORS, Flask-SQLAlchemy, Pillow, ReportLab

## Project Structure
```
bitebox/
├── backend/
│   ├── app.py (main Flask app with all routes and AI chat endpoint)
│   ├── models.py (database models)
│   └── [other backend files]
├── frontend/
│   ├── index.html (homepage with navigation)
│   ├── chat.html (AI chat interface - NEW!)
│   ├── menu.html (menu page)
│   ├── login.html (auth page)
│   ├── [other pages]
│   └── static/
│       ├── style.css (all styling including chat UI)
│       ├── chat.js (chat functionality - NEW!)
│       ├── app.js (global utilities)
│       └── [other scripts]
├── main.py (entry point)
└── requirements.txt (dependencies)
```

## Key Files Modified
- `bitebox/backend/app.py`: Added `/chat` route and `/api/chat` endpoint for AI
- `bitebox/frontend/chat.html`: New chat interface with welcome message and suggestions
- `bitebox/frontend/static/chat.js`: New JavaScript for message handling and API calls
- `bitebox/frontend/static/style.css`: Added comprehensive AI chat styling (1920+ lines)
- `bitebox/frontend/index.html`: Added "AI Chat" navigation link

## User Preferences
- Modern neon aesthetic with dark theme support
- Responsive design for mobile and desktop
- Smooth animations and polished UI

## Deployment Status
- Running on Gunicorn with 2 workers on port 5000
- PostgreSQL database connected
- Google AI API key configured and active
- All features functional and ready for production

## Next Steps (Optional)
- Add chat history persistence to database
- Implement user-specific meal recommendations based on health profile
- Add multi-language support for international schools
- Create mobile app version
- Implement payment gateway integration
