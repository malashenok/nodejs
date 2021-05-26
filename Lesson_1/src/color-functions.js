const colors = require("colors/safe")

const showGreenBoldMessage = ({ msg }) => {
  return colors.green.bold(msg)
}
const showYellowBoldMessage = ({ msg }) => {
  return colors.yellow.bold(msg)
}

const showRedBoldMessage = ({ msg }) => {
  return colors.red.bold(msg)
}

module.exports = {
  showGreenBoldMessage,
  showYellowBoldMessage,
  showRedBoldMessage,
}
