const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'client')));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//identificam quem está enviando as sending-notifications
const publicVapidKey = 'BDlY4vCbqI-eaYZ__VcVB67Z4e4kQA26w64CoMRpRdRXYY9KYQI92zqOKD_TBKXUYcmvON6mhHmKWhwpnNh6OXY';
const privateVapidKey = 'h1JrZ7wXhUkfU_OpK1tTQDSsV_3pX858UVUoU-NjCs4';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

//subscribe route
app.post('/subscribe', (req, res) => {
    //get push subscription object
    const subscription = req.body;

    //201 status - resource created
    res.status(201).json({});

    //create payload (opcional)
    const payload = JSON.stringify({title: 'Push test'});

    //Pass the object into sendNotification
    webpush.sendNotification(subscription, payload)
        .catch(err => console.err(err));
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));