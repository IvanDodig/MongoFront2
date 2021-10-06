/** @format */
import Select from 'react-select';
import { Modal, Button, Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { reservationsServices } from '../../Services/reservationsServices';

const CreateReservation = ({
	show,
	setShow,
	setUpdate,
	movieOptions,
	userOptions,
}) => {
	const { handleSubmit, register, control } = useForm();

	const handleClose = () => setShow(false);
	const onSubmit = data => {
		const updatedData = {
			...data,
			userId: data.userId.value,
			movieId: data.movieId.value,
		};

		reservationsServices
			.create(updatedData)
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
					<Modal.Title>Dodajte novu rezervaciju</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form.Label>Film</Form.Label>
					<Controller
						control={control}
						{...register('movieId')}
						render={({ field }) => (
							<Select
								{...field}
								options={movieOptions}
								isLoading={!movieOptions}
							/>
						)}
					/>

					<Form.Label>Korisnik</Form.Label>
					<Controller
						control={control}
						{...register('userId')}
						render={({ field }) => (
							<Select
								{...field}
								options={userOptions}
								isLoading={!userOptions}
							/>
						)}
					/>

					<Form.Label>Broj dana</Form.Label>
					<Form.Control
						type='text'
						placeholder='Broj dana'
						{...register('daysNum')}
					/>
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

export default CreateReservation;
