/** @format */
import Select from 'react-select';
import { Modal, Button, Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { photosServices } from '../../Services/photosServices';

const CreatePhoto = ({ show, setShow, setUpdate, movieOptions }) => {
	const { handleSubmit, register, control } = useForm();

	const handleClose = () => setShow(false);
	const onSubmit = data => {
		const updatedData = {
			...data,
			movieId: data.movieId.value,
		};

		photosServices
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
					<Modal.Title>Dodajte novu sliku</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form.Label>URL</Form.Label>
					<Form.Control type='text' placeholder='URL' {...register('url')} />

					<Form.Label>Naziv filma</Form.Label>
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

export default CreatePhoto;
