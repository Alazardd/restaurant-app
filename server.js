const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./database/db.js');
const authRoutes = require('./routes/auth');


// middleware to access req obj , res obj 
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

 connectDB();

 app.get('/', (req, res) => {
     res.send('Inside server');
 });

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('listening on port', port));