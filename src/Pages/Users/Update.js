/** @format */

import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { usersServices } from '../../Services/usersServices';

const UpdateUser = ({ show, setShow, setUpdate, updateData }) => {
	const { handleSubmit, register } = useForm();

	const handleClose = () => setShow(false);
	const onSubmit = data => {
		usersServices
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
					<Modal.Title>Uredite korisnika</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form.Label>Ime</Form.Label>
					<Form.Control
						type='text'
						placeholder='Ime'
						defaultValue={updateData.firstName}
						{...register('firstName')}
					/>
					<Form.Label>Prezime</Form.Label>
					<Form.Control
						type='text'
						placeholder='Prezime'
						defaultValue={updateData.lastName}
						{...register('lastName')}
					/>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='text'
						placeholder='Email'
						defaultValue={updateData.email}
						{...register('email')}
					/>
					<Form.Label>Lozinka</Form.Label>
					<Form.Control
						type='text'
						placeholder='Lozinka'
						defaultValue={updateData.password}
						{...register('password')}
					/>
					<Form.Label>Uloga</Form.Label>
					<Form.Control
						type='text'
						placeholder='role'
						defaultValue={updateData.role}
						{...register('role')}
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

export default UpdateUser;
