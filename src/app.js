const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');

//settings
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//Midlewears
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

//Routes
app.use(require('./routes/index'));

//static
app.use(express.static(path.join(__dirname, 'public')));

//404
app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
})

module.exports = app;