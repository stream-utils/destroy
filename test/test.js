
var assert = require('assert')
var fs = require('fs')
var net = require('net')
var zlib = require('zlib')

var destroy = require('..')

describe('destroy(stream)', function () {
  it('should destroy a stream', function () {
    var stream = fs.createReadStream('package.json')
    assert(!isdestroyed(stream))
    destroy(stream)
    assert(isdestroyed(stream))
  })

  it('should handle falsey values', function () {
    destroy()
  })

  it('should handle random object', function () {
    destroy({})
  })

  describe('ReadStream', function () {
    it('should not leak fd when called sync to open', function (done) {
      // this test will timeout on a fd leak
      var _close = fs.close
      var _open = fs.open
      var waitclose = false

      function cleanup () {
        fs.close = _close
        fs.open = _open
      }

      fs.close = function close () {
        _close.apply(this, arguments)
        cleanup()
        done()
      }

      fs.open = function open () {
        waitclose = true
        _open.apply(this, arguments)
      }

      var stream = fs.createReadStream('package.json')
      destroy(stream)
      assert(isdestroyed(stream))

      if (waitclose) {
        return
      }

      cleanup()
      done()
    })
  })

  describe('Socket', function () {
    it('should destroy a socket', function (done) {
      var server = net.createServer(function (connection) {
        socket.on('close', function () {
          server.close(done)
        })
        destroy(connection)
      })
      var socket

      server.listen(0, function () {
        socket = net.connect(this.address().port)
      })
    })
  })

  ;['Gunzip', 'Inflate', 'InflateRaw', 'Unzip'].forEach(function (type) {
    var method = 'create' + type

    describe('Zlib.' + type, function () {
      it('should destroy a zlib stream', function () {
        var stream = zlib[method]()
        assert(!isdestroyed(stream))
        destroy(stream)
        assert(isdestroyed(stream))
      })

      it('should destroy a zlib stream after write', function () {
        var stream = zlib[method]()
        assert(!isdestroyed(stream))
        stream.write('')
        destroy(stream)
        assert(isdestroyed(stream))
      })

      it('should destroy a zlib stream after error', function (done) {
        var stream = zlib[method]()
        assert(!isdestroyed(stream))
        stream.on('error', function () {
          destroy(stream)
          assert(isdestroyed(stream))
          done()
        })
        stream.write('foobar_invalid')
      })
    })
  })

  ;['Gzip', 'Deflate', 'DeflateRaw'].forEach(function (type) {
    var method = 'create' + type

    describe('Zlib.' + type, function () {
      it('should destroy a zlib stream', function () {
        var stream = zlib[method]()
        assert(!isdestroyed(stream))
        destroy(stream)
        assert(isdestroyed(stream))
      })

      it('should destroy a zlib stream after write', function () {
        var stream = zlib[method]()
        assert(!isdestroyed(stream))
        stream.write('')
        destroy(stream)
        assert(isdestroyed(stream))
      })
    })
  })
})

describe('destroy(stream, suppress)', function () {
  it('should destroy a stream', function () {
    var stream = fs.createReadStream('package.json')
    assert(!isdestroyed(stream))
    destroy(stream, true)
    assert(isdestroyed(stream))
  })

  it('should handle falsey values', function () {
    destroy(0, true)
  })

  it('should handle random object', function () {
    destroy({}, true)
  })

  it('should suppress errors after destroy', function () {
    var stream = fs.createReadStream('package2.json')
    assert(!isdestroyed(stream))
    destroy(stream, true)
    assert(isdestroyed(stream))
  })
})

function isdestroyed (stream) {
  // readable for 0.8, destroyed for 0.10+, _closed for zlib < 8
  return stream.readable === false || stream.destroyed === true ||
    stream._closed === true
}
