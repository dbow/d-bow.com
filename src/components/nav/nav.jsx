import css from './nav.css';

import React from 'react';
import {Link} from 'react-router';


export default () => (
  <nav className={css.nav}>
    <h2 className={css.h2}>Danny Bowman</h2>&#8217;s&nbsp;
    <Link className={css.link} to="/work" activeClassName={css.active}>work</Link>
    ,&nbsp;
    <Link className={css.link} to="/writing" activeClassName={css.active}>writing</Link>
    ,&nbsp;
    <Link className={css.link} to="/music" activeClassName={css.active}>music</Link>
    ,&nbsp;
    <Link className={css.link} to="/instapoetry" activeClassName={css.active}>insta-poems</Link>
    ,&nbsp;
    <span className={css.amp}> &amp; </span>
    <Link className={css.link} to="/info" activeClassName={css.active}>info</Link>.
  </nav>
);



