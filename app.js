const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
// const baseUrl = 'http://localhost/5000/';


const app = express();
const mongoURI = 'mongodb+srv://blog:nilanjan@cluster0-ysai2.mongodb.net/test?retryWrites=true&w=majority';
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
    const shortUrls = await ShortUrl.find();
    res.render('index', { shortUrls: shortUrls });
});

app.post('/shortUrls', async(req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl });
    res.redirect('/');
});

app.get('/:shortUrl', async(req, res) => {
    console.log(req.params);
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