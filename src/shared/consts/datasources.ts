import { MiracleType } from '../enums/miracle-type'
import { IBaseDataSource, ICardDataSource, ICloudDataSource, IWheelDataSource } from '../models/datasources'

const BASE_DATASOUCE: IBaseDataSource = {
  id: '',
  name: '',
  subtitle: '',
  link: '',
  isPlayed: false,
  selected: null,
}

export const CARD_DATASOUCE: ICardDataSource = {
  ...BASE_DATASOUCE,
}

export const WHEEL_DATASOUCE: IWheelDataSource = {
  ...BASE_DATASOUCE,
}

export const CLOUD_DATASOUCE: ICloudDataSource = {
  ...BASE_DATASOUCE,
}

export const OPTIONS_DEFAULT_DATASOUCE = {
  [MiracleType.MIRACLE_CARD]: CARD_DATASOUCE,
  [MiracleType.MIRACLE_WHEEL]: WHEEL_DATASOUCE,
  [MiracleType.MIRACLE_CLOUD]: CLOUD_DATASOUCE,
}
