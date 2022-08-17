import { useState, useEffect } from 'react';

import axios from 'axios';
import Modal from '../Modal/Modal';

import styles from './styles.module.scss';

const CertificateList = () => {
	const [certificate, setCertificate] = useState();
	const [name, setName] = useState();
	const [artistName, setArtist] = useState();
	const [date, setDate] = useState();
	const [id, setID] = useState();
	const [isOpen, setIsOpen] = useState(false);

	const fetchCertififcateData = async () => {
		const res = await axios.get('/certificates');
		setCertificate(res.data);
	};

	const handleClose = (boolean) => {
		setIsOpen(boolean);
	};

	useEffect(() => {
		fetchCertififcateData().catch((err) => {
			console.log(err);
		});
	}, []);

	const deleteCertificate = async (id) => {
		await axios.delete(`/certificates/${id}`);
		window.location.reload(false);
	};

	const handleUpdate = async (id, title, artist, year) => {
		setIsOpen(true);
		setName(title);
		setArtist(artist);
		setDate(year);
		setID(id);
	};

	const renderCerticate = () => {
		return certificate?.length ? (
			certificate.map((item) => {
				const { artist, certificateImage, title, _id, year } = item;

				return (
					certificateImage && (
						<li className={styles.listItem} key={_id}>
							<img src={`./${certificateImage}`} alt={title} />
							<div className={styles.overLay}>
								{title && <h3>{title}</h3>}
								<p>{`${artist && artist}, ${year && year}`}</p>
								<div className={styles.btnWrap}>
									<button onClick={() => handleUpdate(_id, title, artist, year)}>
										update
									</button>
									<button onClick={() => deleteCertificate(_id)}>delete</button>
								</div>
							</div>
						</li>
					)
				);
			})
		) : (
			<div className={styles.fallbackText}>
				<p>👆</p>
				<h1>Add Certificate</h1>
			</div>
		);
	};
	return (
		<section className={styles.certificateList}>
			<div className={styles.listContainer}>
				<ul>{renderCerticate()}</ul>
				<Modal
					open={isOpen}
					handleClose={handleClose}
					id={id}
					name={name}
					artistName={artistName}
					date={date}
					update={'true'}
				/>
			</div>
		</section>
	);
};

export default CertificateList;
