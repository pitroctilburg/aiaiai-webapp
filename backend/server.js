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

app.post('/deelnemers', async (req, res) => {
  const { naam, geboortedatum } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO deelnemers (naam, geboortedatum, registratietijd) VALUES (?, ?, NOW())",
      [naam, geboortedatum]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/deelnemers', async (req, res) => {
  try {
    const deelnemers = await pool.query("SELECT * FROM deelnemers");
    res.json(deelnemers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
