const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

//DB config
require('./config/db');
const app = express();

const poll = require('./routes/poll');

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
//Create application/ x-www-form-url encoded parser


//Enable cors middleware
app.use(cors());
app.use('/poll', poll);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started ${PORT}`))