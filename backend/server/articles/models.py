from django.db import models


# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateTimeField('date published')
    description = models.TextField()

    def to_object(self):
        return {
            "id": self.id,
            "title": self.title,
            "date": self.date.strftime("%Y-%m-%d %H:%M:%S"),
            "description": self.description
        }


class ArticleRelation(models.Model):
    parent = models.IntegerField()
    relation = models.IntegerField()
