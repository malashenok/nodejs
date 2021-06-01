const events = require("events")
const ee = new events.EventEmitter()
const { subSeconds, formatDistanceToNowStrict, parse } = require("date-fns")
const verifyDates = require("./verify-dates")

const [node, app, ...args] = process.argv

const timers = []

function timerListenerHandler(value, index) {
  const newDateValue = subSeconds(value, 1)

  const secondsLeft = formatDistanceToNowStrict(newDateValue, {
    unit: "second",
  })

  if (secondsLeft === "0 seconds") {
    timerListenerRemover(index)
    console.log(`timer_${index}: finished`)
  } else {
    console.log(`timer_${index}: ${secondsLeft} left`)
  }
}

function timerListenerRemover(index) {
  ee.removeListener(`timer_${index}_tick`, timerListenerHandler)
  clearInterval(timers[index])
}

function main() {
  if (!verifyDates(args)) {
    return
  }

  for (let i = 0; i < args.length; i++) {
    const date = parse(args[i], "yyyyMMddHHmm", new Date())

    ee.on(`timer_${i}_tick`, timerListenerHandler)

    const timerId = setInterval(() => {
      ee.emit(`timer_${i}_tick`, date, i)
    }, 1000)

    timers[i] = timerId
  }
}

main()
