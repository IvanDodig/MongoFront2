/** @format */

import { mongoURL } from '../Config/URL';
import axios from 'axios';

export const usersServices = {
	getAll,
	getOne,
	create,
	update,
	remove,
};

async function getAll() {
	return axios
		.get(`${mongoURL}/users`)
		.then(res => res)
		.catch(err => err.response);
}

async function getOne(id) {
	return axios
		.get(`${mongoURL}/users/${id}`)
		.then(res => res)
		.catch(err => err.response);
}

async function create({ firstName, lastName, email, password, role }) {
	return axios
		.post(`${mongoURL}/users`, {
			firstName,
			lastName,
			email,
			password,
			role,
		})
		.then(res => res)
		.catch(err => err.response);
}

async function update(id, { firstName, lastName, email, password, role }) {
	return axios
		.patch(`${mongoURL}/users/${id}`, {
			firstName,
			lastName,
			email,
			password,
			role,
		})
		.then(res => res)
		.catch(err => err.response);
}

async function remove(id) {
	return axios
		.delete(`${mongoURL}/users/${id}`)
		.then(res => res)
		.catch(err => err.response);
}
