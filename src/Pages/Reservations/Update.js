/** @format */
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import UpdateSelect from '../../Common/UpdateSelect';
import { moviesServices } from '../../Services/moviesServices';
import { reservationsServices } from '../../Services/reservationsServices';
import { usersServices } from '../../Services/usersServices';

const UpdateReservaiton = ({
	show,
	setShow,
	setUpdate,
	updateData,
	movieOptions,
	userOptions,
}) => {
	const { handleSubmit, register, control } = useForm();

	const [movieDefaultvalue, setMovieDefaultValue] = useState(null);
	const [userDefaultvalue, setUserDefaultValue] = useState(null);

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

		usersServices
			.getOne(updateData.userId)
			.then(res => {
				setUserDefaultValue({
					value: res.data._id,
					label: res.data.firstName + ' ' + res.data.lastName,
				});
			})
			.catch(err => console.log(err));
	}, [updateData]);

	const onSubmit = data => {
		const updatedData = {
			...data,
			movieId: data.movieId?.value || movieDefaultvalue.value,
			userId: data.userId?.value || userDefaultvalue.value,
		};

		reservationsServices
			.update(updateData._id, updatedData)
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
					<Modal.Title>Uredite rezervaciju</Modal.Title>
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

					<Form.Label>Korisnik</Form.Label>
					{userDefaultvalue ? (
						<UpdateSelect
							control={control}
							defaultValue={userDefaultvalue}
							register={register}
							options={userOptions}
							valueName='userId'
						/>
					) : (
						<Select isDisabled />
					)}

					<Form.Label>Broj dana</Form.Label>
					<Form.Control
						type='text'
						placeholder='Broj dana'
						defaultValue={updateData.daysNum}
						{...register('daysNum')}
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

export default UpdateReservaiton;
