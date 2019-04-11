import json
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from .models import Article, ArticleRelation
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
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


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def add(request, format=None):
    if request.method == "POST":
        data = json.loads(request.body)

        if data['title'] != None and len(data['title']) > 0 and data['date'] != None and len(data['date']):
            article = Article()
            article.title = data["title"]
            article.date = data["date"]
            article.description = data["description"]
            article.save()

            return HttpResponse('{"status": true}')
        else:
            return HttpResponse('{"error": "No parameters"}')
    else:
        return HttpResponse('{"error": "No method"}')

@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def delete(request, format=None):
    if request.method == "POST":
        data = json.loads(request.body)

        if data['id'] != None:
            id = int(data['id'])
            article = Article.objects.get(id = id)
            article.delete()

            parents = ArticleRelation.objects.filter(parent = id)

            for parent in parents:
                parent.delete()

            relations = ArticleRelation.objects.filter(relation = id)

            for relation in realtions:
                relation.delete()

            return HttpResponse('{"status": true}')
        else:
            return HttpResponse('{"error": "No id"}')
    else:
        return HttpResponse('{"error": "No method"}')

def get_relations(id):
    data = ArticleRelation.objects.filter(parent = id)
    if (len(data) > 0):
        answer = []
        for a in data:
            article = Article.objects.get(id = a.relation)
            answer.append(article.to_object())
        return answer
    else:
        return []

def get_article(request, id):
    data = {}
    if (int(id) > 0):
        data['article'] = Article.objects.get(id = id).to_object()
    else:
        data['article'] = {
            "id": 0,
            "title": "",
            "description": "",
            "date": "1970-01-01 00:00:00"
        }
    
    data['relations'] = get_relations(id)
    return HttpResponse(json.dumps({"data": data, "error": ""}), content_type = 'json')

def get_posts_by_id(request, id):
    if request.method == 'GET':
        print(id)
        data = ArticleRelation.objects.filter(parent = id)
        if (len(data) > 0):
            answer = []
            for a in data:
                article = Article.objects.get(id=a.relation)
                if (article and article != None):
                    answer.append({
                        "parent": a.parent,
                        "relation": a.relation,
                        "article_title": article.title
                    })

            return HttpResponse(json.dumps({"data": answer, "error": ""}), content_type = 'json')
        else:
            return HttpResponse('[]')
    else:
        return HttpResponse('{"error":"Must be GET"}')