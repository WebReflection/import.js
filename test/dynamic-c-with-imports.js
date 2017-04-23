// asynchronous module c.js

import imports from './imports.js';

// same pattern in export
export default new Promise(async $export => {

  // multiple asynchronous imports
  const [a, b] = await imports(
    import('./a.js'),
    import('./b.js')
  );

  $export({name: 'c', a, b});

});