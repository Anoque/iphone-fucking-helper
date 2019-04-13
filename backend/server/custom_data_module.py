import json

response = {
	"data": {},
	"error": ""
}

def getResponse(data, isJson = True):
	response['data'] = data

	return json.dumps(response) if isJson else response

def getError(error, isJson = True):
	response['error'] = error

	return json.dumps(response) if isJson else response
