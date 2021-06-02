#!/usr/bin/env node
const fs = require("fs")
const path = require("path")
const inquirer = require("inquirer")
const getline = require("./getline")
const getParams = require("./getparams")

let { directory, regexp } = getParams()

const isDirectory = (path) => {
  return fs.lstatSync(path).isDirectory()
}

const main = (value) => {
  if (!value) {
    value = process.cwd()
  }

  const list = fs.readdirSync(value)

  inquirer
    .prompt([
      {
        name: "fileName",
        type: "list",
        message: "Choose file:",
        choices: list,
      },
    ])
    .then((answer) => {
      const { fileName } = answer
      const fullPath = path.join(value, fileName)

      if (isDirectory(fullPath)) {
        main(fullPath)
        return
      }

      const sourceStream = fs.createReadStream(fullPath)

      if (!sourceStream) {
        console.error("Stream was not created")
        return
      }

      const throughStream = sourceStream.pipe(getline)

      throughStream.on("data", (line) => {
        if (regexp.test(line)) {
          console.log(`this line matches: ${line}`)
        }
      })
    })
    .catch((error) => {
      console.error(error)
    })
}

main(directory)
