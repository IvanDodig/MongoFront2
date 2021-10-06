/** @format */

import Select from 'react-select';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { moviesServices } from '../../../Services/moviesServices';
import { useEffect, useState } from 'react';
import { genresServices } from '../../../Services/genresServices';
import GenreInput from './GenreInput';

const UpdateMovie = ({
	show,
	setShow,
	setUpdate,
	updateData,
	genreOptions,
}) => {
	const { handleSubmit, register, control } = useForm();
	const [defaultValue, setDefaultValue] = useState(null);

	useEffect(() => {
		genresServices
			.getOne(updateData.genreId)
			.then(res => {
				setDefaultValue({
					value: res.data._id,
					label: res.data.name,
				});
			})
			.catch(err => console.log(err));
	}, [updateData]);

	const handleClose = () => setShow(false);
	const onSubmit = data => {
		const newData = {
			...data,
			genreId: data.genreId?.value || defaultValue.value,
		};
		moviesServices
			.update(updateData._id, newData)
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
					<Modal.Title>Uredite film</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form.Label>Žanr</Form.Label>
					{defaultValue ? (
						<GenreInput
							control={control}
							defaultValue={defaultValue}
							register={register}
							genreOptions={genreOptions}
						/>
					) : (
						<Select isDisabled />
					)}

					<Form.Label>Naziv filma</Form.Label>
					<Form.Control
						type='text'
						placeholder='Naziv filma'
						defaultValue={updateData.name}
						{...register('name')}
					/>

					<Form.Label>Godina izdavanja</Form.Label>
					<Form.Control
						type='text'
						placeholder='Godina izdavanja'
						defaultValue={updateData.year}
						{...register('year')}
					/>

					<Form.Label>Cijena rezervacije</Form.Label>
					<Form.Control
						type='text'
						placeholder='Cijena rezervacije'
						defaultValue={updateData.reservationPrice}
						{...register('reservationPrice')}
					/>

					<Form.Label>Cijena kupovine</Form.Label>
					<Form.Control
						type='text'
						placeholder='Cijena kupovine'
						defaultValue={updateData.buyPrice}
						{...register('buyPrice')}
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

export default UpdateMovie;
