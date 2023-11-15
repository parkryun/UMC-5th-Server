// const express = require('express')   // common JS
import express from 'express';          // ES6
import { tempRouter } from './src/routes/temp.route.js';
import { response } from './config/response.js';
import { BaseError } from './config/error.js';
import { status } from "./config/response.status.js";

import { userRouter } from "./routes/user.route.js";
import { specs } from './config/swagger.config.js';
import SwaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express()

app.set('port', process.env.port || 3000)
app.use(cors());
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
    const err = new BaseError(status.NOT_FOUND);
    next(err);
});

// error handling
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    console.log("error", err);
    res.status(err.data.status).send(response(err.data));
});

//
app.use(express.urlencoded({extended: false})); // 단순 객체 문자열 형태로 본문 데이터 해석

// swagger
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));

// router setting
app.use('/user', userRouter)
app.use('/temp', tempRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
