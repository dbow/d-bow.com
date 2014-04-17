#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

import os
import base64
import cgi
import logging
from django.utils import simplejson
from google.appengine.ext import webapp, db
from google.appengine.ext.webapp import util, template


class HighScore(db.Model):
  """A high score in the site game."""

  initials = db.StringProperty(default='DCB')
  score = db.IntegerProperty(default=0)
  date = db.DateTimeProperty(auto_now_add=True)


class GameId(db.Model):
  """A unique ID object.
  
  To post a high score, a valid game ID must be passed along to the server.
  The client gets this game ID via a GET request after page load.
  The game ID can only be retrieved once, and is stored in a private
  JavaScript variable.
  """
  
  game_id = db.StringProperty()
  retrieved = db.BooleanProperty(default=False)


class HighScoreHandler(webapp.RequestHandler):
  """Handles high score posting."""

  def post(self):
    """Adds a new High Score object and returns the new top 3."""

    game_id = cgi.escape(self.request.get('gameId'))
    game_id_valid = GameId().all().filter('game_id =', game_id).get()
    if game_id_valid:

      initials = cgi.escape(self.request.get('initials')[0:3]).encode('utf-8')
      if not initials:
        self.response.out.write(simplejson.dumps({'error': 'Initials required'}))
        return

      score = int(cgi.escape(self.request.get('score')))
      min_score = 0
      min_score_query = HighScore().all().order('-score').order('-date').fetch(3)
      if min_score_query:
        min_score = min_score_query[-1].score
      if score < min_score:
        self.response.out.write(simplejson.dumps({'error': 'Not a High Score'}))
        return
      if score > 20000:
        self.response.out.write(simplejson.dumps({'error': 'Freakishly High Score'}))
        return

      new_high_score = HighScore()
      new_high_score.score = score
      new_high_score.initials = initials.decode('utf-8')
      new_high_score.put()

      high_scores = HighScore().all().order('-score').order('-date').fetch(3)
      score_array = []
      for score in high_scores:
        score_array.append({'initials': score.initials, 'score': score.score})
      self.response.out.write(simplejson.dumps(score_array))

    else:
      self.response.out.write(simplejson.dumps({'error': 'Invalid ID'}))


class GameIdHandler(webapp.RequestHandler):
  """Handles requests for a unique game ID."""

  def get(self):
    """Returns game_id for the provided GameId Key."""

    game_key = cgi.escape(self.request.get('game_key'))
    try:
      game_id_object = GameId.get(db.Key(game_key))
      if game_id_object:
        if game_id_object.retrieved == True:
          self.response.out.write(simplejson.dumps({'error': 'Key in Use'}))
        else:
          game_id_object.retrieved = True
          game_id_object.put()
          game_id = game_id_object.game_id
          self.response.out.write(simplejson.dumps({'game_id': game_id}))
      else:
        self.response.out.write(simplejson.dumps({'error': 'Invalid Key'}))
    except db.BadKeyError:
      self.response.out.write(simplejson.dumps({'error': 'Invalid Key'}))


class MainHandler(webapp.RequestHandler):
  """Primary request handler serving site content."""

  def get(self):
    """Passes game high scores and unique ID to frontend."""

    # Retrieve top 3 scores.
    high_scores = HighScore().all().order('-score').order('-date').fetch(3)
    if high_scores:
      lowest_high_score = high_scores[len(high_scores) - 1].score
    else:
      high_scores = []
      lowest_high_score = 0

    # Generate a unique game ID for this request.
    unique_id = GameId()
    unique_id.game_id = base64.urlsafe_b64encode(os.urandom(30))
    unique_id.put()

    template_values = {
      'high_scores': high_scores,
      'lowest_high_score': lowest_high_score,
      'game_key': unique_id.key()
    }
    path = os.path.join(os.path.dirname(__file__), 'index.html')
    self.response.out.write(template.render(path, template_values))


def main():
  application = webapp.WSGIApplication([
                    ('/', MainHandler),
                    ('/game', GameIdHandler),
                    ('/highscore', HighScoreHandler)],
                    debug=True)
  util.run_wsgi_app(application)


if __name__ == '__main__':
  main()
