const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const routes = require('./routes/routes');
const cors = require('cors');
const path = require('path');
const Notification = require('./src/email/Notification'); 
app.use(cors({
  origin: "http://localhost:4200"
}));

const PORT = 3000;

mongoose.connect('mongodb+srv://salon_beaute_user:cEjuTZtOPCF3qVHi@cluster0.dne684n.mongodb.net/m1p10mean-lucas-kanto?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on('error', (error) => {
    console.error('Error connecting to DB:', error);
});

db.once('open', () => {
    console.log('Successfully connected to DB');
    app.listen(PORT, () => {
        console.log('Server started on port '+PORT);
    });
});
app.use(express.static("frontend"));
app.use(express.json());
app.use(express.static('uploads/images'));
app.use(routes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
  });
  
  
Notification.scheduleEmail();