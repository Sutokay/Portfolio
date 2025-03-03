from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/contact")
def contact():
    return "<h1>Contact me at: your_email@example.com</h1>"

if __name__ == "__main__":
    app.run(debug=True)
