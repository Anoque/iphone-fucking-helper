from django.conf.urls import include, url
from django.contriv import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^articles', include('articles.urls')),
]
