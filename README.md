# import.js
A dynamic [import()](https://tc39.github.io/proposal-dynamic-import/) polyfill.

### Features

  - [x] compatible with **native ES2015** modules
  - [x] compatible with native `import ... from ...`
  - [x] compatible with common native `export ...` expressions
  - [x] compatible with **Babel transpiled** ES2015 modules
  - [x] compatible with **relative paths**
  - [x] compatible with **absolute paths**

### Usage

```html
<!doctype html>
<!-- literally anything you need before -->
<script
    async
    src="import.js"
    data-main="js/main.js"
></script>
```

  * the `src` should point to `import.js` or its `min.js` version
  * the `data-main` should point to your module entry point
  * feel free to use or not `deferred` or `async` to delay execution
  * all modules will be loaded through `XHR` to avoid the need of a `fetch` polyfill
  * however, you can add any polyfill you need upfront

Use `https://unpkg.com/import.js@latest` as source if you'd like to use a CDN service.

[Live test](https://webreflection.github.io/import.js/) based on [this folder](https://github.com/WebReflection/import.js/tree/master/js).

You can test [native ES2015 module export](https://webreflection.github.io/import.js/?native) too. It requires a compatible browser (today any modern WebKit would do).
