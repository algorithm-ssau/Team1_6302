from flask import Flask, render_template, send_from_directory, redirect, url_for

app = Flask(__name__, static_folder=".", template_folder=".")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/index.html')
def index_html():
    return render_template('index.html')

@app.route('/catalog.html')
def catalog():
    return render_template('catalog.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run(debug=True)