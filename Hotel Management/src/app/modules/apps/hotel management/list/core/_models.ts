import { PipsType } from 'nouislider'
import {ID, Response} from '../../../../../../_metronic/helpers'
export type HotelDataModel = {
  id?:ID
  state_id?:number
  hotel_name?:string
  price?:number
  star?:number
  status?:number
  cp_price?:number
  map_price?:number
  ap_price?:number
  pickup_price?:number
  drop_price?:number
  adult_with_mattress?:number
  child_with_mattress?:number
}

export type HotelQueryResponce = Response <Array<HotelDataModel>>

export const initial: HotelDataModel = {
  id:0,
  state_id:0,
  hotel_name:" ",
  price:0,
  star:0,
  status:0,
  cp_price:0,
  map_price:0,
  ap_price:0,
  pickup_price:0,
  drop_price:0,
  adult_with_mattress:0,
  child_with_mattress:0,
}
