import { errorNotification } from '@/helpers/notification'
import { IDataSource } from '@/shared/models/datasources'
import { IMiracle } from '@/shared/models/miracle'
import store from '@/store'
import { MYSTERIES_ACTION } from '@/store/mysteries/actions'
import { collection, doc, Firestore, getDoc, onSnapshot, setDoc, writeBatch } from '@firebase/firestore'
import dayjs from 'dayjs'
import { addDoc, deleteDoc, getDocs } from 'firebase/firestore'
import { firebaseUser } from './users'

export default class DatasourcesSerivce {
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

  onListenDataSourceSingle(oldData: IMiracle, callback: Function) {
    this.unsubscribeSnapshot = onSnapshot(
      doc(this._db, `mysteries/${this.userId}/data_sources`, this.miracleId),
      (documentData) => {
        console.log('Current data: ', documentData.data())
        callback(oldData, documentData.data())
      },
      (error) => {
        errorNotification('Error! Listen realtime event', '', error as Error)
      }
    )
  }

  offListenDataSource() {
    this.unsubscribeSnapshot()
  }

  async loadSingleDataSourceMiracle() {
    store.commit(MYSTERIES_ACTION.SET_DATASOURCE_LOADING, true)
    const datas: IDataSource[] = []

    try {
      const querySnapshot = await getDocs(
        collection(this._db, `mysteries/${this.userId}/data_sources/${this.miracleId}/items`)
      )
      querySnapshot.forEach((doc) => {
        const docData = doc.data() as IDataSource
        datas.push({ ...docData, id: doc.id })
      })
      store.commit(MYSTERIES_ACTION.SET_DATASOURCE, datas)
    } catch (error) {
      errorNotification('Error! Get data-sources mirarcle', '', error as Error)
    }

    store.commit(MYSTERIES_ACTION.SET_DATASOURCE_LOADING, false)
    return datas
  }

  async upsertDataSource(datasource: IDataSource) {
    try {
      await setDoc(doc(this._db, `mysteries/${this.userId}/data_sources/${this.miracleId}/items`, datasource.id), {
        ...datasource,
      })
      store.commit(MYSTERIES_ACTION.UPSERT_DATASOURCE, datasource)
      return true
    } catch (error) {
      errorNotification('Error! Upsert datasource failed', '', error as Error)
      return false
    }
  }

  async deleteDataSource(datasourceId: string) {
    try {
      await deleteDoc(doc(this._db, `mysteries/${this.userId}/data_sources/${this.miracleId}/items`, datasourceId))
      store.commit(MYSTERIES_ACTION.DELETE_DATASOURCE, datasourceId)
      return true
    } catch (error) {
      errorNotification('Error! Can\t delete miracle', '', error as Error)
      return false
    }
  }

  async addMultipleDatasource(datasources: IDataSource[]) {
    try {
      const batch = writeBatch(this._db)
      datasources.forEach((data) => {
        //doc(collection(this._db, `mysteries/${this.userId}/data_sources/${this.miracleId}/items`))
        const docRef = doc(this._db, `mysteries/${this.userId}/data_sources/${this.miracleId}/items`, data.id as string)
        batch.set(docRef, data)
      })

      const response = await batch.commit()
      console.log(response)
    } catch (error) {
      errorNotification('Error! Get data-sources mirarcle', '', error as Error)
      return false
    }
  }
}
