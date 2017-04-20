// native export example (works on WebKit)

export default function () {
    import('../test.js').then(function () {
        console.log('it worked');
    });
    console.log('dynamic import()');
};
