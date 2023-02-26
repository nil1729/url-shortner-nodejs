if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const URL = require('./models/URL');
const shortid = require('shortid');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

// Database Connect
connectDB();

// Body Parser Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.set('view engine', 'ejs');

// Security
app.use(cors());

// Middleware Setup
app.use((req, res, next) => {
  req.baseUrl = `${req.protocol}://${req.get('host')}`;
  next();
});

// Create Short URL
app.post('/api/v2/shorten', async (req, res) => {
  try {
    const { longURL } = req.body;
    console.log(longURL);
    let url = await URL.findOne({ longURL });
    if (url) {
      return res.status(200).json({
        ...url._doc,
        shortURL: `${req.baseUrl}/${url.shortID}`,
      });
    }
    url = await URL.create({
      longURL,
      shortID: shortid.generate(),
    });
    res.status(200).json({
      ...url._doc,
      shortURL: `${req.baseUrl}/${url.shortID}`,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: 'Server Error',
    });
  }
});

// Clicks on ShortURLs
app.get('/:shortID', async (req, res) => {
  try {
    const { shortID } = req.params;
    let url = await URL.findOne({ shortID });
    if (!url) {
      return res.status(404).json({
        msg: 'No valid URLs found.',
      });
    }
    url.clicks++;
    await url.save();
    res.redirect(url.longURL);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: 'Server Error',
    });
  }
});

// Serve static  assets in Production
if (process.env.NODE_ENV === 'production') {
  // set Static Folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

// Server PORT Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
