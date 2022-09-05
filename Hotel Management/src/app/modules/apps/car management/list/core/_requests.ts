import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import { CarDataModel, CarQueryResponse } from './_models'

const API_URL = process.env.REACT_APP_API_URL

const getCarList = async (query: any): Promise<CarQueryResponse> => {
  const req = {
    pageSize: 10,
    pageNumber: query.page,
    sortBy: 'cts',  
    sortOrder: 'asc'
  }
  return axios
    .get(`${API_URL}/getAllcarList.php?`, {params:{...req}})
    .then((d: AxiosResponse<CarQueryResponse>) => d.data)
}

const getCarById = async (id: ID): Promise<CarDataModel | undefined> => {
  console.log(id, 'id called')

  return axios
    .get(`${API_URL}/getCarById.php?id=${id}`)
    .then((response: AxiosResponse<Response<CarDataModel>>) => response.data)
    .then((response: Response<CarDataModel>) => response.data)
}

const createCarData = async (
  data: CarDataModel
): Promise<CarDataModel | undefined> => {
  if (data) {
    data.status = data.status ? 1 : 0
  }
  return axios
    .post(`${API_URL}/addCar.php`, data)
    .then((response: AxiosResponse<Response<CarDataModel>>) => response.data)
    .then((response: Response<CarDataModel>) => response.data)
}

const updateCarData = async (
  data: CarDataModel
): Promise<CarDataModel | undefined> => {
  if (data) {
    data.status = data.status ? 1 : 0
  }
  return axios
    .put(`${API_URL}/updateCarList.php`, data)
    .then((response: AxiosResponse<Response<CarDataModel>>) => response.data)
    .then((response: Response<CarDataModel>) => response.data)
}

const deleteCar = async (id:ID): Promise<void> => {
  console.log(id)
  return axios.get(`${API_URL}/deleteCer.php?id=${id}`)
  .then(() => {})
}


export {
  getCarList,
  getCarById,
  createCarData,
  updateCarData,
  deleteCar,
}
