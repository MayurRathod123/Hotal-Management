import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {StateDataModel, StateQueryResponce} from './_models'
import * as authHelper from '../../../../auth/core/AuthHelpers'

const API_URL = process.env.REACT_APP_API_URL
const USER_URL = `${API_URL}/Users`
const GET_USERS_URL = `${API_URL}/users/query`
const { data : { authToken } } = authHelper.getAuth();
const header = {Authorization: `Bearer ${authToken}`,accept:" */*","Content-Type": "application/json"}
// console.log('************ 10', header)

const getStateData = (query: any): Promise<StateQueryResponce> => {
  const req = {
      "pageSize": 10,
      "pageNo": query.page,
      "sortOrder": "ASC",
      "sortBy": "0",
      "search": ""
  }
  return axios
    .post(`${USER_URL}/list`, {...req} ,{headers: header})
    .then((d: AxiosResponse<StateQueryResponce>) => d.data)
}

const getStateById = (id: ID): Promise<StateDataModel | undefined> => {
  return axios
    .get(`${USER_URL}/${id}`,{headers: header})
    .then((response: AxiosResponse<Response<StateDataModel>>) => response.data)
    .then((response: Response<StateDataModel>) => response.data)
}

const createState = (user: StateDataModel): Promise<StateDataModel | undefined> => {  
  return axios
    .post(`${USER_URL}/save`, user,{headers: header})
    .then((response: AxiosResponse<Response<StateDataModel>>) => response.data)
    .then((response: Response<StateDataModel>) => response.data)
}

const updateState = (user: StateDataModel): Promise<StateDataModel | undefined> => {
  return axios
    .post(`${USER_URL}/save`, user,{headers: header})
    .then((response: AxiosResponse<Response<StateDataModel>>) => response.data)
    .then((response: Response<StateDataModel>) => response.data)
}

// const deleteUser = (userId: ID): Promise<void> => {
//   return axios.delete(`${USER_URL}/delete/${userId}`,{headers: header}).then(() => {})
// }

// const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
//   const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`,{headers: header}))
//   return axios.all(requests).then(() => {})
// }

export {getStateData, getStateById, createState, updateState}
