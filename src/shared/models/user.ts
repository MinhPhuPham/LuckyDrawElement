import { User } from '@firebase/auth'

export interface IUser {
  displayName: string
  email: string
  emailVerified: boolean
  phoneNumber: string
  photoURL: string
  uid: string
  providerData?: Array<Omit<IUser, 'providerData'>>
  tokenManage: Object
}

export interface stsTokenManager {
  stsTokenManager: {
    accessToken: string
    refreshToken: string
  }
}

export type IUserFull = User & stsTokenManager

export class UserModel {
  public displayName: string
  public email: string
  public phoneNumber: string
  public uid: string
  public photoURL: string
  public emailVerified: boolean
  public tokenManage: Object

  constructor(user: IUserFull) {
    this.displayName = user.displayName || user.providerData[0]?.displayName || ''
    this.email = user.email || user.providerData[0]?.email || ''
    this.phoneNumber = user.phoneNumber || user.providerData[0]?.phoneNumber || ''
    this.photoURL = user.photoURL || user.providerData[0]?.photoURL || ''
    this.uid = user.uid || ''
    this.emailVerified = user.emailVerified || true
    this.tokenManage = {
      accessToken: user.stsTokenManager?.accessToken,
      refreshToken: user.stsTokenManager?.refreshToken,
    }
  }

  parseModel() {
    return {
      displayName: this.displayName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      photoURL: this.photoURL,
      uid: this.uid,
      emailVerified: this.emailVerified,
      tokenManage: this.tokenManage,
    }
  }

  parseWithoutTokenModel() {
    const { tokenManage, ...model } = this.parseModel()
    return model
  }
}
