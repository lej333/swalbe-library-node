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

describe('lib/helpers/security', () => {

  it('createToken and decodeToken', async () => {
    assert.equal(Security.createToken(''), '', 'Empty input should return an empty string');
    assert.equal(Security.createToken(null), '', 'Null input should return an empty string');
    assert.equal(Security.createToken(undefined), '', 'Undefined input should return an empty string');
    assert.equal(Security.createToken(), '', 'Without input should return an empty string');
    assert.equal(_.isEmpty(Security.createToken('string to be tokenized')), true, 'Other types than object should not generate a token');
    assert.equal(_.isEmpty(Security.createToken(20)), true, 'Other types than object should not generate a token');
    assert.equal(_.isEmpty(Security.createToken([{object: 'in an array'}])), true, 'Other types than object should not generate a token');
    assert.equal(_.isEmpty(Security.createToken({object: 'to be tokenized'})), false, 'Object input should generate a token');

    const object = {
      object: 'to be tokenized'
    }
    const token = Security.createToken(object);
    const decoded = await Security.decodeToken(token);
    assert.equal(decoded.hasOwnProperty('object'), true, 'Decoded object should contains same property as before tokenize it');
    assert.equal(object.object, decoded.object, 'Decoding token should return same object as before tokenize it');

    const bad = await Security.decodeToken('not-a-valid-token')
    assert.equal(_.isEmpty(bad) && _.isObject(bad), true, 'Invalid token should result in an empty object');
    return true;
  });


});