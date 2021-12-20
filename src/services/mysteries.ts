import { errorNotification } from '@/helpers/notification'
import { IMiracle } from '@/shared/models/miracle'
import { collection, deleteDoc, doc, Firestore, getDoc, orderBy, query, setDoc, updateDoc } from '@firebase/firestore'
import dayjs from 'dayjs'
import store from '@/store/index'
import { addDoc, getDocs } from 'firebase/firestore'
import { firebaseUser } from './users'
import { MYSTERIES_ACTION } from '@/store/mysteries/actions'

export default class MysteriesSerivce {
  private miracleId: string = ''
  private userId: string = ''
  private _db: Firestore

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

      store.dispatch(MYSTERIES_ACTION.SET_ITEM, { item: miracleData, isUpdate: true })
      return true
    } catch (error) {
      errorNotification('Error! Update mirarcle', '', error as Error)
      return false
    }
  }

  async setRecentlyAccess() {
    try {
      return await updateDoc(doc(this._db, `mysteries/${this.userId}/infomations`, this.miracleId), {
        updatedAt: dayjs().unix(),
      })
    } catch (error) {
      console.log('Error! Set recently into DB', error)
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
        return docSnap.data()
      } else {
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
      const informationsRef = collection(this._db, `mysteries/${this.userId}/infomations`)
      const queryDB = query(informationsRef, orderBy('updatedAt', 'desc'))
      const querySnapshot = await getDocs(queryDB)
      if (!querySnapshot.empty) {
        querySnapshot.docs.forEach((doc) => {
          const docData = doc.data() as IMiracle
          datas.push({ ...docData, id: doc.id })
        })
      }

      store.commit(MYSTERIES_ACTION.SET_ITEMS, datas)
    } catch (error) {
      errorNotification('Error! Get mirarcles info', '', error as Error)
    }

    store.commit(MYSTERIES_ACTION.SET_ITEMS_LOADING, false)
    return datas
  }
}
