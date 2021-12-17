import { IMiracle } from '@/shared/models/miracle'
import { collection, doc, Firestore, getDoc, onSnapshot, setDoc } from '@firebase/firestore'
import dayjs from 'dayjs'
import { addDoc, getDocs } from 'firebase/firestore'
import { firebaseUser } from './users'

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
        createdAt: dayjs().unix(),
        updatedAt: dayjs().unix(),
      })
      console.log('Document written with ID: ', docRef.id)
      return docRef
    } catch (e) {
      console.error('Error adding document: ', e)
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
      console.log('Add miracle error', error)
      return false
    }
  }

  onListenDataSourceSingle(oldData: IMiracle, callback: Function) {
    this.unsubscribeSnapshot = onSnapshot(
      doc(this._db, `mysteries/${this.userId}/data_sources`, this.miracleId),
      (documentData) => {
        console.log('Current data: ', documentData.data())
        callback(oldData, documentData.data())
      },
      (error) => {
        console.log('Listen error', error)
      }
    )
  }

  offListenDataSource() {
    this.unsubscribeSnapshot()
  }

  async loadSingleDataSourceMiracle() {
    try {
      const datas: IMiracle[] = []
      const querySnapshot = await getDocs(
        collection(this._db, `mysteries/${this.userId}/data_sources/${this.miracleId}/items`)
      )
      querySnapshot.forEach((doc) => {
        const docData = doc.data() as IMiracle
        datas.push({ id: doc.id, ...docData })

        // console.log(`${doc.id} => ${doc.data()}`)
      })

      return datas
    } catch (error) {
      console.log('Get single info miracle error', error)
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
      console.log('Get single info miracle error', error)
      return false
    }
  }

  async loadPaginationMiracles() {
    try {
      const datas: IMiracle[] = []
      const querySnapshot = await getDocs(collection(this._db, `mysteries/${this.userId}/infomations`))
      querySnapshot.forEach((doc) => {
        const docData = doc.data() as IMiracle
        datas.push({ id: doc.id, ...docData })

        // console.log(`${doc.id} => ${doc.data()}`)
      })

      return datas
    } catch (error) {
      console.log('load Pagination Data errors', error)
      return false
    }
  }
}
