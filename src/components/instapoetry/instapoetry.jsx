import css from './instapoetry.css';

import React from 'react';


export default ({poems, error}) => {
  if (error) {
    return <div>Something went wrong :( No insta-poems for you!</div>;
  }
  return (
    <div>
      { poems.map(({url, content: {media_id, thumbnail_url, title}}) => (
        <div key={media_id} className={css.poem}>
          <a href={`${url}`}>
            <img className={css.img} src={`${thumbnail_url}`} />
          </a>
          <div className={css.caption}>
            <span className={css.drop}>{title[0]}</span>{title.slice(1)}
          </div>
        </div>
      )) }
    </div>
  );
};

