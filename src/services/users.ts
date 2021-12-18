import { localStorageCustom } from '@/helpers/localStorage'
import { IUserFull, UserModel } from '@/shared/models/user'
import { getAuth, onAuthStateChanged, User } from '@firebase/auth'
import { Firestore, setDoc } from '@firebase/firestore'
import dayjs from 'dayjs'
import { doc } from 'firebase/firestore'

const auth = getAuth()

export const firebaseUser = () => {
  const currentUser = auth.currentUser
  if (!currentUser) {
    return null
  }

  return currentUser?.displayName ? currentUser : { ...currentUser?.providerData[0], uid: currentUser?.uid }
}

export const checkAuth = async () => {
  return firebaseUser() || (await onListenAuthChange())
}

export const onListenAuthChange = (): Promise<User> => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user as User)
    })
  })
}

export const upsertUser = async (db: Firestore, user: IUserFull | User) => {
  try {
    await setDoc(doc(db, 'users', user.uid), {
      ...new UserModel(user as IUserFull).parseWithoutTokenModel(),
      lastLoginAt: dayjs().unix(),
    })
    localStorageCustom.setItem('user', JSON.stringify(new UserModel(user as IUserFull).parseModel()))

    return true
  } catch (error) {
    console.log('Upsert user error', error)
    return false
  }
}
