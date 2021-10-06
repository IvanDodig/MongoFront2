/** @format */

import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { genresServices } from '../../Services/genresServices';

const UpdateGenre = ({ show, setShow, setUpdate, updateData }) => {
	const { handleSubmit, register } = useForm();

	const handleClose = () => setShow(false);
	const onSubmit = data => {
		genresServices
			.update(updateData._id, data)
			.then(res => {
				console.log(res);
				setUpdate(new Date());
				setShow(false);
			})
			.catch(err => console.log(err));
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Header closeButton>
					<Modal.Title>Uredite Žanr</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form.Label>Naziv</Form.Label>
					<Form.Control
						type='text'
						placeholder='Naziv'
						defaultValue={updateData.name}
						{...register('name')}
					/>
				</Modal.Body>

				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Odustani
					</Button>

					<input value='Uredi' type='submit' className='btn btn-dark' />
				</Modal.Footer>
			</form>
		</Modal>
	);
};

export default UpdateGenre;
