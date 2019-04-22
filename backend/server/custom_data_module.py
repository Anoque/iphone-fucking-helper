import json

response = {
	"data": {},
	"error": ""
}

def getResponse(data, isJson = True):
	response['data'] = data
	response['error'] = ''
	return json.dumps(response) if isJson else response

def getError(error, isJson = True):
	response['data'] = {}
	response['error'] = error

	return json.dumps(response) if isJson else response
