import json
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from .models import Article
from django.views.decorators.csrf import csrf_exempt

def index(request):
    response_data = Article.objects.all()
    if len(response_data) == 0:
        return HttpResponse("test")
    else:
        data = {}
        data['data'] = []
        data['error'] = ''
        for a in response_data:
            data['data'].append(a.to_object())
        return HttpResponse(json.dumps(data), content_type = 'json')

@csrf_exempt
def add(request):
    if request.method == "POST":
        data = json.loads(request.body)

        if data['title'] != None and len(data['title']) > 0 and data['date'] != None and len(data['date']):
            article = Article()
            article.title = data["title"]
            article.date = data["date"]
            article.save()

            return HttpResponse('{"status": true}')
        else:
            return HttpResponse('{"error": "No parameters"}')
    else:
        return HttpResponse('{"error": "No method"}')

@csrf_exempt
def delete(request):
    if request.method == "POST":
        data = json.loads(request.body)
        print(request.body)
        print(data['id'])
        if data['id'] != None:
            article = Article.objects.get(id=int(data['id']))
            article.delete()
            return HttpResponse('{"status": true}')
        else:
            return HttpResponse('{"error": "No id"}')
    else:
        return HttpResponse('{"error": "No method"}')