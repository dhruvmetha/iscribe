const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/iscribe', {useNewUrlParser: true }).then(
    () => { console.log("Connected to database") },
    err => { console.log("Could not connect", err) }
    );
const app = express();

// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + 'public'));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/exam', require('./routes/exam'));
app.use('/api/upload', require('./routes/upload'))

module.exports = app;