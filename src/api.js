import _ from 'lodash';
import express from 'express';
import tumblr from 'tumblr.js';
import request from 'request';

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
      const oembedUrl = `http://api.instagram.com/oembed?url=${url}&beta=true&omitscript=true`;
      return request(oembedUrl, (error, response, body) => {
        return {
          content: response.content,
          url: response['instagram_url'],
        };
      });
    });
    Promise.all(poems).then((result) => {
      res.send(result);
    });
  });
});


export default router;

