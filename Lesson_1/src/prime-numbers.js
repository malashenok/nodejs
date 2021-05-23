module.exports = ({ start, end }) => {
  const arr = []

  if (!start || !end) {
    return []
  }

  nextPrime: for (let i = start; i <= end; i++) {
    for (let j = 2; j * j <= i; j++) {
      if (i % j === 0) continue nextPrime
    }

    arr.push(i)
  }

  return arr
}
