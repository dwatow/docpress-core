const compile = require('../../index')()

describe('index/unused md files:', function () {
  beforeEach(function (done) {
    // Mock metalsmith object
    var ms = {
      metadata () {
        return { docs: 'docs' }
      }
    }

    this.files = {
      'docs/README.md': {
        contents: '* [Readme](/README.md)'
      },
      'README.md': {
        contents: '[getting started](docs/getting-started.md)'
      },
      'docs/getting-started.md': {
        contents: 'hi'
      }
    }

    compile(this.files, ms, (err) => {
      if (err) throw err
      done()
    })
  })

  it('removes unprocessed .md files', function () {
    expect(Object.keys(this.files)).toEqual([
      '_docpress.json', 'index.html'
    ])
  })
})
