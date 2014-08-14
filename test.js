var fs = require('fs')

var destroy = require('./')

describe('Dethroy', function () {
  it('should destroy a stream', function () {
    var stream = fs.createReadStream('package.json')
    isdestroyed(stream).should.be.false
    destroy(stream)
    isdestroyed(stream).should.be.true
  })

  it('should handle falsey values', function () {
    destroy()
  })
})

function isdestroyed(stream) {
  // readable for 0.8, destroyed for 0.10+
  return stream.readable === false || stream.destroyed === true
}
