require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 5000 || process.env.PORT;
const Route = require('./src/api/routes/index');
const connectDatabase = require('./src/api/configs/db.config');
const createError = require('http-errors');
app.use(express.json());
connectDatabase();

app.use('/api/v1', Route);

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
