const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes for each tab
app.post('/intake', async (req, res) => {
  // Logic for saving intake data
});

app.post('/station/:id', async (req, res) => {
  // Logic for saving data per station
});

app.get('/output/:participantId', async (req, res) => {
  // Logic for retrieving the total overview
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
