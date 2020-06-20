const express = require('express');
const app = express();
const URL = require('./models/URL');
const shortid = require('shortid');
const connectDB = require('./config/db');
const cors = require('cors');

// Database Connect 
connectDB();

// Body Parser Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Security
app.use(cors());

// Middleware Setup
app.use((req, res, next)=> {
    req.baseUrl = `${req.protocol}://${req.get('host')}`;
    next();  
});

// Create Short URL
app.post('/shorten', async(req, res) => {
     try {
        const {longURL} = req.body;
        let url = await URL.findOne({longURL});
        if (url) {
            return  res.status(200).json({
                ...url._doc,
                shortURL: `${req.baseUrl}/${url.shortID}`,
            });
        }
        url = await URL.create({ 
            longURL, 
            shortID: shortid.generate()
        });
        res.status(200).json({
            ...url._doc,
            shortURL: `${req.baseUrl}/${url.shortID}`,
        });
     } catch (e) {
        console.log(e);
        return res.status(500).json({
              msg: 'Server Error'
        });
     }
});


// Clicks on ShortURLs
app.get('/:shortID', async(req, res) => {
    try {
        const {shortID} = req.params;
        let url = await URL.findOne({shortID});
        if(!url){
            return res.status(404).json({
                msg: 'No valid URLs found.'
            });
        }
        url.clicks++;
        await url.save();
        res.redirect(url.longURL);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg:'Server Error'
        });   
    }
});

// Server PORT Setup
const PORT = process.env.PORT || 4000;
app.listen(PORT, process.env.IP, () => {
    console.log(`Server started on port ${PORT}`);
});