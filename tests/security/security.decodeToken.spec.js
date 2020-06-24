/**
 * This test tests the security helper class which contains functions useful for the security.
 * Tests the following security functions:
 * - createHash which generates a hash based on an input
 * - createToken which generates a token based on an object input
 * - validatePassword which validates the strength of the passwords
 */
process.env.NODE_ENV = 'test';

const Security = require('../../src/security');
const Chai = require('chai');
const Assert = Chai.assert;
const _ = require('lodash');

describe('lib/helpers/security/decodeToken', () => {

  it('decodeToken', async () => {
    const object = {
      object: 'to be tokenized'
    }
    const token = Security.createToken(object, 'secret');
    const decoded = await Security.decodeToken(token, 'secret');
    Assert.equal(decoded.hasOwnProperty('object'), true, 'Decoded object should contains same property as before tokenize it');
    Assert.equal(object.object, decoded.object, 'Decoding token should return same object as before tokenize it');

    const bad = await Security.decodeToken('not-a-valid-token', 'secret')
    Assert.equal(_.isEmpty(bad) && _.isObject(bad), true, 'Invalid token should result in an empty object');
    return true;
  });


});