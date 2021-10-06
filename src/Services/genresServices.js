/** @format */

import { mongoURL } from '../Config/URL';
import axios from 'axios';

export const genresServices = {
	getAll,
	getOne,
	create,
	update,
	remove,
};

async function getAll() {
	return axios
		.get(`${mongoURL}/genres`)
		.then(res => res)
		.catch(err => err.response);
}

async function getOne(id) {
	return axios
		.get(`${mongoURL}/genres/${id}`)
		.then(res => res)
		.catch(err => err.response);
}

async function create({ name }) {
	return axios
		.post(`${mongoURL}/genres`, {
			name,
		})
		.then(res => res)
		.catch(err => err.response);
}

async function update(id, { name }) {
	return axios
		.patch(`${mongoURL}/genres/${id}`, {
			name,
		})
		.then(res => res)
		.catch(err => err.response);
}

async function remove(id) {
	return axios
		.delete(`${mongoURL}/genres/${id}`)
		.then(res => res)
		.catch(err => err.response);
}
