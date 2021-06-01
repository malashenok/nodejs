const { isMatch, isPast, isEqual, parse } = require("date-fns")

module.exports = (dates) => {
  const now = new Date()

  if (dates.length === 0) {
    console.error("Введите дату-время в формате YYYYMMDDHHmm")
    return false
  }

  const containsWrongFormat = dates.some(
    (date) => !isMatch(date, "yyyyMMddHHmm"),
  )

  if (containsWrongFormat) {
    console.error("Неверный формат дат")
    return false
  }

  const containsPastDate = dates.some((date) => {
    date = parse(date, "yyyyMMddHHmm", new Date())
    return isPast(date) || isEqual(date, now)
  })

  if (containsPastDate) {
    console.error("Введите даты будующего периода")
    return false
  }

  return true
}
