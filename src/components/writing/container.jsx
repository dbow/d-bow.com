import React from 'react';
import {provideHooks} from 'redial';
import _ from 'lodash';

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
  const posts = _.chain(store.stores.posts.getState())
      .flatten()
      .sortBy((post) => post.date || post.published)
      .reverse()
      .filter((post) => {
        // Remove "response" posts in Medium based on length...
        return (post.content || post.body).length > 400;
      })
      .value();
  const error = store.request.hasError(key);
  return <Writing posts={posts} error={error} />;
}


export default dependencies(FluxComponent(WritingContainer));

