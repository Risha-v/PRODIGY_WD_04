from flask import Flask, render_template, send_file
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/download_cv')
def download_cv():
    cv_path = os.path.join(app.root_path, 'static', 'cv', 'cv.pdf')
    return send_file(cv_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)