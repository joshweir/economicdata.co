/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const countryIndicatorsController = controllers && controllers.countryIndicators;
const countryIndicatorDataController = controllers && controllers.countryIndicatorData;
const masterDataController = controllers && controllers.masterData;

export default (app) => {
  // user routes
  if (usersController) {
    app.post('/sessions', usersController.login);
    app.post('/users', usersController.signUp);
    app.delete('/sessions', usersController.logout);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
      })
    );
  }

  if (countryIndicatorsController) {
    app.get('/country-indicators', countryIndicatorsController.listForCountry);
  } else {
    console.warn(unsupportedMessage('countryIndicators routes'));
  }

  if (countryIndicatorDataController) {
    app.get('/country-indicator-data',
      countryIndicatorDataController.listCountryIndicatorData);
  } else {
    console.warn(unsupportedMessage('countryIndicatorData routes'));
  }

  if (masterDataController) {
    app.get('/master-data',
      masterDataController.getMasterData);
  } else {
    console.warn(unsupportedMessage('masterData routes'));
  }
};
