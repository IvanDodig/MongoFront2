/** @format */

import { mongoURL } from '../Config/URL';
import axios from 'axios';

export const moviesServices = {
	getAll,
	getOne,
	create,
	update,
	remove,
};

async function getAll() {
	return axios
		.get(`${mongoURL}/movies`)
		.then(res => res)
		.catch(err => err.response);
}

async function getOne(id) {
	return axios
		.get(`${mongoURL}/movies/${id}`)
		.then(res => res)
		.catch(err => err.response);
}

async function create({ genreId, name, year, reservationPrice, buyPrice }) {
	return axios
		.post(`${mongoURL}/movies`, {
			genreId,
			name,
			year,
			reservationPrice,
			buyPrice,
		})
		.then(res => res)
		.catch(err => err.response);
}

async function update(id, { genreId, name, year, reservationPrice, buyPrice }) {
	return axios
		.patch(`${mongoURL}/movies/${id}`, {
			genreId,
			name,
			year,
			reservationPrice,
			buyPrice,
		})
		.then(res => res)
		.catch(err => err.response);
}

async function remove(id) {
	return axios
		.delete(`${mongoURL}/movies/${id}`)
		.then(res => res)
		.catch(err => err.response);
}
