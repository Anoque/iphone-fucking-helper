from django.db import models

# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateTimeField('date published')

class ArticleRelation(models.Model):
    parent = models.IntegerField()
    relation = models.IntegerField()
