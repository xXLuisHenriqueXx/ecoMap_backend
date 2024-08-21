const cors = require('cors');
const express = require('express');
const router = require('./router');

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.static("public"));
app.use(express.json());
app.use(router);

module.exports = app;