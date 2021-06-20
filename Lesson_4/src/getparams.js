const fs = require("fs")
const yargs = require("yargs")

module.exports = () => {
  const options = yargs
    .usage("Usage: -d <di> -r <regexp>")
    .option("d", {
      alias: "directory",
      describe: "Path to file",
      type: "string",
      demandOption: false,
    })
    .option("r", {
      alias: "regexp",
      describe: "Reg exp for string in file",
      type: "string",
      demandOption: true,
    }).argv

  let { directory = process.cwd(), regexp } = options

  const stat = fs.existsSync(directory) ? fs.lstatSync(directory) : null

  if (!stat || !stat.isDirectory()) {
    return
  }

  try {
    regexp = new RegExp(regexp, "g")
  } catch (err) {
    return
  }
  return { directory, regexp }
}
