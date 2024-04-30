// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = [];

exports.signup = async (req, res) => {
    const { username, password } = req.body;

    // Check if username already exists
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the user in the database (in memory for this example)
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully' });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    // Find the user by username
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    if (await bcrypt.compare(password, user.password)) {
        // Passwords match, generate JWT token
        const token = jwt.sign({ username }, 'secretkey', { expiresIn: '1h' });
        return res.json({ message: 'Login successful', token });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
};
