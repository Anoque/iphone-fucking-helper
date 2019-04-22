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
            article = Article() if data['id'] == '' else Article.objects.get(id=data['id'])
            article.title = data["title"]
            article.date = data["date"]
            article.description = data["description"]
            article.save()
            p = []
            c = []

            if type(data['id']) == int:
                p = list(map(to_parent_list, ArticleRelation.objects.filter(parent = data['id'])))
                c = list(map(to_relation_list, ArticleRelation.objects.filter(relation = data['id'])))
                if 0 in p:
                    p.remove(0)
                if 0 in c:
                    c.remove(0)

            p_d = p
            c_d = c

            if data['parents'] and len(data['parents']) > 0:
                for relation in data['parents']:
                    if relation not in p:
                        article_relation = ArticleRelation()
                        article_relation.parent = article.id
                        article_relation.relation = relation
                        article_relation.save()
                    else:
                        p_d.remove(relation)

            if data['children'] and len(data['children']) > 0:
                for relation in data['children']:
                    if relation in c:
                        article_relation = ArticleRelation()
                        article_relation.parent = relation
                        article_relation.relation = article.id
                        article_relation.save()
                    else:
                        c_d.remove(relation)

            for delete in p_d:
                el = ArticleRelation.objects.get(parent=article.id, relation=delete)
                el.delete()
            for delete in c_d:
                el = ArticleRelation.objects.get(parent=delete, relation=article.id)
                el.delete()

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

def get_relations(id, isParent = True):
    data = ArticleRelation.objects.filter(parent=id) if isParent else ArticleRelation.objects.filter(relation=id)
    if (len(data) > 0):
        answer = []
        for a in data:
            if a.relation == 0 or a.parent == 0:
                continue
            article = Article.objects.get(id = a.relation if isParent else a.parent)
            answer.append(article.to_object())
        return answer
    else:
        return []

def get_article(request, id):
    data = {}
    if (int(id) > 0):
        try:
            data['article'] = Article.objects.get(id = id).to_object()
            data['parents'] = get_relations(id)
            data['children'] = get_relations(id, False)
        except Exception:
            return HttpResponse(custom_data_module.getError('Not found'), content_type = 'json')
    else:
        data['article'] = {
            "id": 0,
            "title": "",
            "description": "",
            "date": "1970-01-01 00:00:00"
        }
    return HttpResponse(custom_data_module.getResponse(data), content_type = 'json')

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

def to_id_list(item, isParent = True):
    return item.relation if isParent else item.parent

def to_parent_list(item):
    return to_id_list(item, True)

def to_relation_list(item):
    return to_id_list(item, False)