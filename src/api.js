import _ from 'lodash';
import express from 'express';
import tumblr from 'tumblr.js';
import request from 'superagent';


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

router.get('/posts', (req, res) => {
  const tag = 'essay';
  const limit = 10;
  const filter = 'html';
  client.posts('dbow1234', {tag, limit, filter}, (err, response) => {
    res.send(response.posts);
  });
});


router.get('/poems', (req, res) => {
  const tag = 'instapoem';
  const limit = 10;
  const filter = 'html';
  client.posts('dbow1234', {tag, limit, filter}, (err, response) => {
    const poems = response.posts.map((poem) => {
      const url = poem['link_url'] || poem['permalink_url'];
      const oembedUrl = 'http://api.instagram.com/oembed';
      const query = {
        url,
        beta: true,
        omitscript: true,
      };
      return new Promise((resolve, reject) => {
        request
          .get(oembedUrl)
          .query(query)
          .end((error, response) => {
            if (error) {
              reject(error, response && response.body);
            } else {
              resolve({
                content: response.body,
                url,
              });
            }
          });
      });
    });
    Promise.all(poems).then((results) => {
      res.send(results);
    });
  });
});


export default router;
