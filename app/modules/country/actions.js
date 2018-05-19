import React from 'react';
import { Link } from 'react-router';
import { createActions } from 'redux-actions';

// actions
export const FETCH_COUNTRY_DATA = 'FETCH_COUNTRY_DATA';
export const FETCH_COUNTRY_DATA_SUCCESS = 'FETCH_COUNTRY_DATA_SUCCESS';

export const {
  fetchCountryData,
  fetchCountryDataSuccess
} = createActions(
  FETCH_COUNTRY_DATA,
  FETCH_COUNTRY_DATA_SUCCESS
);

export const buildIndicatorLink = (cell) => {
  const [value, label, country] = cell.split('|');
  return React.createElement(Link, { to: `/data/${country}/${value}`}, label);
};
