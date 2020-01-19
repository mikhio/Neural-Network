from flask import Flask
from flask import send_file, make_response, request
import json

def readFiles(path):
	with open(path, 'r') as f:
		return f.read()

app = Flask(__name__)
config = json.loads(readFiles('./config.json'))


def checkExp(name):
	exp = ''
	isStartExp = False

	for l in name:
		if isStartExp:
			exp += l

		if l == '.':
			isStartExp = True


@app.route('/')
def root():
	return readFiles('view/index.html')

@app.route('/static/<path>')
def sendStatics(path):
	filepath = 'view/static/' + path
	if checkExp(path):
		response = make_response(send_file(filepath))
		response.headers['Content-Type'] = 'text/css'
		return response

	return send_file(filepath)

@app.route('/api/grid', methods=['POST'])
def grid():
	dict = request.get_json()
	return 'Status: 200'




if __name__ == '__main__':
	app.run(host=config['host'], port=config['port'])
