import { errorNotification, updateNotification } from '@/helpers/notification'
import { IDataSource } from '@/shared/models/datasources'
import { ranDomCardItems } from '@/helpers/utils'
import store from '@/store'
import { MYSTERIES_ACTION } from '@/store/mysteries/actions'
import {
  collection,
  doc,
  Firestore,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from '@firebase/firestore'
import { deleteDoc, getDocs } from 'firebase/firestore'
import { firebaseUser } from './users'
import { convertUnixToDatetime, dateFromNow, nowToUnixTime } from '@/helpers/date'

export default class DatasourcesSerivce {
  private miracleId: string = ''
  private userId: string = ''
  private _db: Firestore
  private unsubscribeSnapshot: Function = () => true

  constructor(db: Firestore, miracleId?: string, userId?: string) {
    this.miracleId = miracleId || ''
    this.userId = userId || firebaseUser()?.uid || sessionStorage.getItem('userId') || ''
    this._db = db

    if (!this.userId) {
      throw new Error('Need user id for get miracle datas')
    }
  }

  onListenDataSourceSingle(callback?: Function) {
    const itemsColRef = collection(this._db, `mysteries/${this.userId}/data_sources/${this.miracleId}/items`)
    const queryDB = query(itemsColRef)

    this.unsubscribeSnapshot = onSnapshot(
      queryDB,
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'modified') {
            // console.log('Modified resouce: ', change.doc.data())
            const dataChange = change.doc.data() as IDataSource
            updateNotification(
              'User Played!',
              `${dataChange.name} has played at ${dateFromNow(dataChange.selected?.dateSelected as number)}`
            )

            if (dataChange?.selected) {
              dataChange.selected = {
                ...dataChange.selected,
                dateSelected: convertUnixToDatetime(dataChange.selected?.dateSelected as number),
              }
            }
            store.commit(MYSTERIES_ACTION.UPSERT_DATASOURCE, dataChange)
          }
        })
      },
      (error) => {
        errorNotification('Error! Listen realtime event', '', error as Error)
      }
    )
  }

  offListenDataSource() {
    this.unsubscribeSnapshot()
  }

  async checkCurrentDataResouce(resourceChooseId: string) {
    store.commit(MYSTERIES_ACTION.SET_DATASOURCE_LOADING, true)
    try {
      const docRef = doc(this._db, `mysteries/${this.userId}/data_sources/${this.miracleId}/items`, resourceChooseId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const resourceData = docSnap.data() as IDataSource
        return { isPlayed: resourceData.isPlayed, data: docSnap.data() }
      } else {
        return false
      }
    } catch (error) {
      errorNotification('Error! Get data-sources mirarcle', '', error as Error)
    } finally {
      store.commit(MYSTERIES_ACTION.SET_DATASOURCE_LOADING, false)
    }
  }

  async checkDataResouceSelected(selectedResouceid: string) {
    store.commit(MYSTERIES_ACTION.SET_DATASOURCE_LOADING, true)
    try {
      const resourceRefs = collection(this._db, `mysteries/${this.userId}/data_sources/${this.miracleId}/items`)
      const queryDB = query(resourceRefs, where('selected.id', '==', selectedResouceid))
      const querySnapshot = await getDocs(queryDB)

      if (querySnapshot.empty) {
        return true
      }

      return false
    } catch (error) {
      errorNotification('Error! This user has been selected by another people! Select again', '', error as Error)
    } finally {
      store.commit(MYSTERIES_ACTION.SET_DATASOURCE_LOADING, false)
    }
  }

  async setSelectedDataResource(resourceChooseId: string, selectedResouce: IDataSource) {
    store.commit(MYSTERIES_ACTION.SET_DATASOURCE_LOADING, true)

    try {
      return await updateDoc(
        doc(this._db, `mysteries/${this.userId}/data_sources/${this.miracleId}/items`, resourceChooseId),
        {
          createdAt: nowToUnixTime(),
          selected: {
            id: selectedResouce.id,
            name: selectedResouce.name,
            dateSelected: nowToUnixTime(),
          },
          isPlayed: true,
        }
      )
    } catch (error) {
      errorNotification('Error! Can\t update into DB', '', error as Error)
    } finally {
      store.commit(MYSTERIES_ACTION.SET_DATASOURCE_LOADING, false)
    }
  }

  async loadSingleDataSourceMiracle(isRandomItem = false, resourceId = '') {
    store.commit(MYSTERIES_ACTION.SET_DATASOURCE_LOADING, true)
    const datas: IDataSource[] = []

    try {
      const itemsRef = collection(this._db, `mysteries/${this.userId}/data_sources/${this.miracleId}/items`)
      const queryDB = query(itemsRef, orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(queryDB)
      if (!querySnapshot.empty) {
        querySnapshot.docs.forEach((doc) => {
          const docData = doc.data() as IDataSource
          if (docData.selected) {
            docData.selected.dateSelected = convertUnixToDatetime(docData.selected.dateSelected as number)
          }
          datas.push({ ...docData, id: doc.id })
        })
      }
      store.commit(MYSTERIES_ACTION.SET_DATASOURCE, isRandomItem ? ranDomCardItems(datas, resourceId) : datas)
    } catch (error) {
      errorNotification('Error! Get data-sources mirarcle', '', error as Error)
    }

    store.commit(MYSTERIES_ACTION.SET_DATASOURCE_LOADING, false)
    return datas
  }

  async upsertDataSource(datasource: IDataSource) {
    store.commit(MYSTERIES_ACTION.SET_DATASOURCE_LOADING, true)

    try {
      await setDoc(doc(this._db, `mysteries/${this.userId}/data_sources/${this.miracleId}/items`, datasource.id), {
        ...datasource,
        createdAt: nowToUnixTime(),
      })
      store.commit(MYSTERIES_ACTION.UPSERT_DATASOURCE, datasource)
    } catch (error) {
      errorNotification('Error! Upsert datasource failed', '', error as Error)
    } finally {
      store.commit(MYSTERIES_ACTION.SET_DATASOURCE_LOADING, false)
    }
  }

  async deleteDataSource(datasourceId: string) {
    store.commit(MYSTERIES_ACTION.SET_DATASOURCE_LOADING, true)

    try {
      await deleteDoc(doc(this._db, `mysteries/${this.userId}/data_sources/${this.miracleId}/items`, datasourceId))
      store.commit(MYSTERIES_ACTION.DELETE_DATASOURCE, datasourceId)
    } catch (error) {
      errorNotification('Error! Can\t delete miracle', '', error as Error)
    } finally {
      store.commit(MYSTERIES_ACTION.SET_DATASOURCE_LOADING, false)
    }
  }

  async addMultipleDatasource(datasources: IDataSource[]) {
    store.commit(MYSTERIES_ACTION.SET_DATASOURCE_LOADING, true)
    try {
      const batch = writeBatch(this._db)
      datasources.forEach((data) => {
        const docRef = doc(this._db, `mysteries/${this.userId}/data_sources/${this.miracleId}/items`, data.id as string)
        batch.set(docRef, { ...data, createdAt: nowToUnixTime() })
      })

      await batch.commit()
    } catch (error) {
      errorNotification('Error! Get data-sources mirarcle', '', error as Error)
    } finally {
      store.commit(MYSTERIES_ACTION.SET_DATASOURCE_LOADING, false)
      return
    }
  }
}
