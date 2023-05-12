// const express = require('express');
// const app = express();
// const port = 3000;

// app.use(express.json());

// // Replace this with a database or another storage method
// const videoIds = new Set();

// app.post('/api/video', (req, res) => {
//   const videoId = req.body.videoId;
//   if (videoId) {
//     videoIds.add(videoId);
//     res.status(201).send({ message: 'Video ID added successfully.' });
//   } else {
//     res.status(400).send({ message: 'Invalid video ID.' });
//   }
// });

// app.get('/api/videos', (req, res) => {
//   res.send(Array.from(videoIds));
// });

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const csvWriter = require('csv-writer').createObjectCsvWriter;

app.use(express.json());

const csvFilePath = 'videoIds.csv';
const csvWriterInstance = csvWriter({
  path: csvFilePath,
  header: [{ id: 'videoId', title: 'Video ID' }]
});

let videoIds = [];

// Load existing video IDs from the CSV file
fs.readFile(csvFilePath, 'utf8', (err, data) => {
  if (!err) {
    const rows = data.split('\n');
    for (const row of rows) {
      if (row) {
        const videoId = row.split(',')[0];
        videoIds.push(videoId);
      }
    }
  }
});

app.post('/api/video', (req, res) => {
  const videoId = req.body.videoId;
  videoIds.push(videoId);
  csvWriterInstance.writeRecords([{ videoId: videoId }]);
  res.status(201).send({ message: 'Video ID added successfully.' });
});

app.get('/api/videos', (req, res) => {
  res.send(videoIds);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});