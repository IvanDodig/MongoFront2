/** @format */

import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { genresServices } from '../../Services/genresServices';

const CreateGenre = ({ show, setShow, setUpdate }) => {
	const { handleSubmit, register } = useForm();

	const handleClose = () => setShow(false);
	const onSubmit = data => {
		genresServices
			.create(data)
			.then(res => {
				setUpdate(new Date());
				setShow(false);
			})
			.catch(err => console.log(err));
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Header closeButton>
					<Modal.Title>Dodajte novi žanr</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form.Label>Naziv</Form.Label>
					<Form.Control type='text' placeholder='Naziv' {...register('name')} />
				</Modal.Body>

				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Odustani
					</Button>

					<input value='Dodaj' type='submit' className='btn btn-dark' />
				</Modal.Footer>
			</form>
		</Modal>
	);
};

export default CreateGenre;
