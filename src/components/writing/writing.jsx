import css from './writing.css';

import React from 'react';


const createMarkup = post => {
  // Avoid mixed content warnings.
  const body = post.body.replace(/http\:\/\//g, '//');
  return {__html: body}
};

export default ({posts, error}) => {
  if (error) {
    return <div>Oops! There was a problem getting the posts :(</div>;
  }
  return (
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
};


