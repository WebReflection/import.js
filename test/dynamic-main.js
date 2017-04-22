// not a module, just a main entry point
(async () => {

  const c = await (
    await import('./dynamic-c-with-imports.js')
  ).default;

  console.log(c);
  // {name: "c", a: {name: "a"}, b: {name: "b"}}
})();
