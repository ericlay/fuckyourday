import os
import random
from flask import Flask, send_from_directory, session, Blueprint, render_template

app = Flask(__name__)
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
                    case 'Escape':
                        WEBSITE_DIRS.remove(dir)
                    case 'Marvel':    
                        WEBSITE_DIRS.remove(dir)
                    case 'Templates':
                        WEBSITE_DIRS.remove(dir)
            session['website_dir'] = random.choice(WEBSITE_DIRS)

@app.route('/<path:filename>', methods=['GET']) # Make static files available
def static_proxy(filename):
    try:
        return send_from_directory(session['website_dir'], filename)
    except KeyError:
        return render_template('404.html'),404

@app.route('/', methods=['GET']) # Serve site index.html
def index():
    if 'requests' in session: # init requests count
        session['requests'] += 1
    else:
        session['requests'] = 1
    current_website_dir() # Choose website dir
    try:
        return send_from_directory(session['website_dir'], 'index.html')
    except KeyError:
        return render_template('404.html'),404

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'),404

if __name__ == "__main__":
    app.run()
