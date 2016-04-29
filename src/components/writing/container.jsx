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
  const key = 'posts';
  const loading = store.request.inProgress(key);
  if (loading) {
    return <Loading />;
  }
  const posts = store.stores.posts.getState();
  const error = store.request.hasError(key);
  return <Writing posts={posts} error={error} />;
}


export default dependencies(FluxComponent(WritingContainer));

