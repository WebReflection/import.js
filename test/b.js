// asynchronous module b.js

export default new Promise(async $export => {
  $export({name: 'b'});
});