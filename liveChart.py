import json
from flask import Flask, render_template, make_response
from random import random
from time import time

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/live-data')
def live_data():
    data = [[time() * 1000, round(random() *100)], [time() * 1000, round(random() *100)]]
    response = make_response(json.dumps(data))
    response.content_type = 'application/json'
    return response 

if __name__ == '__main__':
    app.run(debug=True, host = '127.0.0.1', port=5000)