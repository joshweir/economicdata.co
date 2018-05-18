import { createSelector } from 'reselect';
import { getCountryIndicatorsForSelect } from '../masterData/selectors';

export const getCountry = state => state.country.country;
export const getCountryDisplay = state => state.country.countryLabel;
export const getCountryData = (state, country) => (
  state.masterData.countriesIndicators
  .filter(d => d.country === country)[0]
);
export const getCountryIndicators = createSelector(
  getCountryIndicatorsForSelect,
  getCountry,
  (indicators, country) => (
    indicators.map(d => (
      { ...d, valueLabelAndCountry: `${d.value}|${d.label}|${country}` }
    ))
  )
);
