from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'django_rest_social_example.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^auth/', include('rest_framework_social_oauth2.urls')),
    url(r'^admin/', include(admin.site.urls)),
)
