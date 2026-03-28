const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'your_secret_key'; // Change this in production

app.use(bodyParser.json());

// In-memory user storage (for demonstration purposes)
let users = [];
let loggedInUsers = [];

// Homepage route
app.get('/', (req, res) => {
    res.send('Welcome to the Express Server!');
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) return res.status(401).send('User not found.');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send('Password is incorrect.');

    const token = jwt.sign({ username: user.username }, SECRET_KEY);
    loggedInUsers.push(user.username);
    res.json({ token });
});

// Admin Dashboard route
app.get('/admin', (req, res) => {
    // Authentication check logic goes here
    res.send('Welcome to the Admin Dashboard!');
});

// Credits management route
app.get('/credits', (req, res) => {
    // Logic for credits management goes here
    res.send('Manage your credits here.');
});

// User management route
app.get('/users', (req, res) => {
    // Logic for user management goes here
    res.send('Manage users here.');
});

// Theme customization route
app.get('/theme', (req, res) => {
    // Logic for theme customization goes here
    res.send('Customize your theme here.');
});

// Register a new user (for demo purpose)
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).send('User registered successfully.');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
