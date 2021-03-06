import css from './info.css';

import React from 'react';
import {Link} from 'react-router';


export default () => (
  <div>
    <p>I'm a Brooklyn-based frontend software engineer. I've worked at <a href="//google.com">Google</a>, <a href="//www.gree-corp.com/">GREE</a>, and <a href="//chartbeat.com">Chartbeat</a>.</p>
    <p><Link to='/work'>My work</Link> is a little all over the place.</p>
    <p>Non-profits like <a href="http://www.uniondocs.org/">UnionDocs</a> and <a href="http://brute.is">BRUTE LABS</a> get a lot of my spare time. So do reading and music. I like baseball, coffee roasting, good stories, southern style chicken sandwiches, and <a href="https://picasaweb.google.com/lh/photo/2y7uedPEW5x1cX3gMCJ6dD5wkiSZmM0FbXhobdmcDzo?feat=directlink">bowling</a>.</p>
    <p>I can be reached at <span className={css.email}>danny@(this website url)</span>.</p>
  </div>
);

