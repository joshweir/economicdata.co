import _ from 'lodash';

const inBrowser = () => typeof window !== 'undefined';
const resetServerStateAndCheckIsFirstLoad = () => {
  let isFirstLoad = false;
  if (window.__INITIAL_STATE__ !== null) {
    window.__INITIAL_STATE__ = null;
    isFirstLoad = true;
  }
  return isFirstLoad;
};

export const paramsHaveChanged = (params, nextParams) => {
  return typeof nextParams === 'undefined' ||
    !_.isEqual(params, nextParams);
};

export const preloadDynamic = (actions) => {
  if (!inBrowser() || resetServerStateAndCheckIsFirstLoad()) {
    return;
  }
  console.log('here!!!!');
  actions.forEach((action) => {
    console.log('doing dynamic fetch!!! params: ', ' action: ', action.action, ' args: ', action.args);
    action.action(action.args);
  });
};
