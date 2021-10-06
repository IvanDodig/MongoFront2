/** @format */

import { mongoURL } from '../Config/URL';
import axios from 'axios';

export const reservationsServices = {
	getAll,
	getOne,
	create,
	update,
	remove,
};

async function getAll() {
	return axios
		.get(`${mongoURL}/reservations`)
		.then(res => res)
		.catch(err => err.response);
}

async function getOne(id) {
	return axios
		.get(`${mongoURL}/reservations/${id}`)
		.then(res => res)
		.catch(err => err.response);
}

async function create({ movieId, userId, daysNum }) {
	return axios
		.post(`${mongoURL}/reservations`, {
			movieId,
			userId,
			daysNum,
		})
		.then(res => res)
		.catch(err => err.response);
}

async function update(id, { movieId, userId, daysNum }) {
	return axios
		.patch(`${mongoURL}/reservations/${id}`, {
			movieId,
			userId,
			daysNum,
		})
		.then(res => res)
		.catch(err => err.response);
}

async function remove(id) {
	return axios
		.delete(`${mongoURL}/reservations/${id}`)
		.then(res => res)
		.catch(err => err.response);
}
