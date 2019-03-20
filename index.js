'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const express = require('express');
const app = express();

const demoSchema = new Schema({
    test: String,
    more: Number,
});

const Demo = mongoose.model('Demo', demoSchema);

// if mongoose < 5.x, force ES6 Promise
// mongoose.Promise = global.Promise;
//mongodb://myTester:xyz123@localhost:27019/demo
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/subscribe?authSource=admin`).then(() => {
    console.log('Connected successfully. This shit workings?');
    app.listen(process.env.APP_PORT);

}, err => {
    console.log('Connection to db failed: ' + err);
});

app.get('/', (req, res) => {
    Demo.create({ test:'More data', more: 7}).then(post => {
        console.log(post.id);
        res.send('Created dummy data! ' + post.id);
    });
});

app.get('/all', (req, res) => {
    Demo.find().then(all => {
       console.log(all);
       res.send(all);
    });
});