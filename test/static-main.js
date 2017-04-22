import * as moduleC from './static-c-with-imports.js';

// not a module, just a main entry point
(async () => {

  const c = await (
    await moduleC   // import('./dynamic-c.js')
  ).default;

  console.log(c);
  // {name: "c", a: {name: "a"}, b: {name: "b"}}
})();
