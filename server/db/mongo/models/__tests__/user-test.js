import expect from 'expect';
import mongoose from 'mongoose';
import sinon from 'sinon';
import bcrypt from 'bcrypt-nodejs';
import _bind from 'lodash/bind';
import { UserSchema } from '../user';

let User;

describe('User model', () => {
  before(() => {
    User = mongoose.models.User ||
      require('../user').default();
  });

  it('returns the model instance', () => {
    expect(
      User
    ).toExist();
  });

  it('adds the model to mongoose.models', () => {
    expect(
      typeof mongoose.models.User
    ).toEqual('function');
  });

  it('defaults the profile fields to empty string', (done) => {
    const u = new mongoose.models.User();
    const { gender, location, name, picture, website } = u.profile;
    expect([gender, location, name, picture, website])
    .toEqual(['', '', '', '', '']);
    u.validate((error) => {
      expect(error).toNotExist();
      done();
    });
  });

  it('encrypts the password on create', (done) => {
    const thePassword = 'thePassword';
    const u = new mongoose.models.User({
      password: thePassword
    });
    u.validate((error) => {
      expect(error).toNotExist();
      expect(u.password).toNotEqual(thePassword);
      expect(u.password.length).toBeGreaterThan(0);
      done();
    });
  });

  describe('#encryptPassword', () => {
    let sandbox;

    afterEach(() => {
      sandbox.restore();
    });

    it('will return next with the salt error if bcrypt.genSalt ' +
       'returns error', () => {
      const thisUser = {
        email: 'email@example.com',
        isModified: () => true
      };
      const theError = 'an error!';
      sandbox = sinon.sandbox.create();
      sandbox.stub(bcrypt, 'genSalt')
      .callsFake((num, callback) => callback(theError, null));
      const boundMiddlewareFunc = _bind(
          UserSchema._middlewareFunctions.encryptPassword, thisUser);
      const nextSpy = sinon.spy();
      boundMiddlewareFunc(nextSpy);
      expect(nextSpy.withArgs(theError).calledOnce).toBeTruthy();
    });

    it('will return next with the hash error if bcrypt.hash returns ' +
       'error', () => {

    });
  });

  describe('#comparePassword', () => {
    it('will return falsey error and truthy isMatch if the input password ' +
       'matches user password', () => {

    });

    it('will return the error and falsey isMatch if bcrypt.compare returns ' +
       'an error', () => {

    });
  });

  /*
  user.comparePassword(password, (passErr, isMatch) => {
    if (isMatch) {
      return done(null, user);
    }
    return done(null, false, { message: 'Your email or password combination is not correct.' });
  })
   */
});
