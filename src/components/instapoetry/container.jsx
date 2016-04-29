import React from 'react';
import {provideHooks} from 'redial';

import {getPoems} from 'src/actions/index';

import FluxComponent from 'src/flux/component.jsx';
import Loading from 'src/components/loading/loading.jsx';
import Instapoetry from './instapoetry.jsx';


const dependencies = provideHooks({
  fetch: ({store}) => getPoems(store),
});

function InstapoetryContainer(props) {
  const {store} = props;
  const key = 'poems';
  const loading = store.request.inProgress(key);
  if (loading) {
    return <Loading />;
  }
  const poems = store.stores.poems.getState();
  const error = store.request.hasError(key);
  return <Instapoetry poems={poems} error={error} />;
}


export default dependencies(FluxComponent(InstapoetryContainer));

