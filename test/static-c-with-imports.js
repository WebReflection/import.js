// asynchronous module c.js

import imports from './imports.js';

// soon not needed anymore
import * as moduleA from './a.js';
import * as moduleB from './b.js';

// same pattern in export
export default new Promise(async $export => {

  // multiple asynchronous imports
  const [a, b] = await imports(
    moduleA,  // import('./a.js')
    moduleB   // import('./b.js')
  );

  $export({name: 'c', a, b});

});