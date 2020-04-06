const express = require('express');
const path = require('path');
const cors = require('cors')
const methodOverride = require('method-override')
const logger = require('morgan');
require('./config/database')


const usersRouter = require('./routes/users');
const notesRouter = require('./routes/notes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/notes', notesRouter);

module.exports = app;
