/** @format */

import { mongoURL } from '../Config/URL';
import axios from 'axios';

export const photosServices = {
	getAll,
	getOne,
	create,
	update,
	remove,
};

async function getAll() {
	return axios
		.get(`${mongoURL}/photos`)
		.then(res => res)
		.catch(err => err.response);
}

async function getOne(id) {
	return axios
		.get(`${mongoURL}/photos/${id}`)
		.then(res => res)
		.catch(err => err.response);
}

async function create({ movieId, url }) {
	return axios
		.post(`${mongoURL}/photos`, {
			movieId,
			url,
		})
		.then(res => res)
		.catch(err => err.response);
}
async function update(id, { movieId, url }) {
	return axios
		.patch(`${mongoURL}/photos/${id}`, {
			movieId,
			url,
		})
		.then(res => res)
		.catch(err => err.response);
}
async function remove(id) {
	return axios
		.delete(`${mongoURL}/photos/${id}`)
		.then(res => res)
		.catch(err => err.response);
}
