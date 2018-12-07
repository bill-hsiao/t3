function nameGen(string1, string2, length) {
  let val = Array(length).fill(null)
  for (let i = 0; i < length; i ++) {
    val[i] = (i % 2 == 0 ? string1[i] : string2[i])
  }
  return val
}

module.exports = nameGen
