from flask import Flask, render_template, send_from_directory, redirect
import os

app = Flask(__name__)

# Portfolio data
projects = [
    {
        "id": 1,
        "title": "Coming Soon",
        "description": "Work in progress.",
        "image": "loading.jpg",
        "demo_link": "https://your-live-demo-url.com/budget-tracker",
        "github_link": "https://github.com/yourusername/budget-tracker"

    },
    {
        "id": 2,
        "title": "Coming Soon",
        "description": "Work in progress.",
        "image": "loading.jpg",
        "demo_link": "https://your-live-demo-url.com/budget-tracker",
        "github_link": "https://github.com/yourusername/budget-tracker"

    },
    {
        "id": 3,
        "title": "Coming Soon",
        "description": "Work in progress.",
        "image": "loading.jpg",
        "demo_link": "https://your-live-demo-url.com/budget-tracker",
        "github_link": "https://github.com/yourusername/budget-tracker"

    }
]

# Profile data
profile = {
    "name": "Mathias Ulfsryggen",
    "titles": ["Backend Developer", "Software Engineer", "UI/UX Designer"],
    "about": [
        "Hi again, in case you forgot, I'm Mathias, I'm an aspiring <span class='highlight-word'>backend developer</span> with a love for creating <span class='highlight-word'>innovative</span> and <span class='highlight-word'>efficient</span> solutions to unique problems.",
        "I'm currently pursuing education in backend-programming to deepen my expertise, building on several years of self-taught coding experience.",
        "My programming journey began in my youth when I started experimenting with <span class='highlight-word'>HTML</span>, <span class='highlight-word'>Python</span>, and <span class='highlight-word'>CSS</span>—skills, which I've been refining ever since. This early foundation helped me develop a strong understanding of coding fundamentals.",
        "I believe in continuous learning and constantly challange myself to expand my knowledge. My goal is to create <span class='highlight-word'>efficient</span>, <span class='highlight-word'>scalable</span>, and <span class='highlight-word'>maintainable</span> systems that solve <span class='highlight-word'>real-world problems</span>."
    ],
    'social': {
        'linkedin': 'https://www.linkedin.com/in/mathias-ulfsryggen-5249a2320/',
        'github': 'https://github.com/Sutokay',
        'twitter': 'https://x.com/sutwokay',
        'email': 'mathiasulfsryggen@gmail.com'
    },
    "cv_file": "Mathias_Ulfsryggen_CV.pdf"
}


@app.route("/")
def home():
    return render_template("index.html", projects=projects, profile=profile)


@app.route("/download-cv")
def download_cv():
    try:
        # Check if the CV file exists, if not redirect to home
        cv_path = os.path.join(app.static_folder, 'files', profile['cv_file'])
        if not os.path.exists(cv_path):
            return redirect('/')

        return send_from_directory(
            directory=os.path.join(app.static_folder, 'files'),
            path=profile['cv_file'],
            as_attachment=True
        )
    except Exception as e:
        print(f"Error downloading CV: {e}")
        return redirect('/')


# Custom error handling
@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html', error="Page not found"), 404


@app.errorhandler(500)
def server_error(e):
    return render_template('index.html', error="Server error. Please try again later."), 500


if __name__ == "__main__":
    # Make sure the files directory exists
    os.makedirs(os.path.join(app.static_folder, 'files'), exist_ok=True)
    app.run(debug=True)
