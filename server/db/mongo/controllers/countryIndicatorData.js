import { Parser as Json2csvParser} from 'json2csv';
import CountryIndicatorInfo from '../models/countryIndicatorInfo';
import CountryIndicatorData from '../models/countryIndicatorData';
import { formatReleaseDate,
  formatReleaseTime } from '../../../../app/utils/dateFormatting';

let country;
let indicator;
let releaseDateBefore;
let perPage;
let _id;

const validateRequiredRequestParams = () => {
  if (!country) {
    return 'country';
  }
  if (!indicator) {
    return 'indicator';
  }
  return null;
};

const indicatorDataQuery = () => {
  const query = {
    countryIndicatorInfoId: _id
  };
  if (releaseDateBefore) {
    query.releaseDate = {
      $lt: releaseDateBefore
    };
  }
  return query;
};

const countryIndicatorDataQuery = () => {
  return CountryIndicatorData
    .find(indicatorDataQuery({_id, releaseDateBefore}))
    .sort({releaseDate: -1})
    .select('releaseDate actual forecast previous')
    .limit(parseInt(perPage, 10));
};

const countryIndicatorInfoQuery = () => {
  return CountryIndicatorInfo.findOne({_id});
};

const countryIndicatorsQuery = () => {
  return CountryIndicatorInfo
  .find({country})
  .select('indicator indicatorDisplay');
};

const transformIndicatorData = (indicatorData) => {
  return indicatorData.map((d) => {
    const { actual, forecast, previous, releaseDate } = d;
    const obj = {
      actual,
      forecast,
      previous,
      releaseDate: formatReleaseDate(releaseDate)
    };
    const time = formatReleaseTime(releaseDate);
    if (time) obj.time = time;
    return obj;
  });
};

const transformIndicatorsForSelect = (indicators) => {
  return indicators.map((i) => {
    return {value: i.indicator, label: i.indicatorDisplay};
  });
};

const buildOutput = ({indicatorInfo, indicatorData, indicators}) => {
  return {
    indicatorInfo,
    indicatorData: transformIndicatorData(indicatorData),
    countrySelected: country,
    countryIndicatorSelected: indicator,
    countrySelectedIndicators: transformIndicatorsForSelect(indicators),
    moreToLoad: indicatorData.length >= perPage
  };
};

export function listCountryIndicatorData(req, res) {
  ({ country, indicator, releaseDateBefore, perPage = 50 } = req.query);
  _id = `${country}|${indicator}`;
  const missingParam = validateRequiredRequestParams();
  if (missingParam) {
    res.status(500)
      .send(`Error fetching country indicator data, ${missingParam} is required`);
  } else {
    Promise.all([
      countryIndicatorInfoQuery(),
      countryIndicatorDataQuery(),
      countryIndicatorsQuery()
    ]).then(([indicatorInfo, indicatorData, indicators]) => {
      return res.json(buildOutput({
        indicatorInfo, indicatorData, indicators}));
    }).catch((err) => {
      console.log('Error retrieving country indicator data', err, country,
        indicator);
      return res.status(500)
      .send('Something went wrong fetching the country indicator data');
    });
  }
}

export function download(req, res) {
  ({ country, indicator, releaseDateBefore, perPage = 99999 } = req.query);
  _id = `${country}|${indicator}`;
  countryIndicatorDataQuery()
  .then((data) => {
    const fields = [
      {
        label: 'Release Date',
        value: 'releaseDate'
      },
      {
        label: 'Time',
        value: 'time'
      },
      {
        label: 'Actual',
        value: 'actual'
      },
      {
        label: 'Forecast',
        value: 'forecast'
      },
      {
        label: 'Previous',
        value: 'previous'
      }
    ];
    const parser = new Json2csvParser({ fields });
    const csv = parser.parse(transformIndicatorData(data), { fields });
    res.setHeader('Content-disposition',
      `attachment; filename=${country}.${indicator}.csv`);
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
  });
}

export default {
  listCountryIndicatorData,
  download
};
