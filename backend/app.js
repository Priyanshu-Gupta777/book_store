const express = require('express');
const app = express();
const User = require('./routes/user.js');
const bodyParser = require('body-parser');
const Book = require('./routes/book.js');
const Favourite = require('./routes/favourite.js');
const Cart = require('./routes/cart.js');
const Order = require('./routes/orders.js');
const cors = require('cors');

require('dotenv').config();
require('./connection/conn.js');

const PORT = process.env.PORT || 1000;

//app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/sign',User);
app.use('/api/book',Book);
app.use('/api/favourite',Favourite);
app.use('/api/cart',Cart);
app.use('/api/order',Order);
 

app.listen(PORT, ()=>{console.log(`Server started at ${PORT} `)});

//process.env .PORT ${process.env.PORT}`