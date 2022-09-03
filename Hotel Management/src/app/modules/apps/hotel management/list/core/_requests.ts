import axios, { AxiosResponse } from 'axios';
import { ID, Response } from '../../../../../../_metronic/helpers';
import { HotelDataModel, HotelQueryResponce } from './_models';

const API_URL = process.env.REACT_APP_API_URL;

const getHotelList =(query:any): Promise<HotelQueryResponce> => {
	return axios
		.get(`${API_URL}/getHotel.php?pageSize=7&pageNumber=1&sortBy=cts&sortOrder=asc`)
		.then((d: AxiosResponse<HotelQueryResponce>) => d.data);
};


const getHotelById = (id: ID): Promise<HotelDataModel | undefined> => {
	return axios
		.get(`${API_URL}/getHotel.php/${id}`)
		.then((response: AxiosResponse<Response<HotelDataModel>>) => response.data)
		.then((response: Response<HotelDataModel>) => response.data);
};

const createHotelData = (
	data: HotelDataModel,
): Promise<HotelDataModel | undefined> => {
	if (data) {
		data.status = data.status ? true : false;
	}
	return axios
		.post(`${API_URL}/addHotel.php`, data)
		.then((response: AxiosResponse<Response<HotelDataModel>>) => response.data)
		.then((response: Response<HotelDataModel>) => response.data);
};

const updateHotelData = (
	data: HotelDataModel,
): Promise<HotelDataModel | undefined> => {
	if (data) {
		data.status = data.status ? true : false;
	}
	return axios
		.put(`${API_URL}/updateHotel.php`, {data})
		.then((response: AxiosResponse<Response<HotelDataModel>>) => response.data)
		.then((response: Response<HotelDataModel>) => response.data);
};

const deleteHotel = (id: ID): Promise<void> => {
  return axios.get(`${API_URL}/deleteHotel.php/${id}`)
  .then(() => {})
}
export {

	getHotelList,
	getHotelById,
	createHotelData,
	updateHotelData,
	deleteHotel,
};
