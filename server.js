const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const routes = require('./routes/routes');
const cors = require('cors');

app.use(cors({
  origin: "http://localhost:4200"
}));

const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://salon_beaute_user:cEjuTZtOPCF3qVHi@cluster0.dne684n.mongodb.net/m1p10mean-lucas-kanto?retryWrites=true&w=majority');

// Handling MongoDB connection events
const db = mongoose.connection;
db.on('error', (error) => {
    console.error('Error connecting to DB:', error);
});

db.once('open', () => {
    console.log('Successfully connected to DB');
    
    // Start the server after successfully connecting to the database
    app.listen(PORT, () => {
        console.log('Server started on port ${PORT}');
    });
});

app.use(express.json());
app.use(routes);
