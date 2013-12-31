var fs = require('fs')

var destroy = require('./')

describe('Dethroy', function () {
  it('should destroy a stream', function () {
    var s = fs.createReadStream('package.json')
    destroy(s)
    s.destroyed.should.be.ok
  })

  it('should handle falsey values', function () {
    destroy()
  })
})