exports.default = function () {
    console.log('dynamic import()');
    import('../test.js').then(function () {
        console.log('it worked');
    });
};