from django.contrib import admin
from .models import Article, ArticleRelation
# Register your models here.

admin.site.register(Article)
admin.site.register(ArticleRelation)
