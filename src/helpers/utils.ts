import { ICardDataSource, IDataSource } from '@/shared/models/datasources'
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

export function ranDomCardItems(datasources: ICardDataSource[], currentResouceId: string) {
  let cardsNotSelectedYet = datasources.filter((card) => {
    if (card.id === currentResouceId) {
      return false
    }

    return !card.isPlayed
  })
  // console.log(cardsNotSelectedYet, )

  if (!cardsNotSelectedYet.length) {
    return []
  }

  const datasourcesLength = datasources.length
  const ratioCompensate = Math.ceil(datasourcesLength / cardsNotSelectedYet.length) - 1

  for (let index = 0; index < ratioCompensate; index++) {
    // Get length data need to Compensate
    const lengthCompensate = datasourcesLength - cardsNotSelectedYet.length

    const sliced = cardsNotSelectedYet.slice(0, lengthCompensate + 1)
    cardsNotSelectedYet = cardsNotSelectedYet.concat(sliced)
  }

  return randomItems(cardsNotSelectedYet)
}
