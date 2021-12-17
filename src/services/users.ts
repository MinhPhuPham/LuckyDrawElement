import { getAuth, onAuthStateChanged, User } from '@firebase/auth'

const auth = getAuth()

const firebaseUser = () => {
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
