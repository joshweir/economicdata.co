import mongoose from 'mongoose';

const CountryIndicatorDataSchema = new mongoose.Schema({
  countryIndicatorInfoId: {type: String, required: true},
  releaseDate: {type: Date, required: true},
  actual: {type: String, required: true},
  previous: String,
  forecast: String
}, { collection: 'countryIndicatorData' });

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the collection in the MongoDB database
export default mongoose.model('CountryIndicatorData', CountryIndicatorDataSchema);
