/** @format */

import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { usersServices } from '../../Services/usersServices';

const CreateUser = ({ show, setShow, setUpdate }) => {
	const { handleSubmit, register } = useForm();

	const handleClose = () => setShow(false);
	const onSubmit = data => {
		usersServices
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
					<Modal.Title>Dodajte novog korisnika</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form.Label>Ime</Form.Label>
					<Form.Control
						type='text'
						placeholder='Ime'
						{...register('firstName')}
					/>
					<Form.Label>Prezime</Form.Label>
					<Form.Control
						type='text'
						placeholder='Prezime'
						{...register('lastName')}
					/>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='text'
						placeholder='Email'
						{...register('email')}
					/>
					<Form.Label>Lozinka</Form.Label>
					<Form.Control
						type='text'
						placeholder='Lozinka'
						{...register('password')}
					/>
					<Form.Label>Uloga</Form.Label>
					<Form.Control type='text' placeholder='role' {...register('role')} />
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

export default CreateUser;
