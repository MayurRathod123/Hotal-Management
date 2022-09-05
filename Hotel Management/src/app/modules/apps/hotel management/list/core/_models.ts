import { PipsType } from 'nouislider'
import {ID, Response} from '../../../../../../_metronic/helpers'
export type HotelDataModel = {
  id?:ID
  state_id?:string
  hotel_name?:string
  price?:number
  star?:number
  status?:number
}

export type HotelQueryResponce = Response <Array<HotelDataModel>>

export const initial: HotelDataModel = {
  id:0,
  state_id:'',
  hotel_name:" ",
  price:0,
  star:0,
  status:0
}

// export type StateListModel ={

// }