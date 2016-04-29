import * as api from 'src/utils/api';


export function getPosts(store) {
  const cacheKey = 'posts';
  const cacheTtl = 60 * 60 * 1000; // Cache an hour on client.
  if (!store.cache.expired(cacheKey, cacheTtl)) {
    return Promise.resolve();
  }

  store.request.start(cacheKey);

  const promise = api.get('posts')
    .then((response) => {
      store.request.finish(cacheKey);
      store.stores.posts.setState(response);
      store.cache.set(cacheKey);
    })
    .catch((error) => {
      store.request.error(cacheKey);
      store.stores.posts.setState([]);
    });

  return promise;
}


export function getPoems(store) {
  const cacheKey = 'poems';
  const cacheTtl = 60 * 60 * 1000; // Cache an hour on the client.
  if (!store.cache.expired(cacheKey, cacheTtl)) {
    return Promise.resolve();
  }

  store.request.start(cacheKey);

  const promise = api.get('poems')
    .then((response) => {
      store.request.finish(cacheKey);
      store.stores.poems.setState(response);
      store.cache.set(cacheKey);
    })
    .catch((error) => {
      store.request.error(cacheKey);
      store.stores.poems.setState([]);
    });

  return promise;
}


