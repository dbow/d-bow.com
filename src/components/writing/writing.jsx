import css from './writing.css';

import React from 'react';
import classnames from 'classnames';


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
        <div key={post.id || post.link} className={classnames(css.post, {[css.medium]: !post.post_url})}>
          <h2 className={css.h2}>{post.title}</h2>
          <div className={classnames({[css.content]: !!post.post_url})} dangerouslySetInnerHTML={createMarkup((post.content || post.body))}></div>
          { post.post_url &&
            <a className={css.link} href={`${post.post_url}`}>continue reading</a>
          }
        </div>
      )) }
    </div>
  );
};


