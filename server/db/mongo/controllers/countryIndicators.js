import CountryIndicatorInfo from '../models/countryIndicatorInfo';

export function listForCountry(req, res) {
  const { country } = req.params;
  if (!country) {
    res.status(500)
      .send('Error fetching the country indicators, country is required');
  } else {
    CountryIndicatorInfo.find({country}).exec((err, countryIndicators) => {
      if (err) {
        console.log('Error retrieving country indicators', err, req);
        return res.status(500)
          .send('Something went wrong fetching the country indicators');
      }
      return res.json(countryIndicators);
    });
  }
}

export default {
  listForCountry
};
