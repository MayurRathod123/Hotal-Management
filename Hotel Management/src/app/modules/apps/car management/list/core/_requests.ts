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
  return axios
    .get(`${API_URL}/getAllcarList.php/${id}`)
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

// const deleteUserRole = async (userRoleId: ID): Promise<void> => {
//   return axios.delete(`${API_URL}/userrole/delete_userrole/${userRoleId}`).then(() => {})
// }

// const deleteSelectedUserRoles = async (userRoleIds: Array<ID>): Promise<void> => {
//   const requests = userRoleIds.map((id) =>
//     axios.delete(`${API_URL}/userrole/delete_userrole/${id}`)
//   )
//   return axios.all(requests).then(() => {})
// }

export {
  getCarList,
  getCarById,
  createCarData,
  updateCarData,
}
