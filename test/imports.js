// synchronous module helper

export default (...modules) => Promise.all(
  // simply flatten arguments
  modules.concat.apply([], modules)
  // and await each default
  .map(async m => (await m).default)
);
