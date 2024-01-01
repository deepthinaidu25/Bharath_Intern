// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (Make sure to replace 'your_database' and 'your_password' with your actual MongoDB database name and password)
mongoose.connect('mongodb://localhost:27017/your_database', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a User schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));


// Serve the registration form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Handle form submissions
app.post('/register', async (req, res) => {
    try {
        // Create a new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        // Save the user to the database
        await newUser.save();

        res.send('Registration successful!');
    } catch (error) {
        res.status(500).send('Error registering user.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
