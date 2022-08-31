import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {UserRoleDataModel, UserRoleQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL

const getUserRoles = async (query: any): Promise<UserRoleQueryResponse> => {
  let sortBy = 0
  switch (query.sort) {
    case 'roleDescription':
      sortBy = 2
      break
    case 'roleName':
      sortBy = 1
      break
    case 'status':
      sortBy = 3
      break
    default:
      break
  }
  const req = {
    pageSize: 10,
    pageNo: query.page,
    sortOrder: query.order === 'asc' ? 'ASC' : 'DESC',
    sortBy: `${sortBy}`,
    search: query.search || '',
  }
  return axios
    .post(`${API_URL}/products`, {...req})
    .then((d: AxiosResponse<UserRoleQueryResponse>) => d.data)
}

const getUserRoleById = async (id: ID): Promise<UserRoleDataModel | undefined> => {
  return axios
    .get(`${API_URL}/products/${id}`)
    .then((response: AxiosResponse<Response<UserRoleDataModel>>) => response.data)
    .then((response: Response<UserRoleDataModel>) => response.data)
}

const getUserData = async (userId:any): Promise<any> => {
  const req = {
    pageSize: 100,
    pageNo: 1,
    sortOrder: 'asc' === 'asc' ? 'ASC' : 'DESC',
    sortBy: `0`,
    search: '' || '',
    userRoleId: userId,
  }
  return axios
    .post(`${API_URL}/userrolemapping/get_all_roleusers`, {...req})
    .then((response: any) => response.data)
}

const createUserRoleData = async (
  data: UserRoleDataModel
): Promise<UserRoleDataModel | undefined> => {
  if (data) {
    data.status = data.status ? 1 : 0
  }
  return axios
    .post(`${API_URL}/userrole/save_userrole`, data)
    .then((response: AxiosResponse<Response<UserRoleDataModel>>) => response.data)
    .then((response: Response<UserRoleDataModel>) => response.data)
}

const updateUserRoleData = async (
  data: UserRoleDataModel
): Promise<UserRoleDataModel | undefined> => {
  if (data) {
    data.status = data.status ? 1 : 0
  }
  return axios
    .post(`${API_URL}/userrole/save_userrole`, data)
    .then((response: AxiosResponse<Response<UserRoleDataModel>>) => response.data)
    .then((response: Response<UserRoleDataModel>) => response.data)
}

const deleteUserRole = async (userRoleId: ID): Promise<void> => {
  return axios.delete(`${API_URL}/userrole/delete_userrole/${userRoleId}`).then(() => {})
}

const deleteSelectedUserRoles = async (userRoleIds: Array<ID>): Promise<void> => {
  const requests = userRoleIds.map((id) =>
    axios.delete(`${API_URL}/userrole/delete_userrole/${id}`)
  )
  return axios.all(requests).then(() => {})
}

export {
  getUserRoles,
  deleteUserRole,
  deleteSelectedUserRoles,
  getUserRoleById,
  createUserRoleData,
  updateUserRoleData,
  getUserData
}
