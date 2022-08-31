import {Response} from '../../../../../../_metronic/helpers'
export type UserRoleDataModel = {
  roleDescription?: String
  price:number
  stars:number
  hotelName?: String
  status?: any
  userRoleId?: number
}

export type UserRoleQueryResponse = Response<Array<UserRoleDataModel>>

export const initial: UserRoleDataModel = {
  roleDescription: '',
  hotelName: '',
  price:0,
  stars:0,
  status: 0,
  userRoleId: 0,
}
