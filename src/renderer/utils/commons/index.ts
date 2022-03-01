export const getRandInt = (payload?: {min?: number; max?: number}) => {
  let result: number | undefined = undefined
  if (payload) {
    if (payload.max !== undefined && payload.min !== undefined) {
      result = Math.floor(Math.random() * (payload.max - payload.min)) + payload.min
    } else if (payload.min !== undefined) {
      result = Math.floor(Math.random()) + payload.min
    } else if (payload.max !== undefined) {
      result = Math.floor(Math.random() * (payload.max))
    } else {
      result = Math.floor(Math.random())
    }
  } else {
    result = Math.floor(Math.random())
  }
  return result
}

export const getRandElInArr = <T = any>(array: T[]) => {
  return array[getRandInt({ min: 0, max: array.length })]
}
