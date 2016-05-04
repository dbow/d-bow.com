import './app.global.css';
import css from './app.css';

import React from 'react';

import Nav from 'src/components/nav/nav.jsx';
import Footer from 'src/components/footer/footer.jsx';


export default (props) => {
  return (
    <div className={css.app}>
      <Nav />
      <div>
        {props.children}
      </div>
      <Footer />
    </div>
  );
}

