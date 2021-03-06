require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 5000 || process.env.PORT;
const api = require('./src/api/routes/index');
const connectDatabase = require('./src/api/configs/db.config');
const createError = require('http-errors');
const cors = require('cors');
connectDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', api);

app.use((req, res, next) => {
    next(new createError(404, 'NOT FOUND'));
});

app.use((error, req, res, next) => {
    let { statusCode, message } = error;

    statusCode = statusCode ? statusCode : 500;

    res.status(statusCode).json({
        statusCode,
        message,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
