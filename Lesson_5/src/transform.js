const { Transform } = require("stream")

class StreamTransform extends Transform {
  constructor() {
    super()
    this.objectMode = true
    this.data = ""
    this.lastLineData = ""
  }

  _transform(chunk, encoding, callback) {
    this.data = chunk.toString()

    if (this.lastLineData) {
      this.data += this.lastLineData
    }

    const lines = this.data.split("\n")

    this.lastLineData = lines.splice(lines.length - 1, 1)[0]

    lines.forEach(this.push.bind(this))

    callback()
  }

  _flush(callback) {
    if (this.lastLineData) {
      this.push(this.lastLineData)
    }
    this.lastLineData = null
    callback()
  }
}

module.exports = StreamTransform