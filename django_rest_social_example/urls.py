from django.conf.urls import patterns, include, url
from django.contrib import admin

from .views import IndexView

urlpatterns = patterns('',
    url(r'^auth/', include('rest_framework_social_oauth2.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url('^.*$', IndexView.as_view(), name='index'),
)
