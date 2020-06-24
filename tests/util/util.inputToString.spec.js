/**
 * This test tests the util helper class which contains useful functions to centralizing codes and prevent code mess.
 * Tests the following functions:
 * - createHash which generates a hash based on an input
 */
process.env.NODE_ENV = 'test';

const Util = require('../../src/util');
const Chai = require('chai');
const Assert = Chai.assert;
const Moment = require('moment');

describe('lib/helpers/util/inputToString', () => {

  it('inputToString (empty string)', () => {
    const result = Util.inputToString('');
    Assert.equal(result, '', 'Empty string should return as an empty string');
  });

  it('inputToString (undefined)', () => {
    const result = Util.inputToString(undefined);
    Assert.equal(result, '', 'Undefined param should return as an empty string');
  });

  it('inputToString (null)', () => {
    const result = Util.inputToString(null);
    Assert.equal(result, '', 'Null should return as an empty string');
  });

  it('inputToString (valid empty object)', () => {
    const result = Util.inputToString({});
    Assert.equal(result, '{}', 'Empty object should return as {} string');
  });

  it('inputToString (valid empty array)', () => {
    const result = Util.inputToString([]);
    Assert.equal(result, '[]', 'Empty array object should return as [] string');
  });

  it('inputToString (filled object)', () => {
    const result = Util.inputToString({
      filled: 'object'
    });
    Assert.equal(result, '{"filled":"object"}', 'Filled object should return correct json string');
  });

  it('inputToString (filled array)', () => {
    const result = Util.inputToString([{
      filled: 'object'
    }]);
    Assert.equal(result, '[{"filled":"object"}]', 'Filled array object should return correct json string');
  });

  it('inputToString (function)', () => {
    const func = () => {
      return 'this-is-a-function';
    }
    const result = Util.inputToString(func);
    Assert.equal(result, '', 'Functions can\'t be stringified');
  });

  it('inputToString (date)', () => {
    const date = new Date();
    const expected = Moment(date).format();
    const result = Util.inputToString(date);
    Assert.equal(result, expected, 'Expects formatted string by MomentJS library');
  });

  it('inputToString (boolean)', () => {
    const result = Util.inputToString(true);
    Assert.equal(result, 'true', 'Expects stringified boolean value');
    Assert.typeOf(result, 'string', 'Expects correct type');
  });

});