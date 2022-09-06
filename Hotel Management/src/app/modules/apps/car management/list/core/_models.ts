import {ID,Response} from '../../../../../../_metronic/helpers'
export type CarDataModel = {
  name?: String
  price:number
  status?:number
  id?: ID
}

export type CarQueryResponse = Response<Array<CarDataModel>>

export const initial: CarDataModel = {
  name: '',
  price:0,
  status:1,
  id: 0,
}