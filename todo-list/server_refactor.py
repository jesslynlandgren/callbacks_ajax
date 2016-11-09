from flask import Flask, jsonify, request
import pg

app = Flask('todo-list')
db = pg.DB(dbname='todo_list_db')

@app.route('/')
def home():
    return app.send_static_file('index_refactor.html')

@app.route('/tasks')
def list_tasks():
    results = db.query('select * from task order by id').dictresult()
    return jsonify(results)

@app.route('/add_task', methods=['POST'])
def add_task():
    description = request.form.get('task')
    result = db.insert('task', description=description)
    return jsonify(result)

@app.route('/remove_task', methods=['POST'])
def remove_task():
    taskID = request.form.get('id')
    print taskID
    result = db.query('delete from task where id = $1', taskID)
    return jsonify(result)

@app.route('/mark_task', methods=['POST'])
def mark_task():
    taskID = request.form.get('id')
    done = request.form.get('done')
    result = db.update('task', id=taskID, done=done)
    return jsonify(result)

@app.route('/remove_complete', methods=['POST'])
def remove_complete():
    result = db.query('delete from task where done = true')
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
