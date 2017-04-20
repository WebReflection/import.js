var nativeTest = location.search.indexOf('native') < 0 ? '' : '-native';
var fileName = './subfolder/test' + nativeTest + '.js';

import(fileName).then(module => {
    module.default();
});

console.log('Loading ' + fileName);
