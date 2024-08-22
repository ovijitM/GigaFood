const express = require('express');
const mongoDb = require('./db'); // Ensure this is correct
const app = express();
const port = 2929;

// Connect to MongoDB
mongoDb();

// CORS Middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.use(express.json());


app.use('/api', require('./Routes/Createuser'));
app.use('/api', require('./Routes/Displaydata'));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
