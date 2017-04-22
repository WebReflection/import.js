// asynchronous module c.js

// soon not needed anymore
import * as moduleA from './a.js';
import * as moduleB from './b.js';

// same pattern in export
export default new Promise(async $export => {

  // multiple asynchronous imports
  const [a, b] = await Promise.all(
    [
      moduleA,  // import('./a.js')
      moduleB   // import('./b.js')
    ].map(
      async m => (await m).default
    )
  );

  $export({name: 'c', a, b});

});