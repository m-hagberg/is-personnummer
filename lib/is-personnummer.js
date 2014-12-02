/**
 * is-personnummer
 * https://github.com/frozzare/is-personnummer
 *
 * Copyright (c) 2014 Fredrik Forsmo
 * Licensed under the MIT license.
 */

'use strict';

/**
 * The Luhn algorithm.
 *
 * @param {string|number} str
 *
 * @return {number}
 */

function luhn (str) {
  var v   = 0,
      sum = 0;

  if (typeof str === 'number') {
    str += '';
  }

  for (var i = 0, l = str.length; i < l; i++) {
    v = str[i];
    v *= 2 - (i % 2);
    if (v > 9) {
      v -= 9;
    }
    sum += v;
  }

  return Math.ceil(sum / 10) * 10 - sum;
}


/**
 * Validate Swedish personal identity numbers.
 *
 * @param {string|number} str
 *
 * @return {boolean}
 */

module.exports = function (str) {
  if (typeof str !== 'number' && typeof str !== 'string') {
    return false;
  }

  str += '';

  var reg     = /^(\d{2}){0,1}(\d{2})(\d{2})(\d{2})([\-|\+]{0,1})?(\d{3})(\d{0,1})$/,
      match   = reg.exec(str),
      century = match[1],
      year    = match[2],
      month   = match[3],
      day     = match[4],
      sep     = match[5],
      num     = match[6],
      check   = match[7];

  if (sep === undefined) {
    sep = '-';
  }

  if (year.length === 4) {
    year = year.substr(2)
  }

  if (!check) {
    check = 0;
  }

  return luhn( year + month + day + num ) === +check && !!check;
}