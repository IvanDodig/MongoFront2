/** @format */

import { Modal, Button } from 'react-bootstrap';
import { commentsServices } from '../../Services/commentsServices';

const DeleteModal = ({ show, setShow, deleteId, setUpdate }) => {
	const handleClose = () => setShow(false);

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Jeste li sigurni?</Modal.Title>
			</Modal.Header>
			<Modal.Body>Izbrišite komentar</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={handleClose}>
					Close
				</Button>
				<Button
					variant='danger'
					onClick={() => {
						commentsServices
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
