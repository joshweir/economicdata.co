import mongoose from 'mongoose';

// mongoose.set('debug', true);

const CountryIndicatorInfoSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  country: {type: String, required: true},
  countryDisplay: {type: String, required: true},
  indicator: {type: String, required: true},
  indicatorDisplay: {type: String, required: true},
  importance: {type: String, required: true},
  source: {type: String, required: true},
  description: {type: String, required: true}
}, { collection: 'countryIndicatorInfo'});

export default mongoose.model('CountryIndicatorInfo', CountryIndicatorInfoSchema);
