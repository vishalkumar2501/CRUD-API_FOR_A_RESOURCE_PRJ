const express = require('express');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('api/auth', )






module.exports = app;
