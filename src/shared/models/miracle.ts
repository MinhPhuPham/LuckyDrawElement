export interface IBaseMiracle {
  id?: string
  title: string
  description: string
  type: number
}

export interface IMiracleCard extends IBaseMiracle {
  cardBgOverlay?: string
  cardBgBorder?: string
}

export interface IMiracleWheel extends IBaseMiracle {
  turnsTime?: number
  turnsNumber?: number
}

export interface IMiracleCloud extends IBaseMiracle {
  cloudBg?: string
  normalSpeed?: number
  runSpeed?: number
  nameStyle?: Object
}

export type IMiracle = IMiracleCard & IMiracleCloud & IMiracleWheel
