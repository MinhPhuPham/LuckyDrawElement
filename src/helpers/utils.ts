import { IMiracle } from '@/shared/models/miracle'
import { localStorageCustom } from './localStorage'

export function saveLastChooseMiracle(userId: string, item: IMiracle) {
  if (userId && item) {
    localStorageCustom.setItem(`selectedMiracle-${userId}`, JSON.stringify(item))
  } else if (userId && !item) {
    localStorageCustom.removeItem(`selectedMiracle-${userId}`)
  }
}
