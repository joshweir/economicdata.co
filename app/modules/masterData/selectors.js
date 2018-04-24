import { createSelector } from 'reselect';

export const getCountriesIndicators = state => state.masterData.countriesIndicators;
export const getCountrySelected = state => state.masterData.countrySelected;
export const getCountryIndicatorSelected = state => state.masterData.countryIndicatorSelected;
export const getCountriesForSelect = createSelector(
  getCountriesIndicators,
  (countriesIndicators) => {
    return countriesIndicators.map(d => (
      {label: d.countryLabel, value: d.country})
    );
  }
);
export const getCountryIndicatorsForSelect = createSelector(
  getCountriesIndicators,
  getCountrySelected,
  (countriesIndicators, country) => {
    return countriesIndicators.filter(d => d.country === country)[0].indicators;
  }
);
