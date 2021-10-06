/** @format */

import { Modal, Button } from 'react-bootstrap';
import { reservationsServices } from '../../Services/reservationsServices';
const DeleteModal = ({ show, setShow, deleteId, setUpdate }) => {
	const handleClose = () => setShow(false);

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Jeste li sigurni?</Modal.Title>
			</Modal.Header>
			<Modal.Body>Izbrišite rezervaciju</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={handleClose}>
					Close
				</Button>
				<Button
					variant='danger'
					onClick={() => {
						reservationsServices
							.remove(deleteId)
							.then(res => {
								setUpdate(new Date());
								setShow(false);
							})
							.catch(err => console.log(err));
					}}>
					Potvrdi
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default DeleteModal;
