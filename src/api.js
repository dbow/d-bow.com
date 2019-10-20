import _ from 'lodash';
import express from 'express';
import tumblr from 'tumblr.js';
import request from 'superagent';
import {rss} from 'feed-read';

let env;
try {
  env = require('./env.json');
  _.defaults(process.env, env);
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND'){
    console.log('No env.json found. Assuming production.');
  } else {
    console.log('Error loading env', error);
  }
}

const client = tumblr.createClient({
  consumer_key: process.env.TUMBLR_API_KEY,
  consumer_secret: process.env.TUMBLR_API_SECRET,
});

const router = express.Router();

const cache = {
  posts: {
    time: 0,
    data: [],
  },
  poems: {
    time: 0,
    data: [],
  },
};
// Cache for an hour.
const TTL = 60 * 60 * 1000;

function cached(key) {
  return (req, res, next) => {
    const cacheData = cache[key];
    if (!cacheData) {
      return next();
    }
    const now = new Date().getTime();
    if (now - cacheData.time < TTL) {
      res.send(cacheData.data);
    } else {
      next();
    }
  };
}

function getTumblrPosts(tag = 'essay') {
  return new Promise((resolve, reject) => {
    const limit = 10;
    const filter = 'html';
    client.blogPosts('dbow1234', {tag, limit, filter}, (err, response) => {
      if (err) {
        console.log(err);
        console.log('TUMBLR ERR');
        reject(err, response);
      } else {
        resolve(response.posts);
      }
    });
  });
}

function getMediumPosts() {
  return new Promise((resolve, reject) => {
    request
      .get('https://medium.com/feed/@dbow1234')
      .end((error, response) => {
        if (error) {
          reject(error, response);
        } else {
          rss(response.text || '', (err, articles) => {
            if (err) {
              reject(err, response);
            } else {
              resolve(articles);
            }
          });
        }
      });
  });
}

function getInstagramEmbed(url) {
  const OEMBED_URL = `https://api.instagram.com/oembed?url=${encodeURIComponent(url)}&omitscript=true`;
  return new Promise((resolve, reject) => {
    request
      .get(OEMBED_URL, function (error, response) {
        const content = response && response.body;
        if (error || !content || _.isEmpty(content)) {
          reject(error, content);
        } else {
          resolve({
            content,
            url,
          });
        }
      });
  });
}


router.get('/posts', cached('posts'), (req, res) => {
  Promise.all([
    getTumblrPosts(),
    getMediumPosts()
  ]).then((results) => {
    cache.posts = {
      data: results,
      time: new Date().getTime(),
    };
    res.send(results);
  }).catch((error) => {
    res.sendStatus(500);
  });
});

router.get('/poems', cached('poems'), (req, res) => {
  getTumblrPosts('instapoem')
    .then((result) => {
      const poems = result.map((poem) => {
        const url = poem['link_url'] || poem['permalink_url'];
        return getInstagramEmbed(url);
      });
      Promise.all(poems)
        .then((results) => {
          cache.poems = {
            data: results,
            time: new Date().getTime(),
          };
          res.send(results);
        })
        .catch((error) => {
          res.sendStatus(500);
        });
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});


export default router;

