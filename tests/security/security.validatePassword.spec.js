/**
 * This test tests the security helper class which contains functions useful for the security.
 */
process.env.NODE_ENV = 'test';

const Chai = require('chai');
const Assert = Chai.assert;
const _ = require('lodash');

const Security = require('../../src/security');

describe('lib/helpers/security/validatePassword', () => {

  it('validatePassword', () => {
    const result = Security.validatePassword('');
    Assert.isFalse(result, 'Empty string should return false');
  });

  it('validatePassword (null)', () => {
    const result = Security.validatePassword(null);
    Assert.isFalse(result, 'Null should return false');
  });

  it('validatePassword (undefined)', () => {
    const result = Security.validatePassword(undefined);
    Assert.isFalse(result, 'Undefined should return false');
  });

  it('validatePassword (simple)', () => {
    const result = Security.validatePassword('simple');
    Assert.isFalse(result, 'Simple password are not allowed');
  });

  it('validatePassword (strong)', () => {
    const result = Security.validatePassword('C0rr3ctP@sswd!');
    Assert.isTrue(result, 'Strong password should meet configured strength');
  });

  it('validatePassword (missing special)', () => {
    const result = Security.validatePassword('C0rr3ctPasswd');
    Assert.isFalse(result, 'Strong password missing a special char, should not pass the strength test');
  });

  it('validatePassword (missing number)', () => {
    const result = Security.validatePassword('CorrectP@sswd!');
    Assert.isFalse(result, 'Strong password missing a number, should not pass the strength test');
  });

  it('validatePassword (missing normal)', () => {
    const result = Security.validatePassword('03P@$$!$$!');
    Assert.isFalse(result, 'Strong password missing a normal lowercase char, should not pass the strength test');
  });

  it('validatePassword (missing capital)', () => {
    const result = Security.validatePassword('c0rr3ctp@sswd!');
    Assert.isFalse(result, 'Strong password missing a capital char, should not pass the strength test');
  });

  it('validatePassword (too short)', () => {
    const result = Security.validatePassword('Sm@ll1');
    Assert.isFalse(result, 'Strong password which the length is shorter than 8 chars, should not pass the strength test');
  });

  it('validatePassword (custom config)', () => {
    const config = {
      min: 2,
      max: 250,
      lowerCase: 1,
      upperCase: 0,
      numeric: 0,
      symbol: 0
    }

    const result = Security.validatePassword('aa', config);
    Assert.isTrue(result, 'Weak password with weak password config allowed');
  });

});