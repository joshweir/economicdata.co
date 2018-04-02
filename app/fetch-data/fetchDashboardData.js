import { entityService } from '../services';
import * as types from '../types';

const fetchAvailableEntityTypes = (store) => {
  store.dispatch({ type: types.FETCH_AVAILABLE_ENTITIES });
  return entityService().getAvailableEntityTypes()
  .then(({data}) => {
    store.dispatch({ type: types.FETCH_AVAILABLE_ENTITIES_SUCCESS, data });
    return data;
  })
  .catch((error) => {
    return store.dispatch({ type: types.FETCH_AVAILABLE_ENTITIES_FAILURE, error });
    /*
    if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
        return [];
      */
  });
};

const fetchDefaultEntity = (params, store, theAvailableEntityTypes) => {
  store.dispatch({ type: types.FETCH_DEFAULT_LEVEL_1_ENTITY });
  const [firstAvailableEntityType] = theAvailableEntityTypes || [];
  return entityService().getDefaultEntities(params, firstAvailableEntityType)
  .then(({data}) => {
    store.dispatch({ type: types.FETCH_DEFAULT_LEVEL_1_ENTITY_SUCCESS, data });
    return data;
  })
  .catch((error) => {
    return store.dispatch({ type: types.FETCH_DEFAULT_LEVEL_1_ENTITY_FAILURE, error });
    /*
    if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
        return [];
      */
  });
};

const fetchData = (params, store) => {
  return fetchAvailableEntityTypes(store)
    .then((theAvailableEntityTypes) => {
      return fetchDefaultEntity(params, store, theAvailableEntityTypes)
    });
};

export default fetchData;
