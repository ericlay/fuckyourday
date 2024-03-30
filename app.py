import os
import random
from flask import Flask, send_from_directory, session, render_template

Fyourday = Flask(__name__)
Fyourday.config['TRAP_HTTP_EXCEPTIONS']=True
Fyourday.secret_key = '420-69-LOL' # For using client side session cookies
# Script must run from root dir containing all websites dirs 
# OR change the ROOT_DIR path :)
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

# Site choosing logic
def current_website_dir():
    WEBSITE_DIRS = [name for name in os.listdir(ROOT_DIR)
                    if not name.startswith('.')
                    and os.path.isdir(os.path.join(ROOT_DIR, name))]
    match session['requests']: #Match Nth page request
        case 5:
            session['website_dir'] = 'Marvel'
        case 6:
            session['website_dir'] = 'Escape'
            session.pop('requests', None) # Reset request count
        case _:
            for dir in WEBSITE_DIRS: 
                match dir: # Remove request specific pages
                    case 'Escape' | 'Marvel' | 'templates':
                        WEBSITE_DIRS.remove(dir)
            website_choice = random.choice(WEBSITE_DIRS)
            if 'website_dir' in session: # Don't serve templates back to back
                while website_choice == session['website_dir']:
                    website_choice = random.choice(WEBSITE_DIRS)
                session['website_dir'] = website_choice
            else:
                session['website_dir'] = website_choice

@Fyourday.route('/<path:filename>', methods=['GET']) # Make static files available
def static_proxy(filename):
    return send_from_directory(os.path.join(ROOT_DIR, session['website_dir']), filename)

@Fyourday.route('/', methods=['GET']) # Serve site index.html
def index():
    if 'requests' in session: # init requests count
        session['requests'] += 1
    else:
        session['requests'] = 1
    current_website_dir() # Choose website dir
    return send_from_directory(os.path.join(ROOT_DIR, session['website_dir']), 'index.html')

@Fyourday.errorhandler(Exception) # Handle uncaught exceptions per code
def handle_error(e): 
    try:
        if e.code < 400:
            return Flask.Response.force_type(e, Flask.request.environ)
        elif e.code == 404:
            return render_template('404.html', error='404'),404
        raise e
    except: 
        return render_template('500.html', error='500'),500

if __name__ == "__main__":
    Fyourday.run()
