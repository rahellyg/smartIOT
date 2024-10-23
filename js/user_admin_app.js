const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors')
const app = express();
const PORT = 3000;


// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); // Serve static files from the public directory

// Endpoint to save user data
app.post('/register', (req, res) => {
    const newUser = req.body;

    // Read existing users from the JSON file
    fs.readFile('C:/Users/rgelfanb/Documents/GitHub/smartIOT/images/users.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }

        // Parse existing users and add the new user
        let users = JSON.parse(data || '[]');
        console.log(users)
        const existingUser = users.find(user => user.name === newUser.name);

        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        users.push(newUser);

        // Write updated users back to the file
        fs.writeFile('C:/Users/rgelfanb/Documents/GitHub/smartIOT/images/users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing file');
            }
            res.status(200).send('User registered successfully');
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
   
});
