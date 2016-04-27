import * as api from 'src/utils/api';


export function getPosts(store) {
  const cacheKey = 'posts';
  const cacheTtl = 10 * 1000;
  if (!store.cache.expired(cacheKey, cacheTtl)) {
    return Promise.resolve();
  }

  const promise = api.get('posts').then((response) => {
    store.stores.posts.setState(response);
    store.cache.set(cacheKey);
  });

  return promise;
}


