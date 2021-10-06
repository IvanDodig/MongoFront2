/** @format */
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { commentsServices } from '../../Services/commentsServices';
import { moviesServices } from '../../Services/moviesServices';
import UpdateSelect from '../../Common/UpdateSelect';

const UpdateComment = ({
	show,
	setShow,
	setUpdate,
	updateData,
	movieOptions,
}) => {
	const { handleSubmit, register, control } = useForm();

	const [movieDefaultvalue, setMovieDefaultValue] = useState(null);

	const handleClose = () => setShow(false);
	useEffect(() => {
		moviesServices
			.getOne(updateData.movieId)
			.then(res => {
				setMovieDefaultValue({
					value: res.data._id,
					label: res.data.name,
				});
			})
			.catch(err => console.log(err));
	}, [updateData]);

	const onSubmit = data => {
		const updatedData = {
			...data,
			movieId: data.movieId?.value || movieDefaultvalue.value,
		};
		commentsServices
			.update(updateData._id, updatedData)
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
					<Modal.Title>Uredite komentar</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form.Label>Film</Form.Label>
					{movieDefaultvalue ? (
						<UpdateSelect
							control={control}
							defaultValue={movieDefaultvalue}
							register={register}
							options={movieOptions}
							valueName='movieId'
						/>
					) : (
						<Select isDisabled />
					)}
					<Form.Label>Text</Form.Label>
					<Form.Control
						type='text'
						placeholder='Text'
						defaultValue={updateData.text}
						{...register('text')}
					/>
					<Form.Label>Ocjena</Form.Label>
					<Form.Control
						type='text'
						placeholder='Ocjena'
						defaultValue={updateData.review}
						{...register('review')}
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

export default UpdateComment;
