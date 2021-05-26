const getPrimes = require("./prime-numbers")
const colors = require("./color-functions")
let [node, app, start, end] = process.argv

if (isNaN(start) || isNaN(end)) {
  console.log(colors.showRedBoldMessage({ msg: "Введите диапазон чисел" }))
  return
} else {
  start = +start
  end = +end
}

if (start > end) {
  console.log(colors.showRedBoldMessage({ msg: "Некорректный диапазон чисел" }))
  return
}
//get array of prime numbers
const arr = getPrimes({ start, end })

if (arr.length === 0) {
  console.log(
    colors.showRedBoldMessage({
      msg: "В заданном диапазоне нет простых чисел",
    }),
  )
  return
}

//get array of color functions
const colorFunctions = Object.values(colors)

arr.forEach((number, index) => {
  const func = colorFunctions[index % 3]
  console.log(func({ msg: number }))
})
