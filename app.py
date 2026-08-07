from flask import Flask, render_template, request, jsonify
from executor import run_command

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/execute', methods=['POST'])
def execute():
    data = request.get_json()
    command = data.get('command')
    
    if not command:
        return jsonify({'error': 'No command provided'})
    
    stdout, stderr = run_command(command)
    
    return jsonify({
        'output': stdout,
        'error': stderr
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8066)
