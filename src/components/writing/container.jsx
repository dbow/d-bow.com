import React from 'react';
import {provideHooks} from 'redial';

import {getPosts} from 'src/actions/index';

import FluxComponent from 'src/flux/component.jsx';
import Loading from 'src/components/loading/loading.jsx';
import Writing from './writing.jsx';


const dependencies = provideHooks({
  fetch: ({store}) => getPosts(store),
});

function WritingContainer(props) {
  const {store} = props;
  const posts = store.stores.posts.getState();
  if (posts) {
    return <Writing posts={posts} />;
  } else {
    return <Loading />;
  }
}


export default dependencies(FluxComponent(WritingContainer));

