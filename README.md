# Destroy

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
[![Gittip][gittip-image]][gittip-url]

Destroy a stream robustly, handling different APIs and node.js bugs.
For an example and use-case, see https://github.com/jshttp/on-finished#example.

## API

```js
var destroy = require('destroy')

var fs = require('fs')
var stream = fs.createReadStream('package.json')

setTimeout(function () {
  // make sure the stream is destroyed after 1s,
  // regardless of whether it is finished reading data
  destroy(stream)
}, 1000)
```

[npm-image]: https://img.shields.io/npm/v/destroy.svg?style=flat-square
[npm-url]: https://npmjs.org/package/destroy
[github-tag]: http://img.shields.io/github/tag/stream-utils/destroy.svg?style=flat-square
[github-url]: https://github.com/stream-utils/destroy/tags
[travis-image]: https://img.shields.io/travis/stream-utils/destroy.svg?style=flat-square
[travis-url]: https://travis-ci.org/stream-utils/destroy
[coveralls-image]: https://img.shields.io/coveralls/stream-utils/destroy.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/stream-utils/destroy?branch=master
[license-image]: http://img.shields.io/npm/l/destroy.svg?style=flat-square
[license-url]: LICENSE.md
[downloads-image]: http://img.shields.io/npm/dm/destroy.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/destroy
[gittip-image]: https://img.shields.io/gittip/jonathanong.svg?style=flat-square
[gittip-url]: https://www.gittip.com/jonathanong/
