const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const certificateRoutes = require('./routes/certificate');

mongoose.connect(
	`mongodb+srv://leonboakye:${process.env.PASSWORD}@cluster0.ehojffy.mongodb.net/?retryWrites=true&w=majority`
);

app.use(cors());

// logs request handler to terminal
app.use(morgan('dev'));

// allow you to parse the json data
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

// app.use(express.static(path.join(__dirname, '/client/build')));
// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
// });

// routes handling requests
app.use('/certificates', certificateRoutes);

app.use('/images', express.static('images'));

// app.use((req, res, next) => {
// 	res.header('Access-Controll-Allow-Origin', '*');
// 	res.header(
// 		'Acces-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
// 	);

// 	if (req.method === 'OPTIONS') {
// 		res.header('Access-Controll-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
// 		return res.status(200);
// 	}
// 	next();
// });

app.use((req, res, next) => {
	const error = new Error('The path you requested is not found');
	error.status = 400;
	next(error);
});

app.use((req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

const port = process.env.PORT || 2402;
app.listen(port, () => {
	console.log(`Listening to requests on port: ${port}...`);
});
