const cors = require('cors');
const express = require('express');
const router = require('./router');

const app = express();

app.use(cors({
    origin: '*'
}));
app.use('/public', express.static('public'));
app.use(express.json());
app.use(router);

module.exports = app;