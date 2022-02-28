export interface Manager {
  mainImg: string
  name: string
  gender: 'male' | 'female' | 'unknown'
  age?: number
  randClickMessages: any[]
}
