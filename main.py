import sys
import os

# Add the backend directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'code', 'backend'))

# Import the Flask app instance
from app import app

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
