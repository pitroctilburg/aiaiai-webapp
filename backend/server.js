const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// Routes voor deelnemers
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

app.delete('/deelnemers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM deelnemers WHERE id = ?", [id]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Deelnemer succesvol verwijderd" });
    } else {
      res.status(404).json({ error: "Deelnemer niet gevonden" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
  try {
    const deelnemers = await pool.query("SELECT * FROM deelnemers");
    res.json(deelnemers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
