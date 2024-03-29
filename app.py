import os
import random
from flask import Flask, send_from_directory, session, render_template

app = Flask(__name__)
app.config['TRAP_HTTP_EXCEPTIONS']=True
app.secret_key = '420-69-LOL' # For using client side session cookies

# Site choosing logic
def current_website_dir():
    # Script must run from root dir containing all websites dirs 
    # OR change the ROOT_DIR path :)
    ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
    WEBSITE_DIRS = [name for name in os.listdir(ROOT_DIR)
                    if not name.startswith('.')
                    and os.path.isdir(os.path.join(ROOT_DIR, name))]
    session.pop('website_dir', None) # Clear website_dir if exist
    match session['requests']: #Match Nth page request
        case 5:
            session['website_dir'] = (os.path.join(ROOT_DIR, 'Marvel'))
        case 6:
            session['website_dir'] = (os.path.join(ROOT_DIR, 'Escape'))
            session.pop('requests', None) # Reset request count
        case _:
            for dir in WEBSITE_DIRS: 
                match dir: # Remove request specific pages
                    case 'Escape' | 'Marvel' | 'templates':
                        WEBSITE_DIRS.remove(dir)
            session['website_dir'] = random.choice(WEBSITE_DIRS)

@app.route('/<path:filename>', methods=['GET']) # Make static files available
def static_proxy(filename):
    return send_from_directory(session['website_dir'], filename)

@app.route('/', methods=['GET']) # Serve site index.html
def index():
    if 'requests' in session: # init requests count
        session['requests'] += 1
    else:
        session['requests'] = 1
    current_website_dir() # Choose website dir
    return send_from_directory(session['website_dir'], 'index.html')

@app.errorhandler(Exception) # Handle uncaught exceptions per code type
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
    app.run()
