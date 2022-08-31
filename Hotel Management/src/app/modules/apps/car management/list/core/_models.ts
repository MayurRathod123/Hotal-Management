import {Response} from '../../../../../../_metronic/helpers'
export type UserRoleDataModel = {
  roleDescription?: String
  carName?: String
  price:number
  status?: any
  userRoleId?: number
}

export type UserRoleQueryResponse = Response<Array<UserRoleDataModel>>

export const initial: UserRoleDataModel = {
  roleDescription: '',
  carName: '',
  price:0,
  status: 0,
  userRoleId: 0,
}
