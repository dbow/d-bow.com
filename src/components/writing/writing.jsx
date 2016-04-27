import css from './writing.css';

import React from 'react';


const createMarkup = post => (
  {__html: post.body}
);

export default ({posts}) => (
  <div>
    { posts.map((post) => (
      <div key={post.id} className={css.post}>
        <h2 className={css.h2}>{post.title}</h2>
        <div className={css.content} dangerouslySetInnerHTML={createMarkup(post)}></div>
        <a className={css.link} href={`${post.post_url}`}>continue reading</a>
      </div>
    )) }
  </div>
);


