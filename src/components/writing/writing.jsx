import css from './writing.css';

import React from 'react';


const createMarkup = post => {
  // Avoid mixed content warnings.
  const html = post.replace(/http\:\/\//g, '//');
  return {__html: html}
};

export default ({posts, error}) => {
  if (error) {
    return <div>Oops! There was a problem getting the posts :(</div>;
  }
  return (
    <div>
      { posts.map((post) => (
        <div key={post.id || post.link} className={css.post + (!post.post_url ? css.medium : '')}>
          <h2 className={css.h2}>{post.title}</h2>
          <div className={post.post_url ? css.content : ''} dangerouslySetInnerHTML={createMarkup((post.content || post.body))}></div>
          { post.post_url &&
            <a className={css.link} href={`${post.post_url}`}>continue reading</a>
          }
        </div>
      )) }
    </div>
  );
};


