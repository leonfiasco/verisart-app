import { useState } from 'react';
import Modal from '../Modal/Modal';

import styles from './styles.module.scss';

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = (boolean) => {
		setIsOpen(boolean);
	};

	return (
		<section className={styles.header}>
			<div className={styles.titleWrap}>
				<h1>verisart</h1>
				<div className={styles.hr} />
				<button onClick={() => setIsOpen(true)}>
					<p>add cetificate</p> ➕
				</button>
				<Modal open={isOpen} handleClose={handleClose} />
			</div>
		</section>
	);
};

export default Header;
