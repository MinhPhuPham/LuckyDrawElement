import { IUserFull, UserModel } from '@/shared/models/user'
import { getAuth, onAuthStateChanged, User } from '@firebase/auth'
import { Firestore, setDoc } from '@firebase/firestore'
import dayjs from 'dayjs'
import { doc } from 'firebase/firestore'

const auth = getAuth()

export const firebaseUser = () => {
  const currentUser = auth.currentUser
  if (currentUser?.displayName) {
    return currentUser
  }

  return currentUser?.providerData[0]
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

    return true
  } catch (error) {
    console.log('Upsert user error', error)
    return false
  }
}
