import os
import uuid
import random
from flask import Flask, send_from_directory, request

app = Flask(__name__)

# Implement count to load specific page on Nth
request_count = 0
unique_requests = set()

# Script must run from root dir containing all websites dirs 
# OR change the ROOT_DIR path below :)
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
WEBSITE_DIRS = [name for name in os.listdir(ROOT_DIR) if not name.startswith('.') and os.path.isdir(os.path.join(ROOT_DIR, name))]

# Site choosing logic
website_dir = None
def current_website_dir():
    global request_count
    request_count += 1
    if request_count % 5 == 0:
        global website_dir
        website_dir = str(ROOT_DIR+"/Marvel")
    elif request_count % 6 == 0:
        website_dir = str(ROOT_DIR+"/Escape")
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
    current_website_dir()
    return send_from_directory(website_dir, 'index.html')

if __name__ == "__main__":
    app.run()
