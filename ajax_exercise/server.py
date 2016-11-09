from flask import Flask, jsonify, request, render_template, redirect
import pg


app = Flask('app')
db = pg.DB(dbname='ajax')

@app.route('/')
def home():
    # this sends the contents of static/index.html
    return app.send_static_file('index.html')

@app.route('/search')
def search():
    # this sends the contents of static/results.json
    search = request.args.get('search')
    sql_search = "%" + search + "%"
    results = db.query("select * from website where title like $1", sql_search).dictresult()
    print results
    return jsonify(results)

app.run(debug=True)
