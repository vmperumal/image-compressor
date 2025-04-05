const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');
const path = require('path');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());

app.post('/compress', upload.single('image'), async (req, res) => {
  try {
    const compressedImage = await sharp(req.file.buffer)
      .resize({ width: 800 })
      .jpeg({ quality: 60 })
      .toBuffer();

    res.set('Content-Type', 'image/jpeg');
    res.send(compressedImage);
  } catch (err) {
    res.status(500).send('Compression failed');
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
