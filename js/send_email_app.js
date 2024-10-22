const express = require('express');
const cors = require('cors')
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rahelly23@gmail.com',
    pass: 'kozf mtsx opek cdit' // Use an App Password for better security
  }
});

// Route to send email
app.post('/send-email', (req, res) => {
  const { to,subject,text  } = req.body;

  const mailOptions = {
    from: 'rahelly23@gmail.com',
    to: to,
    subject: subject, 
    text:text
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email.');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully!');
    }
  });
});

app.post('/send-reservation', (req, res) => {
  const { to,subject,text } = req.body;

  const mailOptions = {
    from: 'rahelly23@gmail.com',
    to: to,
    subject: subject, 
    text:text
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email.');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully!');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});