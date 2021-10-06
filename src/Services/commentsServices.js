/** @format */

import { mongoURL } from '../Config/URL';
import axios from 'axios';

export const commentsServices = {
	getAll,
	getOne,
	create,
	update,
	remove,
};

async function getAll() {
	return axios
		.get(`${mongoURL}/comments`)
		.then(res => res)
		.catch(err => err.response);
}

async function getOne(id) {
	return axios
		.get(`${mongoURL}/comments/${id}`)
		.then(res => res)
		.catch(err => err.response);
}

async function create({ movieId, text, review }) {
	return axios
		.post(`${mongoURL}/comments`, {
			movieId,
			text,
			review,
		})
		.then(res => res)
		.catch(err => err.response);
}

async function update(id, { movieId, text, review }) {
	return axios
		.patch(`${mongoURL}/comments/${id}`, {
			movieId,
			text,
			review,
		})
		.then(res => res)
		.catch(err => err.response);
}

async function remove(id) {
	return axios
		.delete(`${mongoURL}/comments/${id}`)
		.then(res => res)
		.catch(err => err.response);
}
