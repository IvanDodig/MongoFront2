/** @format */

import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { genresServices } from '../../Services/genresServices';
import CreateGenre from './Create';
import UpdateGenre from './Update';
import DeleteModal from './Delete';

const Genres = () => {
	const [data, setData] = useState([]);
	const [rowData, setRowData] = useState({});
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [isLoading, setIsLoading] = useState(false);
	const [update, setUpdate] = useState(new Date());

	useEffect(() => {
		setIsLoading(true);
		genresServices
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
					<td>{x.name}</td>
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
				<h1>Žanrovi</h1>
				<Button variant='dark' onClick={() => setShowCreateModal(true)}>
					Dodaj novi +
				</Button>
			</div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Naziv</th>
						<th>Akcije</th>
					</tr>
				</thead>
				<tbody>{isLoading ? <tr> Učitava se</tr> : <ShowData />}</tbody>
			</Table>
			<CreateGenre
				show={showCreateModal}
				setShow={setShowCreateModal}
				setUpdate={setUpdate}
			/>
			{showUpdateModal && (
				<UpdateGenre
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

export default Genres;
