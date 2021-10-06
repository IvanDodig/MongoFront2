/** @format */
import Select from 'react-select';
import { Modal, Button, Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { commentsServices } from '../../Services/commentsServices';

const CreateComment = ({ show, setShow, setUpdate, movieOptions }) => {
	const { handleSubmit, register, control } = useForm();

	const handleClose = () => setShow(false);
	const onSubmit = data => {
		const updatedData = {
			...data,
			movieId: data.movieId.value,
		};

		commentsServices
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
					<Modal.Title>Dodajte novi komentar</Modal.Title>
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

					<Form.Label>Text</Form.Label>
					<Form.Control type='text' placeholder='Text' {...register('text')} />
					<Form.Label>Ocjena</Form.Label>
					<Form.Control
						type='text'
						placeholder='Ocjena'
						{...register('review')}
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

export default CreateComment;
