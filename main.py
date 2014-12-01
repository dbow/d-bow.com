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
    """Utility class for blog-related queries."""

    def __init__(self):
        """Initialize Tumblr REST client."""

        self.client = pytumblr.TumblrRestClient(
        )

    def get_posts(self, tag):
        """Retrieve posts with the given tag from the Tumblr API."""

        response = self.client.posts(
            'dbow1234.tumblr.com',
            limit=10,
            filter='html',
            tag=tag
        )
        return response['posts'] or []


# Initialize shared blog client.
blog = BlogUtils()


class PostHandler(webapp.RequestHandler):
    """Blogpost-related request handling."""

    def get(self):
        """Get essays and instapoems from tumblr."""

        # Fetch essays.
        posts = memcache.get('posts')
        if posts is None:
            posts = blog.get_posts('essay')
            memcache.add('posts', posts, 3600)

        # Fetch instapoems.
        instapoems = memcache.get('instapoems')
        if instapoems is None:
            instapoems = blog.get_posts('instapoem')

            # Run posts through oembed API to get actual instagram details.
            poems = []
            for poem in instapoems:
                if 'link_url' in poem:
                    instagram_url = poem['link_url']
                else:
                    instagram_url = poem['permalink_url']
                endpoint = ('http://api.instagram.com/oembed?url={url}'
                            '&beta=true&omitscript=true'
                            '').format(url=urllib.quote(instagram_url))
                result = urlfetch.fetch(endpoint)
                if result.status_code == 200:
                    poems.append({
                      'content': result.content,
                      'url': instagram_url
                    })
            memcache.add('instapoems', poems, 3600)
            instapoems = poems

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(simplejson.dumps({
            'posts': posts,
            'poems': instapoems
        }))


# Flag for dev environment.
DEV = False


class MainHandler(webapp.RequestHandler):
    """Primary request handler serving site content."""

    def get(self):
        template_file = 'index.html' if DEV else 'index_dist.html'
        template_values = {
        }
        path = os.path.join(os.path.dirname(__file__), template_file)
        self.response.out.write(template.render(path, template_values))


def main():
    application = webapp.WSGIApplication([
                    ('/', MainHandler),
                    ('/posts', PostHandler)],
                    debug=True)
    util.run_wsgi_app(application)


if __name__ == '__main__':
    main()

