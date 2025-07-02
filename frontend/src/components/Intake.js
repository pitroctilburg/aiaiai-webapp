import React, { useState, useEffect } from "react";

function Intake() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState('');

  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch('http://localhost:3001/deelnemers');
        if (response.ok) {
          const data = await response.json();
          setParticipants(data.slice(-10).reverse());
        }
      } catch (error) {
        console.error("Er is een fout opgetreden bij het ophalen van deelnemers:", error);
      }
    };

    fetchParticipants();
  }, []);

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
      fetchParticipants(); // Refresh the list after adding a new participant
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
      <h2>Recent Toegevoegde Deelnemers</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Naam</th>
            <th>Geboortedatum</th>
            <th>Registratietijd</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant.id}>
              <td>{participant.id}</td>
              <td>{participant.naam}</td>
              <td>{participant.geboortedatum}</td>
              <td>{participant.registratietijd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Intake;
