from flask import Flask, jsonify, request
app = Flask('app')

@app.route('/')
def home():
    # this sends the contents of static/index.html
    return app.send_static_file('index.html')

@app.route('/search')
def search():
    # this sends the contents of static/results.json
    return app.send_static_file('results.json')

app.run(debug=True)
