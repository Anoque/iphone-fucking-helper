import json
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from .models import Article

def index(request):
    response_data = Article.objects.all()

    if (len(response_data) == 0):
	return HttpResponse('{"error":"No data"}')
    else:
	data = {}
	data['data'] = []
	data['error'] = ''

	for a in response_data:
	    data['data'].append(a.to_object())
	
        return HttpResponse(json.dumps(data), content_type = 'json')

def add(request):
    if (request.method == "GET"):
	return HttpResponse('{"test":"1234"}')
    elif (request.method == "POST"):
	article = Article()
	article.title = request.POST.get("title")
	article.date = request.POST.get("date")
	article.save()
	return HttpResponse("Ok")
    else:
	return HttpResponse("No method")
