export const getIndicatorInfo = state => state.countryIndicator.indicatorInfo;
export const getIndicatorData = state => state.countryIndicator.indicatorData;
export const getCountryDisplay = (state) => {
  const indicatorInfo = state.countryIndicator.indicatorInfo;
  return indicatorInfo && indicatorInfo.countryDisplay;
};
export const getCountryIndicatorDisplay = (state) => {
  const indicatorInfo = state.countryIndicator.indicatorInfo;
  return indicatorInfo && indicatorInfo.indicatorDisplay;
};
