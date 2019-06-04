var express=require('express');
var bodyParser=require('body-parser');
const morgan = require('morgan');
var port=process.env.PORT||8000;
var app=express();
var Knex = require ('knex');
const knexConfig = require('./knexfile');
const Model = require('objection').Model;
const v1 = require('./routes/index');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);
Model.knex(knex);


app.use('/api/v1', v1);


app.listen(port,function(){
    console.log("listening on port:",port);
    })