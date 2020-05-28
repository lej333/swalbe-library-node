/*
* This is a security helper class with functions to help us with security tasks or validations.
* */
const Crypto = require('crypto');
const Jwt = require('jsonwebtoken');
const _ = require('lodash');
const passwordComplexity = require('joi-password-complexity');
const Boom = require('@hapi/boom');

const Util = require('./util');
const Messages = require('./messages');

/*
* Generates a hash based on SHA256 encryption and secret crypto key.
* */
const createHash = (input, cryptoKey) => {
  if (!cryptoKey) {
    throw Boom.badData(Messages.invalidSecret);
  }
  input = Util.inputToString(input);
  return Crypto.createHmac('sha256', cryptoKey).update(input).digest('hex');
}

/*
* Generates a JWT authorization token based on an object input and secret auth key.
* The token is valid for one day (by default), can be changed in the config file.
* */
const createToken = (object, authKey, expiration = '1d') => {
  if (!object || !_.isObject(object) || _.isArray(object)) {
    throw Boom.badData(Messages.invalidObject);
  }
  if (!authKey) {
    throw Boom.badData(Messages.invalidSecret);
  }
  return Jwt.sign(object, authKey, {
    expiresIn: expiration
  });
}

/*
* Decodes a JWT authorization token based on secret auth key.
* */
const decodeToken = async (token, authKey) => {
  if (!token) {
    throw Boom.badData(Messages.invalidToken);
  }
  if (!authKey) {
    throw Boom.badData(Messages.invalidSecret);
  }
  return Jwt.verify(token, authKey, {}, (err, decoded) => {
    if (err) {
      return {};
    }
    return decoded;
  });
}

/*
* Validates based on configured password complexity.
* This is used to be sure the created or modified users will use strong passwords.
* The password policy config can be overridden, the default config is based on password policy of Dutch government.
* */
const validatePassword = (password, config) => {
  if (!password) {
    return false;
  }

  if (!config) {
    config = {
      min: 8,
      max: 250,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1
    }
  }

  const result = passwordComplexity(config).validate(password);
  return (!result.error);
}

module.exports = {
  createHash,
  createToken,
  decodeToken,
  validatePassword
}