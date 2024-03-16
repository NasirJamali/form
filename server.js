const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

// Middleware to parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route to handle form submission
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'nasirjamali789@gmail.com', // Your Gmail email address
            pass: 'Jamali786@' // Your Gmail password
        }
    });

    // Recipient's email address
    const recipientEmail = 'nasirjamali789@gmail.com';

    // Email message options
    const mailOptions = {
        from: email, // Sender's email address
        to: recipientEmail, // Recipient's email address
        subject: 'New Message from Contact Form',
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            // Send success response with a message
            res.status(200).send('Message sent successfully!');
        }
    });
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
