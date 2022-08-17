import Form from '../Form/Form';

import styles from './styles.module.scss';

const Modal = ({ open, update, handleClose, id, name, artistName, date }) => {
	if (!open) return null;
	return (
		<>
			<div className={styles.overLay} />
			<div className={styles.modal}>
				<div className={styles.closeBtn}>
					<button onClick={() => handleClose(false)}>❌</button>
				</div>
				<Form
					handleClose={handleClose}
					id={id}
					update={update}
					name={name}
					artistName={artistName}
					date={date}
				/>
			</div>
		</>
	);
};

export default Modal;
