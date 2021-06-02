const stream = require("stream");

module.exports = new stream.Transform({
  objectMode: true,

  construct(callback) {
    this.data = "";
    this.lastLineData = "";
    callback();
  },

  transform(chunk, encoding, callback) {
    this.data = chunk.toString();

    if (this.lastLineData) {
      this.data += this.lastLineData;
    }

    const lines = this.data.split("\n");

    this.lastLineData = lines.splice(lines.length - 1, 1)[0];

    lines.forEach(this.push.bind(this));

    callback();
  },

  flush(callback) {
    if (this.lastLineData) {
      this.push(this.lastLineData);
    }
    this.lastLineData = null;
    callback();
  },
});
