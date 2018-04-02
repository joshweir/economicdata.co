import CountryIndicatorInfo from '../models/countryIndicatorInfo';

const countryIndicatorInfoQuery = () => {
  return CountryIndicatorInfo
  .find({})
  .select('country countryDisplay indicator indicatorDisplay');
};

const consolidateOutput = (data) => {
  return data.reduce((output, item) => {
    let index = -1;
    for (let i = 0; i < output.length; i += 1) {
      if (output[i].country === item.country) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      const indicators = [
        ...output[index].indicators,
        {
          value: item.indicator,
          label: item.indicatorDisplay
        }
      ];
      /* eslint-disable no-param-reassign */
      output[index] = { ...output[index], indicators };
      /* eslint-enable no-param-reassign */
    } else {
      output.push({
        country: item.country,
        countryLabel: item.countryDisplay,
        indicators: [
          {value: item.indicator, label: item.indicatorDisplay}
        ]
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
    {value: 'gdp', label: 'GDP'},
    {value: 'cpi', label: 'CPI'}
  ]
},
 */
export function getMasterData(req, res) {
  countryIndicatorInfoQuery().then((data) => {
    return res.json(consolidateOutput(data));
  }).catch((err) => {
    console.log('Error retrieving master data', err);
    return res.status(500)
    .send('Something went wrong fetching master data');
  });
}

export default {
  getMasterData
};
