const express = require('express')
const sendMail = require('./mail')
const app = express();
const path = require('path')

const PORT = 8080;
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
    extended: false
}));

app.use(express.json());

app.post('/email', (req, res) => {
    //TODO
    //send email here
    const { name, email, text } = req.body;
    console.log('Data: ', req.body)

    sendMail(email, name, text, function(err,data) {
        if (err) {
            res.status(500).json({ message: 'Internal Error' })
        } else {
            res.json({ message: 'Email sent!' })
        }
    });

});

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'views','index.html'));
})

app.get('/index-en', (req,res) => {
    res.sendFile(path.join(__dirname, 'views','index-en.html'));
})

app.get('/index-es', (req,res) => {
    res.sendFile(path.join(__dirname, 'views','index-es.html'));
})

app.listen(PORT, () => {
    console.log('Server is starting on PORT, ', 8080);
});
