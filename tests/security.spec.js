/**
 * This test tests the security helper class which contains functions useful for the security.
 * Tests the following security functions:
 * - createHash which generates a hash based on an input
 * - createToken which generates a token based on an object input
 * - validatePassword which validates the strength of the passwords
 */
process.env.NODE_ENV = 'test';

const Security = require('../src/security');
const Chai = require('chai');
const Assert = Chai.assert;
const _ = require('lodash');

describe('lib/helpers/security', () => {

  it('createHash', () => {
    const empty = Security.createHash('');

    assert.equal(_.isEmpty(empty), false, 'Empty string should generate a hash');
    assert.equal(Security.createHash(null), empty, 'Null input should return same hash as an empty string');
    assert.equal(Security.createHash(undefined), empty, 'Undefined input should return same hash as an empty string');
    assert.equal(Security.createHash(), empty, 'Calling function without input should return same hash as an empty string');
    assert.equal(_.isEmpty(Security.createHash({object: 'to be hashed'})), false, 'Calling function with an object should return a hash by stringify the object');
    assert.equal(_.isEmpty(Security.createHash([{object: 'to be hashed'}])), false, 'Calling function with an array should return a hash by stringify the array');
    assert.equal(_.isEmpty(Security.createHash('String to be hashed')), false, 'Calling function with a valid string should return a hash');
    assert.equal(_.isEmpty(Security.createHash(20)), false, 'Calling function with a numeric value should return a hash');
    assert.equal(_.isEmpty(Security.createHash(Date.now())), false, 'Calling function with a date value should return a hash');
    return true;
  });

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

  it('validatePassword', () => {
    const config = {
      min: 8,
      max: 250,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1
    }

    assert.equal(Security.validatePassword(''), false, 'Empty input should return false');
    assert.equal(Security.validatePassword(null), false, 'Null input should return false');
    assert.equal(Security.validatePassword(undefined), '', 'Undefined input should return false');
    assert.equal(Security.validatePassword(), false, 'Without input should return false');
    assert.equal(Security.validatePassword('simple', config), false, 'Simple password are not allowed');
    assert.equal(Security.validatePassword('C0rr3ctP@sswd!', config), true, 'Strong password should meet configured strength');
    assert.equal(Security.validatePassword('C0rr3ctPasswd', config), false, 'Strong password missing a special char, should not pass the strength test');
    assert.equal(Security.validatePassword('CorrectPasswd!', config), false, 'Strong password missing a number, should not pass the strength test');
    assert.equal(Security.validatePassword('c0rr3ctp@sswd', config), false, 'Strong password missing a capital char, should not pass the strength test');
    assert.equal(Security.validatePassword('03P@$$!$$!', config), false, 'Strong password missing a normal lowercase char, should not pass the strength test');
    assert.equal(Security.validatePassword('Sm@ll1', config), false, 'Strong password which the length is shorter than 8 chars, should not pass the strength test');
    return true;
  });

});