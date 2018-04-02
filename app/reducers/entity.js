import { combineReducers } from 'redux';
import * as types from '../types';

const availableEntityTypes = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.FETCH_AVAILABLE_ENTITIES_SUCCESS:
      if (action.data) return action.data;
      return state;
    default:
      return state;
  }
};

const level1Entity = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.FETCH_DEFAULT_LEVEL_1_ENTITY_SUCCESS:
      //if (action.data) return action.data;
      //return state;
      return action.data;
    case types.SELECT_LEVEL_1_ENTITY:
      return action.data;
    default:
      return state;
  }
};

const level2Entity = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.FETCH_DEFAULT_LEVEL_2_ENTITY_SUCCESS:
      if (action.data) return action.data;
      return state;
    case types.SELECT_LEVEL_2_ENTITY:
      return action.data;
    default:
      return state;
  }
};

const entityReducer = combineReducers({
  availableEntityTypes,
  level1Entity,
  level2Entity
});

export default entityReducer;
