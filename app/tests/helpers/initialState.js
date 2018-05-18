export default {
  country: {
    country: 'united-states',
    countryLabel: 'United States',
    indicators: [
      {
        label: 'GDP',
        value: 'gdp',
        lastReleaseDate: 'Jan 23, 2005',
        lastActual: '0.8%',
        lastPrevious: '0.7%'
      },
      {
        label: 'New Home Sales MoM',
        value: 'new-home-sales-mom',
        lastReleaseDate: 'Jan 24, 2005',
        lastActual: '1,000',
        lastPrevious: '2,000'
      }
    ]
  },
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
        releaseDate: 'Jan 23, 2005',
        time: '10:00'
      },
      {
        actual: '12,250,001',
        forecast: '13,250,001',
        previous: '11,250,001',
        releaseDate: 'Jan 22, 2005'
      }
    ],
    moreToLoad: true
  },
  masterData: {
    countriesIndicators: [
      {
        country: 'united-states',
        countryLabel: 'United States',
        indicators: [
          {
            label: 'GDP',
            value: 'gdp',
            lastReleaseDate: 'Jan 23, 2005',
            lastActual: '0.8%',
            lastPrevious: '0.7%'
          },
          {
            label: 'New Home Sales MoM',
            value: 'new-home-sales-mom',
            lastReleaseDate: 'Jan 24, 2005',
            lastActual: '1,000',
            lastPrevious: '2,000'
          }
        ]
      },
      {
        country: 'australia',
        countryLabel: 'Australia',
        indicators: [
          {
            label: 'GDP Aus',
            value: 'gdp-aus',
            lastReleaseDate: 'Jan 23, 2006',
            lastActual: '1.8%',
            lastPrevious: '1.7%'
          },
          {
            label: 'New Home Sales MoM Aus',
            value: 'new-home-sales-mom-aus',
            lastReleaseDate: 'Jan 24, 2006',
            lastActual: '1,100',
            lastPrevious: '2,100'
          }
        ]
      }
    ],
    countrySelected: 'united-states',
    countrySelectedIndicators: [
      {
        label: 'GDP',
        value: 'gdp',
        lastReleaseDate: 'Jan 23, 2005',
        lastActual: '0.8%',
        lastPrevious: '0.7%'
      },
      {
        label: 'New Home Sales MoM',
        value: 'new-home-sales-mom',
        lastReleaseDate: 'Jan 24, 2005',
        lastActual: '1,000',
        lastPrevious: '2,000'
      }
    ],
    countryIndicatorSelected: 'new-home-sales-mom'
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

export const emptyState = {
  country: {},
  countryIndicator: {
    indicatorInfo: {},
    indicatorData: [],
    moreToLoad: true
  },
  masterData: {
    countriesIndicators: [],
    countries: [],
    countrySelected: null,
    countrySelectedIndicators: [],
    countryIndicatorSelected: null
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
