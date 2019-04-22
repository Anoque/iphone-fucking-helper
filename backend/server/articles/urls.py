from django.conf.urls import url

from . import views

app_name = 'articles'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^add/', views.add, name='add'),
    url(r'^delete/', views.delete, name='delete'),
    url(r'^get/(?P<id>\d+)/$', views.get_article, name='get_article'),
    url(r'^get_posts_by_id/(?P<id>\d+)/$', views.get_posts_by_id, name='get_posts_by_id'),
    url(r'^all/', views.all, name='all'),
]
