import React, { useState, useRef } from "react";

function Intake() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = new Date(birthdate).toISOString().split('T')[0];
      const response = await fetch('http://localhost:3001/deelnemers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ naam: name, geboortedatum: formattedDate }),
      });

      if (response.ok) {
        console.log("Deelnemer succesvol toegevoegd");
      } else {
        const errorData = await response.json();
        console.error("Fout bij het toevoegen van deelnemer:", errorData.error);
      }
    } catch (error) {
      console.error("Er is een fout opgetreden:", error);
    }
  };

  return (
    <div>
      <h1>Intake</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Birthdate:
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Intake;
