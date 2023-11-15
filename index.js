// const express = require('express')   // common JS
import express from 'express';          // ES6
import { tempRouter } from './src/routes/temp.route.js';
import { response } from './config/response.js';
import { BaseError } from './config/error.js';
import { status } from "./config/response.status.js";

const app = express()
const port = 3000

// app.get('/', function (req, res) {
//     res.send('Hello World')
// })

app.use('/temp', tempRouter);

app.use((req, res, next) => {
    const err = new BaseError(status.NOT_FOUND);
    next(err);
});

// error handling
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.data.status).send(response(err.data));

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
