const http = require("http")
const fs = require("fs")
const path = require("path")
const { isBinary } = require("istextorbinary")
const StreamTransform = require("./transform")

require("dotenv").config({ path: "./src/.env" })

const { PORT, PARENT_FOLDER_HREF } = process.env

let currentPath = process.cwd()

const isDirectory = (path) => {
  return fs.lstatSync(path).isDirectory()
}

const server = http.createServer(async(req, res) => {
  const { method, url } = req

  if (method !== "GET") {
    response.end("POST not allowed")
  }

  //favicon.ico
  if (url.includes("ico")) {
    return res.end()
  }
  //if path contains ..
  else if (url.includes("parentFolder")) {
    currentPath = getPreviousPath(currentPath)
  } else {
    currentPath = path.join(currentPath, url)
  }

  if (!currentPath) {
    currentPath = "/"
  }

  if (isDirectory(currentPath)) {
    await sendDirectoryContent(currentPath, res)
  } else {
    sendFileContent(currentPath, res)
    currentPath = getPreviousPath(currentPath)
  }
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

async function sendDirectoryContent(folder, response) {
  const content = await fs.promises.readdir(folder)

  const list =
    PARENT_FOLDER_HREF +
    content.reduce((str, file) => str + `<a href="${file}">${file}</a><br>`, "")

  response.writeHead(200, {
    "Content-Type": "text/html",
  })

  response.end(`<html><body>${list}</body></html>`)
}

function sendFileContent(file, response) {
  //file is binary
  if (isBinary(file)) {
    response.writeHead(204, {
      "Content-Type": "text/html",
    })

    response.end(`<html><body><h1>File is binary</h1></body></html>`)
    return
  }

  //file is text
  const stream = fs.createReadStream(file)

  const transform = new StreamTransform()
  const throughStream = stream.pipe(transform)

  response.writeHead(200, {
    "Content-Type": "text/html",
  })

  throughStream
    .on("data", (line) => {
      response.write(`<p>${line}</p>`)
    })
    .on("end", () => {
      response.end()
    })
}

function getPreviousPath(path) {
  return path ? path.split("/").slice(0, -1).join("/") : "/"
}