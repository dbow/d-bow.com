#!/usr/bin/env python

import cgi
import os
import urllib

import vendor
# insert `lib` as a site directory so our `main` module can load
# third-party libraries, and override built-ins with newer
# versions.
vendor.add('lib')

import pytumblr
from google.appengine.api import memcache
from google.appengine.api import urlfetch
from google.appengine.ext import webapp
from google.appengine.ext.webapp import util, template
from django.utils import simplejson


class BlogUtils:
    def __init__(self):
        self.client = pytumblr.TumblrRestClient(
            '6cq2WlfK8c8ADRbNz4bEoPoZwc0flU8i1sw2DYuaXgVjCXYTxe',
            'MyngCVGLXafXCR1WamWfn2eMU80tKPAwgmtBZ4g1X40Wwzxxw6',
            '0VbpaoilW4h2jBR9kgcq7gex7KwcABAhCcnjp1awJlm0wk5vQ9',
            'blN984nvPGzDr6jNSRCzsz8Ry95Nzud0rfSkNFMRl99xLtDXOU'
        )

    def get_posts(self, tag):
        """Retrieve posts with the given tag from the Tumblr API."""
        response = self.client.posts(
            'dbow1234.tumblr.com',
            limit=5,
            filter='html',
            tag=tag
        )
        return response['posts'] or []


blog = BlogUtils()


class PostHandler(webapp.RequestHandler):
    """Blogpost-related request handling."""

    def get(self):
        """Get """

        data = memcache.get('posts')
        if data is None:
            data = blog.get_posts('essay')
            memcache.add('posts', data, 60)

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(simplejson.dumps({'posts': data}))


class InstaPoemHandler(webapp.RequestHandler):
    """Insta-poem-related request handling."""

    def get(self):
        """Get """

        data = memcache.get('instapoems')
        if data is None:
            data = blog.get_posts('instapoem')
            poems = []
            for poem in data:
                if 'link_url' in poem:
                    instagram_url = poem['link_url']
                else:
                    instagram_url = poem['permalink_url']
                endpoint = 'http://api.instagram.com/oembed?url=' + urllib.quote(instagram_url) + '&beta=true&omitscript=true'
                result = urlfetch.fetch(endpoint)
                if result.status_code == 200:
                    poems.append(result.content)
            memcache.add('instapoems', poems, 60)
            data = poems

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(simplejson.dumps({'poems': data}))


class MainHandler(webapp.RequestHandler):
    """Primary request handler serving site content."""

    def get(self):
        template_values = {
        }
        path = os.path.join(os.path.dirname(__file__), 'index.html')
        self.response.out.write(template.render(path, template_values))


def main():
    application = webapp.WSGIApplication([
                    ('/', MainHandler),
                    ('/posts', PostHandler),
                    ('/instapoems', InstaPoemHandler)],
                    debug=True)
    util.run_wsgi_app(application)


if __name__ == '__main__':
    main()

