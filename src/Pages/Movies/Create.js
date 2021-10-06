/** @format */

import Select from 'react-select';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { moviesServices } from '../../Services/moviesServices';
import { genresServices } from '../../Services/genresServices';
import { useEffect, useState } from 'react';

const CreateMovie = ({ show, setShow, setUpdate, genreOptions }) => {
	const { handleSubmit, register, control } = useForm();

	const handleClose = () => setShow(false);

	const onSubmit = data => {
		const updatedData = { ...data, genreId: data.genreId.value };
		moviesServices
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
					<Modal.Title>Dodajte novi film</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form.Label>Žanr</Form.Label>
					<Controller
						control={control}
						{...register('genreId')}
						render={({ field }) => (
							<Select
								{...field}
								options={genreOptions}
								isLoading={!genreOptions}
							/>
						)}
					/>

					<Form.Label>Naziv filma</Form.Label>
					<Form.Control
						type='text'
						placeholder='Naziv filma'
						{...register('name')}
					/>

					<Form.Label>Godina izdavanja</Form.Label>
					<Form.Control
						type='text'
						placeholder='Godina izdavanja'
						{...register('year')}
					/>

					<Form.Label>Cijena rezervacije</Form.Label>
					<Form.Control
						type='text'
						placeholder='Cijena rezervacije'
						{...register('reservationPrice')}
					/>

					<Form.Label>Cijena kupovine</Form.Label>
					<Form.Control
						type='text'
						placeholder='Cijena kupovine'
						{...register('buyPrice')}
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

export default CreateMovie;
