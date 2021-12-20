import { IDataSource } from '@/shared/models/datasources'
import { IMiracle } from '@/shared/models/miracle'
import { localStorageCustom } from './localStorage'

export function saveLastChooseMiracle(userId: string, item: IMiracle) {
  if (userId && item) {
    localStorageCustom.setItem(`selectedMiracle-${userId}`, JSON.stringify(item))
  } else if (userId && !item) {
    localStorageCustom.removeItem(`selectedMiracle-${userId}`)
  }
}

export function randomItems(datasouces: IDataSource[]) {
  const length = datasouces.length
  const arr1 = new Array()
  for (let i = 0; i < length; i++) {
    arr1[i] = i
  }

  // Establish an array of array
  const arr2 = new Array()
  for (let i = 0; i < length; i++) {
    arr2[i] = arr1.splice(Math.floor(Math.random() * arr1.length), 1)
  }

  // Randomly disrupt the array
  const arr3 = new Array()
  for (let i = 0; i < length; i++) {
    arr3[i] = datasouces[arr2[i]]
  }

  return arr3
}
