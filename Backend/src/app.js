const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

// Loading the environmental variables
require('dotenv').config();
const port = process.env.PORT
const URI = process.env.MONGO_URI;

// Connecting the database to the application
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => app.listen(port, () => {
        console.log(`Connected to the database successfully with port ${port}`)
    }))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });

app.use('/api', authRoutes);
app.use('api/auth', authRoutes)