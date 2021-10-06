/** @format */

import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { moviesServices } from '../../Services/moviesServices';
import { genresServices } from '../../Services/genresServices';
import CreateMovie from './Create';
import UpdateMovie from './Update/Update';
import DeleteModal from './Delete';

const Movies = () => {
	const [data, setData] = useState([]);
	const [genres, setGenres] = useState([]);
	const [rowData, setRowData] = useState({});
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [genreOptions, setGenreOptions] = useState(null);

	const [isLoading, setIsLoading] = useState(false);
	const [update, setUpdate] = useState(new Date());

	useEffect(() => {
		genresServices
			.getAll()
			.then(res =>
				setGenreOptions(
					res.data.map(x => {
						return {
							value: x._id,
							label: x.name,
						};
					}),
				),
			)
			.catch(err => console.log(err));
	}, []);

	useEffect(() => {
		setIsLoading(true);
		moviesServices
			.getAll()
			.then(res => {
				setData(res.data);
				setIsLoading(false);
			})
			.catch(err => console.log(err));
	}, [update]);

	const ShowData = () => {
		return data.length > 0 ? (
			data.map(x => {
				var genre = genreOptions?.filter(y => y.value === x.genreId);

				return (
					<tr onClick={() => setRowData(x)}>
						<td>{x.name}</td>
						<td>{x.year}</td>
						<td>{genre[0].label}</td>
						<td>{x.reservationPrice}</td>
						<td>{x.buyPrice}</td>
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
				);
			})
		) : (
			<tr>Nema podataka</tr>
		);
	};
	return (
		<div>
			<div className='d-flex justify-content-between align-items-start'>
				<h1>Filmovi</h1>
				<Button variant='dark' onClick={() => setShowCreateModal(true)}>
					Dodaj novi +
				</Button>
			</div>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Naziv filma</th>
						<th>Godina</th>
						<th>Žanr</th>
						<th>Cijena dan</th>
						<th>Cijena kupovina</th>
						<th>Akcije</th>
					</tr>
				</thead>
				<tbody>{isLoading ? <tr> Učitava se</tr> : <ShowData />}</tbody>
			</Table>
			<CreateMovie
				show={showCreateModal}
				setShow={setShowCreateModal}
				setUpdate={setUpdate}
				genreOptions={genreOptions}
			/>
			{showUpdateModal && (
				<UpdateMovie
					updateData={rowData}
					show={showUpdateModal}
					setShow={setShowUpdateModal}
					setUpdate={setUpdate}
					genreOptions={genreOptions}
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

export default Movies;
