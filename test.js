var OTP = require('./genotp');
var assert = require('assert');

describe('OTP.generate', function () {
  let options = {
    algorithm: 'sha1', //sha1|sha256|sha512
    bias:      0,      // for TOTP and mOTP only, time bias, in seconds
    counter:   0,      // HOTP counter
    digits:    6,      // 6|8   (number of digits)
    period:    30,     // 30|60 (for TOTP only, in seconds)
    pin:       0,      // 0|1   (for mOTP only, 0: 4-digit, 1: alphanumeric)
    pincode:   '',     // for mOTP only
    secret:    '3132333435363738393031323334353637383930',
    seedtype:  'hex',  // hex|base32|bin (secret seed format)
    type:      'hotp', // totp|hotp|motp (otp type)
    values:    1,
  }
  
  const otp = new OTP();
  it ('Check the first value of the RFC4226 sample token', function () {
    assert.equal('755224', otp.generate({type: 'hotp'}));
    // assert.notEqual('000000', otp.generate());
  });

  it ('Check the first two values of the RFC4226 sample token', function () {
    assert.equal(JSON.stringify(['755224', '287082']), JSON.stringify(otp.generate(2)));
  });

  it ('Check the first three values of the RFC4226 sample token', function () {
    assert.equal(JSON.stringify(['755224', '287082', '359152']), JSON.stringify(otp.generate({type: 'hotp', values: 3})));
  });

});