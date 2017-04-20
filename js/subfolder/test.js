'use strict';

exports.__esModule = true;

exports.default = function () {
    import('../test.js').then(function () {
        console.log('it worked');
    });
    console.log('dynamic import()');
};

; // native export example (works on WebKit)

 /********************************
 * this is test-native.js        *
 * transpiled directly via Babel *
 ********************************/
