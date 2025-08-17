const express = require('express');
const cors = require('cors'); // ✅ import cors
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;

const dbConnect = require('./db');
dbConnect();

// ✅ Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your React frontend
    credentials: true
}));

app.use(express.json()); // ✅ This must come before your routes

// Your routes
const createuser = require('./routes/CreateUser');
const displaydata = require('./routes/DisplayData')
const orderData = require('./routes/OrderData')
app.use('/api', createuser);
app.use('/api', displaydata);
app.use('/api', orderData);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
