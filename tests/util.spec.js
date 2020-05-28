/**
 * This test tests the util helper class which contains useful functions to centralizing codes and prevent code mess.
 * Tests the following functions:
 * - createHash which generates a hash based on an input
 */
process.env.NODE_ENV = 'test';

const Util = require('../src/util');
const Chai = require('chai');
const Assert = Chai.assert;

describe('lib/helpers/util', () => {

  it('stringifyObject', () => {
    assert.equal(Util.stringifyObject(''), '', 'Empty string should return as an empty string');
    assert.equal(Util.stringifyObject(null), '', 'Null input should return as an empty string');
    assert.equal(Util.stringifyObject(undefined), '', 'Undefined input should return as an empty string');
    assert.equal(Util.stringifyObject(), '', 'Calling function without input should return as an empty string');
    assert.equal(Util.stringifyObject([{array: 'stringified array'}]), '[{"array":"stringified array"}]', 'Calling fuction with an array should return a stringified array');
    assert.equal(Util.stringifyObject({object: 'stringified object'}), '{"object":"stringified object"}', 'Calling fuction with an object should return a stringified object');
    return true;
  });

});