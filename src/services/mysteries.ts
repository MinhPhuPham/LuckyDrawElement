import { errorNotification, successNotification } from '@/helpers/notification'
import { IMiracle } from '@/shared/models/miracle'
import { collection, deleteDoc, doc, Firestore, getDoc, setDoc } from '@firebase/firestore'
import dayjs from 'dayjs'
import store from '@/store/index'
import { addDoc, getDocs } from 'firebase/firestore'
import { firebaseUser } from './users'
import { MYSTERIES_ACTION } from '@/store/mysteries/actions'

export default class MysteriesSerivce {
  private miracleId: string = ''
  private userId: string = ''
  private _db: Firestore
  private unsubscribeSnapshot: Function = () => true

  constructor(db: Firestore, miracleId?: string, userId?: string) {
    this.miracleId = miracleId || ''
    this.userId = userId || firebaseUser()?.uid || ''
    this._db = db

    if (!this.userId) {
      throw new Error('Need user id for get miracle datas')
    }
  }

  async addMiracleItem(miracleData: IMiracle) {
    try {
      const docRef = await addDoc(collection(this._db, `mysteries/${this.userId}/infomations`), {
        ...miracleData,
        creatorId: this.userId,
        createdAt: dayjs().unix(),
        updatedAt: dayjs().unix(),
      })

      const miracle = { ...miracleData, id: docRef.id }
      store.commit(MYSTERIES_ACTION.ADD_ITEM, miracle)

      return docRef
    } catch (error) {
      errorNotification('Error adding mirarcle', '', error as Error)
      return false
    }
  }

  async setMiracleItem(miracleData: IMiracle) {
    try {
      await setDoc(doc(this._db, `mysteries/${this.userId}/infomations`, this.miracleId), {
        ...miracleData,
        updatedAt: dayjs().unix(),
      })

      return true
    } catch (error) {
      errorNotification('Error! Update mirarcle', '', error as Error)
      return false
    }
  }

  async deleteMiracleItem() {
    try {
      await Promise.all([
        deleteDoc(doc(this._db, `mysteries/${this.userId}/infomations`, this.miracleId)),
        deleteDoc(doc(this._db, `mysteries/${this.userId}/data_sources`, this.miracleId)),
      ])

      return true
    } catch (error) {
      errorNotification('Error! Can\t delete miracle', '', error as Error)
      return false
    }
  }

  async loadSingleInfoMiracle() {
    try {
      const docRef = doc(this._db, `mysteries/${this.userId}/infomations`, this.miracleId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data())
        return docSnap.data()
      } else {
        console.log('No such document!')
        return false
      }
    } catch (error) {
      errorNotification('Error! Get info mirarcle', '', error as Error)
      return false
    }
  }

  async loadPaginationMiracles() {
    store.commit(MYSTERIES_ACTION.SET_ITEMS_LOADING, true)
    const datas: IMiracle[] = []

    try {
      const querySnapshot = await getDocs(collection(this._db, `mysteries/${this.userId}/infomations`))
      querySnapshot.forEach((doc) => {
        const docData = doc.data() as IMiracle
        datas.push({ id: doc.id, ...docData })
        // console.log(`${doc.id} => ${doc.data()}`)
      })

      store.commit(MYSTERIES_ACTION.SET_ITEMS, datas)
    } catch (error) {
      errorNotification('Error! Get mirarcles info', '', error as Error)
    }

    store.commit(MYSTERIES_ACTION.SET_ITEMS_LOADING, false)
    return datas
  }
}
