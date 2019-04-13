import json
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from .models import Article, ArticleRelation
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import custom_data_module

@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def index(request):
    response_data = Article.objects.all()
    if len(response_data) == 0:
        return HttpResponse("test")
    else:
        data = []
        for a in response_data:
            data.append(a.to_object())

        return HttpResponse(custom_data_module.getResponse(data), content_type = 'json')


@api_view(['POST'])
@permission_classes(())
def add(request, format=None):
    if request.method == "POST":
        data = json.loads(request.body)

        if data['title'] and len(data['title']) > 0 and data['date'] and len(data['date']):
            article = Article()
            article.title = data["title"]
            article.date = data["date"]
            article.description = data["description"]
            article.save()

            if data['parents'] and len(data['parents']) > 0:
                for relation in data['parents']:
                    article_relation = ArticleRelation()
                    article_relation.parent = article.id
                    article_relation.relation = relation
                    article_relation.save()

            if data['children'] and len(data['children']) > 0:
                for relation in data['children']:
                    article_relation = ArticleRelation()
                    article_relation.parent = relation
                    article_relation.relation = article.id
                    article_relation.save()

            return HttpResponse(custom_data_module.getResponse({"id":article.id}), content_type = 'json')
        else:
            return HttpResponse('{"error": "No parameters"}')
    else:
        return HttpResponse('{"error": "No method"}')

@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def delete(request, format=None):
    if request.method == "POST":
        data = json.loads(request.body)

        if data['id']:
            id = int(data['id'])
            article = Article.objects.get(id = id)
            article.delete()

            parents = ArticleRelation.objects.filter(parent = id)

            for parent in parents:
                parent.delete()

            relations = ArticleRelation.objects.filter(relation = id)

            for relation in relations:
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
        if len(data) > 0:
            answer = []
            for a in data:
                article = Article.objects.get(id = a.relation)
                if article:
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

def all(request):
    if request.method == "GET":
        data = []
        articles = Article.objects.all()
        for article in articles:
            data.append(article.to_object())

        return HttpResponse(custom_data_module.getResponse(data), content_type = 'json')
    else:
        return HttpResponse(custom_data_module.getError("WTF?"))