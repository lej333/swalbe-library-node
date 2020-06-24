/**
 * This test tests the security helper class which contains functions useful for the security.
 */
process.env.NODE_ENV = 'test';

const Chai = require('chai');
const Assert = Chai.assert;
const _ = require('lodash');

const ErrorTests = require('../errorTests');
const Security = require('../../src/security');
const Messages = require('../../src/messages');

describe('lib/helpers/security/createHash', () => {

  it('createHash', () => {
    const result = Security.createHash('good value', 'with secret');
    Assert.isNotEmpty(result, 'Should not be an empty string');
    Assert.typeOf(result, 'string', 'Expects a string type');
  });

  it('createHash (null)', () => {
    const result = Security.createHash(null, 'with secret');
    Assert.isEmpty(result, 'Should be an empty string');
  });

  it('createHash (empty)', () => {
    const result = Security.createHash('', 'with secret');
    Assert.isEmpty(result, 'Should be an empty string');
  });

  it('createHash (undefined)', () => {
    const result = Security.createHash(undefined, 'with secret');
    Assert.isEmpty(result, 'Should be an empty string');
  });

  it('createHash (object)', () => {
    const result = Security.createHash({object: 'to-be-stringified'}, 'with secret');
    Assert.isNotEmpty(result, 'Should not be an empty string');
    Assert.typeOf(result, 'string', 'Expects a string type');
  });

  it('createHash (array)', () => {
    const result = Security.createHash([{object: 'to-be-stringified'}], 'with secret');
    Assert.isNotEmpty(result, 'Should not be an empty string');
    Assert.typeOf(result, 'string', 'Expects a string type');
  });

  it('createHash (numeric)', () => {
    const result = Security.createHash(20, 'with secret');
    Assert.isNotEmpty(result, 'Should not be an empty string');
    Assert.typeOf(result, 'string', 'Expects a string type');
  });

  it('createHash (date)', () => {
    const result = Security.createHash(Date.now(), 'with secret');
    Assert.isNotEmpty(result, 'Should not be an empty string');
    Assert.typeOf(result, 'string', 'Expects a string type');
  });

  it('createHash (undefined crypto key)', () => {
    try {
      Security.createHash('value to be hashed');
      throw 'We expected an error!';
    } catch(err) {
      ErrorTests(err, Messages.invalidSecret);
    }
  });

  it('createHash (empty crypto key)', () => {
    try {
      Security.createHash('value to be hashed', '');
      throw 'We expected an error!';
    } catch(err) {
      ErrorTests(err, Messages.invalidSecret);
    }
  });

  it('createHash (null crypto key)', () => {
    try {
      Security.createHash('value to be hashed', null);
      throw 'We expected an error!';
    } catch(err) {
      ErrorTests(err, Messages.invalidSecret);
    }
  });

});