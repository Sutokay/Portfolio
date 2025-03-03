from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')  # This looks for 'index.html' inside 'templates/'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)  # Render assigns a port automatically
