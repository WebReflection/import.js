// asynchronous module a.js

export default new Promise(async $export => {
  $export({name: 'a'});
});