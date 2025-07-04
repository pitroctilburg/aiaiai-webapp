const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Routes voor deelnemers
app.post('/deelnemers', upload.single('photo'), async (req, res) => {
  const { naam, geboortedatum } = req.body;
  console.log(req.file.originalname);
  console.log(req.file.filename);
  try {
    const profielfoto = req.body.profielfoto || null;
    const result = await pool.query(
      "INSERT INTO deelnemers (naam, geboortedatum, registratietijd, profielfoto) VALUES (?, ?, NOW(), ?)",
      [naam, geboortedatum, profielfoto]
    );
    res.status(201).json({ id: Number(result.insertId) });
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

app.get('/deelnemers', async (req, res) => {
  try {
    const deelnemers = await pool.query("SELECT * FROM deelnemers");
    res.json(deelnemers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
