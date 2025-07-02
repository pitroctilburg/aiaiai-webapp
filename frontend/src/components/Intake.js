import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { v4 as uuidv4 } from 'uuid';

function Intake() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState('');

  const [participants, setParticipants] = useState([]);
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

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

  useEffect(() => {

    fetchParticipants();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = new Date(birthdate).toISOString().split('T')[0];
      const formData = new FormData();
      formData.append('naam', name);
      formData.append('geboortedatum', formattedDate);
      if (image) {
        const blob = await fetch(image).then(res => res.blob());
        const photoFilename = `${uuidv4()}.jpg`;
        formData.append('photo', blob, photoFilename);
        formData.append('profielfoto', photoFilename);
      }

      const response = await fetch('http://localhost:3001/deelnemers', {
        method: 'POST',
        body: formData,
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

  const handleDelete = async (id, name) => {
    if (window.confirm(`Weet je zeker dat je ${name} wil verwijderen?`)) {
      try {
        const response = await fetch(`http://localhost:3001/deelnemers/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log("Deelnemer succesvol verwijderd");
          fetchParticipants(); // Refresh the list after deletion
        } else {
          console.error("Fout bij het verwijderen van deelnemer");
        }
      } catch (error) {
        console.error("Er is een fout opgetreden:", error);
      }
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
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={320}
            height={240}
          />
          <button type="button" onClick={() => setImage(webcamRef.current.getScreenshot())}>
            Capture Photo
          </button>
        </div>
        <button type="submit">Submit</button>
        {image && <img src={image} alt="Captured" />}
      </form>
      <h2>Recent Toegevoegde Deelnemers</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Naam</th>
            <th>Geboortedatum</th>
            <th>Registratietijd</th>
            <th>Acties</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant.id}>
              <td>{participant.id}</td>
              <td>
                {participant.profielfoto && (
                  <img
                    src={`http://localhost:3001/uploads/${participant.profielfoto}`}
                    alt="Profielfoto"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                )}
              </td>
              <td>{new Date(participant.geboortedatum).toLocaleDateString('nl-NL')}</td>
              <td>{new Date(participant.registratietijd).toLocaleTimeString('nl-NL')}</td>
              <td>
                <button onClick={() => handleDelete(participant.id, participant.naam)}>Verwijder</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Intake;
