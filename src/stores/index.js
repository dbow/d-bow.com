import _ from 'lodash';
import EventEmitter from 'events';
import update from 'react-addons-update';

import PostStore from './posts';

import Cache from './cache';
import Request from './request';


class IndexStore extends EventEmitter {
  constructor() {
    super();

    this.stores = {
      posts: new PostStore(),
    };

    this.cache = new Cache();
    this.request = new Request();
  }

  initialize(data) {
    _.forEach(this.stores, (store) => {
      store.initialize(data);
      store.on('update', () => {
        this.emit('update');
      });
    });

    this.cache.initialize(data._cache);
  }

  serialize() {
    let data = _.reduce(this.stores, (state, store) => {
      const storeState = store.serialize();
      if (storeState) {
        state = update(state, {$merge: storeState});
      }
      return state;
    }, {});

    data._cache = this.cache.serialize();

    return data;
  }
}


export default IndexStore;

