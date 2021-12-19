export interface ISelectedDataSource {
  id?: string
  name: string
  dateSelected: string
}

export interface IBaseDataSource {
  id: string
  name: string
  subtitle: string
  link: string
  isPlayed: boolean
  selected?: ISelectedDataSource | null
}

export interface ICardDataSource extends IBaseDataSource {
  fontBg?: string // Custom front-of background selected
}

export interface ICloudDataSource extends IBaseDataSource {}
export interface IWheelDataSource extends IBaseDataSource {}

export type IDataSource = ICardDataSource & ICloudDataSource & IWheelDataSource
