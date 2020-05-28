/*
* Central util helper class.
* Contains helper functions to help us with some string manipulations, validations or something in that way.
* */
const _ = require('lodash');
const Moment = require('moment');

/*
* Smart centralized toString function for multiple different types.
* */
const inputToString = (input) => {
  if (_.isFunction(input)) {
    return '';
  } else if (_.isDate(input)) {
    return Moment(input).format();
  } else if (!_.isObject(input) && !_.isArray(input)) {
    return _.toString(input);
  }
  return JSON.stringify(input);
}

module.exports = {
  inputToString
};