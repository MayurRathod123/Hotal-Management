import axios, { AxiosResponse } from 'axios';
import { ID, Response } from '../../../../../../_metronic/helpers';
import { HotelDataModel, HotelQueryResponce } from './_models';

const API_URL = process.env.REACT_APP_API_URL;

const getHotelList = async(query:any): Promise<HotelQueryResponce> => {
	const req = {
		pageSize: 10,
		pageNumber: query.page,
		sortBy:query.sort,  
		sortOrder: query.order
	  }
	return axios
		.get(`${API_URL}/getHotel.php?`, {params:{...req}})
		.then((d: AxiosResponse<HotelQueryResponce>) => d.data);
};


const getHotelById = async(id:any): Promise<HotelDataModel | undefined> => {
	return axios
		.get(`${API_URL}/getHotelById.php?id=${id.id}`)
		.then((response: AxiosResponse<Response<HotelDataModel>>) => response.data)	
		.then((response: Response<HotelDataModel>) => response.data);
};

const createHotelData = async (
	data: HotelDataModel,
): Promise<HotelDataModel | undefined> => {
	if (data) {
		data.status = data.status ? 1 : 0;
	}
	return axios
		.post(`${API_URL}/addHotel.php`, data)
		.then((response: AxiosResponse<Response<HotelDataModel>>) => response.data)
		.then((response: Response<HotelDataModel>) => response.data);
};

const updateHotelData = async (
	data: HotelDataModel,
): Promise<HotelDataModel | undefined> => {
	if (data) {
		data.status = data.status ? 1 : 0;
	}
	return axios
		.put(`${API_URL}/updateHotel.php`, {data})
		.then((response: AxiosResponse<Response<HotelDataModel>>) => response.data)
		.then((response: Response<HotelDataModel>) => response.data);
};

const deleteHotel = async (id: any): Promise<void> => {
  return axios.get(`${API_URL}/deleteHotel.php?id=${id.id}`)
  .then(() => {})
}
export {

	getHotelList,
	getHotelById,
	createHotelData,
	updateHotelData,
	deleteHotel,
};
