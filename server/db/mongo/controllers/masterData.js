import CountryIndicatorData from '../models/countryIndicatorData';
import CountryIndicatorInfo from '../models/countryIndicatorInfo';
import { formatReleaseDate } from '../../../../app/utils/dateFormatting';

const countryIndicatorInfoQuery = () => {
  return CountryIndicatorInfo
  .find({})
  .select('country countryDisplay indicator indicatorDisplay');
};

const latestReleasesQuery = () => {
  return CountryIndicatorData
  .find({isLatest: true})
  .select('countryIndicatorInfoId releaseDate actual previous');
};

const indexOfCountryInOutputArray = ({output, item}) => {
  let index = -1;
  for (let i = 0; i < output.length; i += 1) {
    if (output[i].country === item.country) {
      index = i;
      break;
    }
  }
  return index;
};

const countryAlreadyAddedToOutput = index => index >= 0;

const consolidateOutput = ({indicatorInfo, latestReleases}) => {
  return indicatorInfo.reduce((output, item) => {
    const { indicator, indicatorDisplay, country, countryDisplay } = item;
    const { releaseDate, actual, previous } =
    latestReleases.filter(d => (
      d.countryIndicatorInfoId === `${country}|${indicator}`
    ))[0];
    const newIndicator = {
      value: indicator,
      label: indicatorDisplay,
      lastReleaseDate: formatReleaseDate(releaseDate),
      lastActual: actual,
      lastPrevious: previous
    };
    const index = indexOfCountryInOutputArray({output, item});
    if (countryAlreadyAddedToOutput(index)) {
      const indicators = [...output[index].indicators, newIndicator];
      /* eslint-disable no-param-reassign */
      output[index] = { ...output[index], indicators };
      /* eslint-enable no-param-reassign */
    } else {
      output.push({
        country,
        countryLabel: countryDisplay,
        indicators: [newIndicator]
      });
    }
    return output;
  }, []);
};

/*
{
  country: 'united-states',
  countryLabel: 'United States',
  indicators: [
    {
      value: 'gdp',
      label: 'GDP',
      lastReleaseDate: 'Jan 22, 2005',
      lastActual: '0.8%',
      lastPrevious: '0.7%'
    },
    {
      value: 'cpi',
      label: 'CPI',
      lastReleaseDate: 'Jan 22, 2005',
      lastActual: '0.8%',
      lastPrevious: '0.7%'
    }
  ]
},
 */
export function getMasterData(req, res) {
  Promise.all([
    countryIndicatorInfoQuery(),
    latestReleasesQuery()
  ])
  .then(([indicatorInfo, latestReleases]) => {
    return res.json(consolidateOutput({indicatorInfo, latestReleases}));
  }).catch((err) => {
    console.log('Error retrieving master data', err);
    return res.status(500)
    .send('Something went wrong fetching master data');
  });
}

export default {
  getMasterData
};
