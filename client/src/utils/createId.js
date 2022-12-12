import { nanoid } from 'nanoid'
export function createId(quantity) {
  if (quantity) {
    const arr = []
    for (let i = 0; i < quantity; i++) {
      const id = nanoid()
      arr.push(id)
    }
    return arr
  }
  return nanoid()
}
