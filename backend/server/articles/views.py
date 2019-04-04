import json
from django.shortcuts import render
from django.http import HttpResponse
from .models import Article
import pdb; pdb.set_trace()

# Create your views here.

def index(request):
    response_data = Article.objects.all()
    if (len(response_data) == 0):
	return HttpResponse("no data")
    else:
	print { response_data }
        return HttpResponse({response_data})
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
