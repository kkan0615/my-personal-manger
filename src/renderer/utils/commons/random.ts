export const getRandomInt = (max = 1, min = 0) => {
  return Math.floor(Math.random() * (max + 1)) + min
}

export const getRandomInArr = <T = any>(arr: Array<T>): T => {
  const randIndex = Math.floor(Math.random() * arr.length)

  return arr[randIndex]
}
