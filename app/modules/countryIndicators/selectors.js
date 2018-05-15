import { MONTH_NAMES } from '../masterData/actions';

export const getIndicatorInfo = state => state.countryIndicator.indicatorInfo;
export const getCountry = state => state.countryIndicator.indicatorInfo.country;
export const getCountryIndicator = state => state.countryIndicator.indicatorInfo.indicator;
export const getIndicatorData = state => state.countryIndicator.indicatorData;
export const getCountryDisplay =
({ countryIndicator: {
    indicatorInfo: {
      countryDisplay
    }
  } }) => countryDisplay;
export const getCountryIndicatorDisplay =
({ countryIndicator: { indicatorInfo } }) => (
  indicatorInfo && indicatorInfo.indicatorDisplay
);
export const getMoreToLoad = state => state.countryIndicator.moreToLoad;
export const getReleaseDateBefore = ({ countryIndicator: { indicatorData } }) => {
  let releaseDateBefore = null;
  if (indicatorData && indicatorData.length > 0) {
    const [last] = indicatorData.slice(-1);
    releaseDateBefore = last.releaseDate;
  }
  return releaseDateBefore;
};

/*
converts date string from format:
Mon DD, YYYY
to
YYYY-MM-DD
 */
const convertToXmlFormat = (dateString) => {
  const [monthAndDay, year] = dateString.split(',').map(d => d.trim());
  const [monthAbbrev, day] = monthAndDay.split(' ');
  const month = MONTH_NAMES.indexOf(monthAbbrev) + 1;
  return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
};
export const getReleaseDateBeforeXmlFormat = (state) => {
  let releaseDateBeforeXmlFormat = null;
  const releaseDateBefore = getReleaseDateBefore(state);
  if (releaseDateBefore) {
    releaseDateBeforeXmlFormat = convertToXmlFormat(releaseDateBefore);
  }
  return releaseDateBeforeXmlFormat;
};
