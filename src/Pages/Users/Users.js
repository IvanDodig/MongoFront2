/** @format */

import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { usersServices } from '../../Services/usersServices';
import CreateUser from './Create';
import UpdateUser from './Update';
import DeleteModal from './Delete';

const Users = () => {
	const [data, setData] = useState([]);
	const [rowData, setRowData] = useState({});
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [isLoading, setIsLoading] = useState(false);
	const [update, setUpdate] = useState(new Date());

	useEffect(() => {
		setIsLoading(true);
		usersServices
			.getAll()
			.then(res => {
				setData(res.data);
				setIsLoading(false);
			})
			.catch(err => console.log(err));
	}, [update]);

	const ShowData = () => {
		return data.length > 0 ? (
			data.map(x => (
				<tr onClick={() => setRowData(x)}>
					<td>{x.firstName}</td>
					<td>{x.lastName}</td>
					<td>{x.email}</td>
					<td>{x.password}</td>
					<td>{x.role}</td>
					<td className='actions'>
						<Button
							variant='success'
							onClick={() => {
								setRowData(x);
								setShowUpdateModal(true);
							}}>
							Uredi
						</Button>
						<Button
							variant='danger'
							onClick={() => {
								setRowData(x);
								setShowDeleteModal(true);
							}}>
							Izbriši
						</Button>
					</td>
				</tr>
			))
		) : (
			<tr>Nema podataka</tr>
		);
	};

	return (
		<div>
			<div className='d-flex justify-content-between align-items-start'>
				<h1>Korisnici</h1>
				<Button variant='dark' onClick={() => setShowCreateModal(true)}>
					Dodaj novi +
				</Button>
			</div>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Ime</th>
						<th>Prezime</th>
						<th>Email</th>
						<th>Lozinka</th>
						<th>Uloga</th>
						<th>Akcije</th>
					</tr>
				</thead>
				<tbody>{isLoading ? <tr> Učitava se</tr> : <ShowData />}</tbody>
			</Table>
			<CreateUser
				show={showCreateModal}
				setShow={setShowCreateModal}
				setUpdate={setUpdate}
			/>
			{showUpdateModal && (
				<UpdateUser
					updateData={rowData}
					show={showUpdateModal}
					setShow={setShowUpdateModal}
					setUpdate={setUpdate}
				/>
			)}
			<DeleteModal
				show={showDeleteModal}
				deleteId={rowData._id}
				setShow={setShowDeleteModal}
				setUpdate={setUpdate}
			/>
		</div>
	);
};

export default Users;
