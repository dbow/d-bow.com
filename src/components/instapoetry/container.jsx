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
  const poems = store.stores.poems.getState();
  if (poems) {
    return <Instapoetry poems={poems} />;
  } else {
    return <Loading />;
  }
}


export default dependencies(FluxComponent(InstapoetryContainer));

