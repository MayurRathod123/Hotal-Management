import {ID, Response} from '../../../../../../_metronic/helpers'
export type HotelDataModel = {
  id?:ID
  hotelDescription?:string
  hotel_name?:string
  price?:number
  star?:number
  status?:number
}

export type HotelQueryResponce = Response <Array<HotelDataModel>>

export const initial: HotelDataModel = {
  hotelDescription:" ",
  id:0,
  hotel_name:" ",
  price:0,
  star:0,
  status:0
}
