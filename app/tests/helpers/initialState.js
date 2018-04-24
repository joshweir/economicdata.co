export default {
  countryIndicator: {
    indicatorInfo: {
      country: 'united-states',
      countryDisplay: 'United States',
      description: 'the description',
      importance: 'medium',
      indicator: 'new-home-sales-mom',
      indicatorDisplay: 'New Home Sales MoM',
      source: '<a href="http://example.com">Another Source</a>'
    },
    indicatorData: [
      {
        actual: '12,250,000',
        forecast: '13,250,000',
        previous: '11,250,000',
        releaseDate: 'Jan 22, 2005'
      },
      {
        actual: '12,250,001',
        forecast: '13,250,001',
        previous: '11,250,001',
        releaseDate: 'Jan 23, 2005'
      }
    ]
  },
  masterData: {
    countriesIndicators: [
      {
        country: 'united-states',
        countryLabel: 'United States',
        indicators: [
          {
            label: 'GDP',
            value: 'gdp'
          },
          {
            label: 'New Home Sales MoM',
            value: 'new-home-sales-mom'
          }
        ]
      },
      {
        country: 'australia',
        countryLabel: 'Australia',
        indicators: [
          {
            label: 'GDP Aus',
            value: 'gdp-aus'
          },
          {
            label: 'New Home Sales MoM Aus',
            value: 'new-home-sales-mom-aus'
          }
        ]
      }
    ],
    countrySelected: 'united-states',
    countrySelectedIndicators: [
      {
        label: 'GDP',
        value: 'gdp'
      },
      {
        label: 'New Home Sales MoM',
        value: 'new-home-sales-mom'
      }
    ],
    countryIndicatorSelected: 'gdp'
  },
  isFetching: false,
  message: {
    message: '',
    type: 'SUCCESS'
  },
  user: {
    authenticated: false,
    isWaiting: false,
    message: '',
    isLogin: true
  }
};
