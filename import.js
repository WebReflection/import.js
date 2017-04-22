/*!
 * Copyright 2017 Andrea Giammarchi - @WebReflection
 *
 * Permission to use, copy, modify, and/or distribute this software for any purpose
 * with or without fee is hereby granted, provided that the above copyright notice
 * and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS.
 * IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT,
 * OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE,
 * DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION,
 * ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
(function dynamic(info, script) {
  var
    __import__ = self.__import__ || (self.__import__ = info),
    str = [],
    re = /([`"'])(?:(?=(\\?))\2.)*?\1/g,
    place = function ($0, $1) { str.push($0); return $1 + '$' + $1; },
    vert = function () { return str.shift(); },
    getMain = function (main) { return main.charAt(0) === '/' ? main : (
      pathname.slice(0, pathname.lastIndexOf('/') + 1) +
      main.replace(/^[a-zA-Z_-]/, './$&')
    )},
    normalize = function (url) {
      // apparently remote URLs needs mandatory protocol
      if (/^(?:[a-z]+:)\/\//.test(url)) return url;
      // apparently the path is required by specs or ...
      // TypeError: Module specifier does not start with "/", "./", or "../".
      // if (/^[a-zA-Z_-]/.test(url)) url = './' + url;
      for (var
        path = fileName.slice(0, fileName.lastIndexOf('/')),
        length = url.length,
        c, i = 0, p = 0; i < length; p = i + 1
      ) {
        i = url.indexOf('/', p);
        if (i < 0) {
          i = length;
          path += '/' + url.slice(p);
          // apparently not part of the specification
          // if (!/\.js$/i.test(path)) path += '.js';
        } else if (i === 0) {
          path = '';
        } else {
          c = p; p = i;
          while (p && url.charAt(p - 1) === '.') --p;
          switch (i - p) {
            case 0: path += '/' + url.slice(c, i); break;
            case 1: break;
            case 2: path = path.slice(0, path.lastIndexOf('/')); break;
          }
        }
      }
      return path.replace(/\/\.\//g, '/');
    },
    load = function (path) {
      return __import__.m[path] || (__import__.m[path] = new Promise(
        function (resolve, reject) {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', path);
          xhr.onerror = reject;
          xhr.onload = function () {
            var
              textContent = xhr.responseText.replace(re, place),
              nativeModule = /^(?:export|import)\s/m.test(textContent),
              importer = '__import__',
              resolver = importer + 'r' + info.i++,
              i = 0,
              exported,
              name
            ;
            textContent = textContent
              .replace(/(^|[^._a-zA-Z0-9$])import\(/g, '$1' + importer + '(')
              .replace(re, vert);
            self[resolver] = function (m) {
              delete self[resolver];
              resolve(m);
            };
            path = JSON.stringify(path);
            if (nativeModule) {
              exported = [];
              exec(create('module'), 'const ' +
              importer + '=' + dynamic + '(self.' + importer + ',' + path + ');' +
              'let ' + importer + 'default;\n' +
                textContent.replace(
                  /^export\s+(default\s+)?([^=({;]+)/gm,
                  function ($0, $1, $2) {
                    name = $2.replace(/^[a-z]+\s(\S+)[\s\S]*$/, '$1') || $2;
                    if ($1) {
                      if (/^(?:class|function)\s*$/.test(name)) {
                        name = importer + (i++);
                        $0 = $0.replace($2, $2 + ' ' + name);
                      } else if (/^new\s/.test($2)) {
                        name = importer + 'default';
                        $0 = $0.replace($2, name + '=' + $2);
                      }
                      exported.push('default:' + name);
                    }
                    else exported.push(name);
                    return $0;
                  }
                ).replace(
                  /export\s+\{([^}]+?)\}/g,
                  function ($0, $1) {
                    exported.push($1.replace(/(\S+)\s+as\s+(\S+)/g, '$2:$1'));
                    return $0;
                  }
                ) +
                ';\n' + resolver + '({' + exported.join(',') + '})');
            } else {
              // irony wants that's way easier to implement `import`
              // on transpiled ES5 engines
              exec(create(''), resolver + '(function(exports,' +
              importer + '){"use strict";' +
              'return function(){' + textContent +
              ';\n}(),exports}({},' + dynamic + '(' + importer + ',' + path + ')))');
            }
          };
          xhr.send(null);
        }
      ));
    },
    create = function (type) {
      script = document.createElement('script');
      if (type) script.type = type;
      return script;
    },
    exec = function (script, textContent) {
      if (__import__.n) script.setAttribute('nonce', __import__.n);
      script.textContent = textContent;
      setTimeout(function () { html.removeChild(script); }, 1);
      html.appendChild(script);
    },
    pathname = location.pathname,
    fileName = typeof script === 'string' ?
                script : getMain(script.getAttribute('data-main')),
    html = document.documentElement
  ;
  if (!__import__.m) {
      info.m = Object.create(null);
      info.i = 0;
      info.n = script.getAttribute('nonce');
      load(normalize(fileName));
  }
  return function (path) { return load(normalize(path)); };
}({}, document.querySelector('script[data-main]')));