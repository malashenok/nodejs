const fs = require("fs")
const stream = require("stream")
const getline = require("./getline")
const hosts = require("./hosts")
const logFile = "./access.log"

function main() {
  if (!hosts || hosts.length === 0) {
    console.error("Hosts are undefined")
    return
  }

  if (!fs.existsSync(logFile)) {
    console.error("Log file not found")
    return
  }

  const sourceStream = fs.createReadStream(logFile)
  const streams = createStreams(...hosts)

  if (!sourceStream || !streams || streams.length === 0) {
    console.error("Streams were not created")
    return
  }

  const throughStream = sourceStream.pipe(getline)

  throughStream.on("data", (line) => {
    for (let host of hosts) {
      if (~line.indexOf(host)) {
        streams[host].write(line + "\n")
        break
      }
    }
  })

  closeStreams(...streams)
}

function createStreams(...hosts) {
  console.log("Start")
  const streams = []
  for (let host of hosts) {
    streams[host] = fs.createWriteStream(`${host}_requests.log`, {
      flags: "a",
      encoding: "utf8",
    })
  }
  return streams
}

function closeStreams(...streams) {
  streams.forEach((stream) => stream.end())
  console.log("End")
}

main()
