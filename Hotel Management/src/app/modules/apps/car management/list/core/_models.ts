import {ID,Response} from '../../../../../../_metronic/helpers'
export type CarDataModel = {
  carDescription?: String
  name?: String
  price:number
  status?:number
  id?: ID
}

export type CarQueryResponse = Response<Array<CarDataModel>>

export const initial: CarDataModel = {
  carDescription: '',
  name: '',
  price:0,
  status: 0,
  id: 0,
}