import os
import random
from flask import Flask, send_from_directory, session

app = Flask(__name__)

# Implement count to load specific page on Nth load
# Using session['requests']
app.secret_key = '420-69'

# Script must run from root dir containing all websites dirs 
# OR change the ROOT_DIR path below :)
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
WEBSITE_DIRS = [name for name in os.listdir(ROOT_DIR) if not name.startswith('.') and os.path.isdir(os.path.join(ROOT_DIR, name))]

# Site choosing logic
website_dir = None
def current_website_dir():
    if session['requests'] % 5 == 0:
        global website_dir
        website_dir = str(ROOT_DIR+"/Marvel")
    elif session['requests'] % 6 == 0:
        website_dir = str(ROOT_DIR+"/Escape")
        session.pop('requests', None)
    else:
        global WEBSITE_DIRS
        try:
            WEBSITE_DIRS.remove('Escape')
            WEBSITE_DIRS.remove('Marvel')
        except (ValueError, IndexError) as e:
            pass
        website_dir = random.choice(WEBSITE_DIRS)

# Make static files available
@app.route('/<path:filename>', methods=['GET'])
def static_proxy(filename):
    return send_from_directory(website_dir, filename)

# Serve site index.html
@app.route('/', methods=['GET'])
def index():
    if 'requests' in session:
        session['requests'] += 1
    else:
        session['requests'] = 1
    current_website_dir()
    return send_from_directory(website_dir, 'index.html')

if __name__ == "__main__":
    app.run()
