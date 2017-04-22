// asynchronous module c.js

// same pattern in export
export default new Promise(async $export => {

  // multiple asynchronous imports
  const [a, b] = await Promise.all(
    [
      import('./a.js'),
      import('./b.js')
    ].map(
      async m => (await m).default
    )
  );

  $export({name: 'c', a, b});

});