import { useState } from 'react';
import axios from 'axios';

import './styles.module.scss';

const Form = ({ handleClose, update, id, artTitle, name, date }) => {
	const [title, setTitle] = useState(artTitle);
	const [artist, setArtist] = useState(name);
	const [year, setYear] = useState(date);
	const [certificateImage, setCertificateImage] = useState();
	const [formError, setFormError] = useState();

	const handleSubmit = async (e) => {
		if (title.length === 0 || artist.length === 0 || year.length === 0) {
			setFormError(true);
		}

		const formData = new FormData();
		formData.append('image', certificateImage);

		const newCertificate = { title, artist, year };
		if (update !== 'true') {
			formData.append('data', JSON.stringify(newCertificate));
			const res = await axios.post('certificates/add-certificate', formData);
			if (res.status === 201) {
				handleClose(false);
			}
		} else {
			const res = await axios.patch('certificates/' + id, newCertificate);
			if (res.status === 201) {
				handleClose(false);
				window.location.reload();
			}
		}
	};
	function handleChange(event) {
		setCertificateImage(event.target.files[0]);
	}

	return (
		<div className='container'>
			<form onSubmit={handleSubmit}>
				{update ? (
					<>
						<input
							type='text'
							id='title'
							name='title'
							placeholder='Title...'
							onChange={(e) => setTitle(e.target.value)}
						/>
						{formError && title.length <= 0 ? (
							<label>Title cannot be empty</label>
						) : null}
						<input
							type='text'
							id='artist'
							name='artist'
							placeholder='Artist...'
							onChange={(e) => setArtist(e.target.value)}
						/>
						{formError && artist.length <= 0 ? (
							<label>Artist cannot be empty</label>
						) : null}
					</>
				) : (
					<>
						<input
							type='text'
							id='title'
							name='title'
							placeholder='Title...'
							onChange={(e) => setTitle(e.target.value)}
						/>
						{formError && title.length <= 0 ? (
							<label>Title cannot be empty</label>
						) : null}
						<input
							type='text'
							id='artist'
							name='artist'
							placeholder='Artist...'
							onChange={(e) => setArtist(e.target.value)}
						/>
						{formError && artist.length <= 0 ? (
							<label>Artist cannot be empty</label>
						) : null}
						<input
							type='text'
							id='year'
							name='year'
							placeholder='Year...'
							onChange={(e) => setYear(e.target.value)}
						/>

						<input className='fileInput' type='file' onChange={handleChange} />
					</>
				)}

				<input type='submit' value='Submit' />
			</form>
		</div>
	);
};

export default Form;
