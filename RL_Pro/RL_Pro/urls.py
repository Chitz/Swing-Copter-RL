"""RL_Pro URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
# from SwingCopter import views
from SwingCopter.views import *
from .settings import *
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', contact, name='home'),
    # url(r'^contact/$', views.contact, name='contact'),
    # url(r'^api-auth/',include('rest_framework.urls',namespace='rest_framework'))
    url(r'^api/play_count_by_month', play_count_by_month, name='play_count_by_month'),

    # url(r'^play_count_by_month/', views.play_count_by_month, name='play_count_by_month'),

]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)