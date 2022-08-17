const mongoose = require('mongoose');

const certificateSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	certificateImage: { type: String, required: true },
	title: { type: String, required: true },
	artist: { type: String, required: true },
	year: { type: Number, required: false },
});

module.exports = mongoose.model('Certificate', certificateSchema);
