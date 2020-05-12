const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const shortid = require('shortid');

const baseUrl = ''; // Your Domain Name


const app = express();
const mongoURI = ''; // Your MongoDB Key


const connectDB = async() => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected.....');
    } catch (e) {
        console.error(e.message);
        console.log("Refused to Connect");
    }
};
connectDB();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', async(req, res) => {
    res.render('index');
});

app.post('/shortUrls', async(req, res) => {
    let url = await ShortUrl.findOne({ full: req.body.fullUrl });
    if (url) {
        // console.log(url);
        return res.render('index', { shortUrl: url, baseUrl: baseUrl });
    }
    url = await ShortUrl.create({ full: req.body.fullUrl, short: shortid.generate() });
    // console.log(url);
    res.render('index', { shortUrl: url, baseUrl: baseUrl });
});

app.get('/:shortUrl', async(req, res) => {
    // console.log(req.params);s
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) return res.sendStatus(404);
    shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.full);
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, process.env.IP, () => {
    console.log(`Server started on port ${PORT}`);
});