1.2.0 / 2022-03-20
==================

  * Add `suppress` argument

1.1.1 / 2022-02-28
==================

  * Work around Zlib close bug in Node.js < 4.5.5

1.1.0 / 2022-01-25
==================

  * Add Zlib steam support and Node.js leak work around

1.0.4 / 2016-01-15
==================

  * perf: enable strict mode

1.0.3 / 2014-08-14
==================

  * Rename from `dethroy` to `destroy`

1.0.2 / 2014-08-14
==================

  * Work around `fd` leak in Node.js 0.10 for `fs.ReadStream`

1.0.1 / 2014-06-10
==================

  * Don't call `.close` on object without `.destroy`

1.0.0 / 2013-12-30
==================

  * Initial release
