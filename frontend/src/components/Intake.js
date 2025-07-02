import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { v4 as uuidv4 } from 'uuid';
import { Form, Button, Table, Container, Row, Col } from 'react-bootstrap';

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
      const formData = new FormData();
      formData.append('naam', name);
      formData.append('geboortedatum', new Date(birthdate).toISOString().split('T')[0]);
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
        setName("");
        setBirthdate("");
        setImage(null);
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
    <Container>
      <h1>Intake</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formName">
          <Form.Label column sm="2">Naam:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formBirthdate" className="mt-3">
          <Form.Label column sm="2">Geboortedatum:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm="12" className="d-flex justify-content-center position-relative">
            {image ? (
              <img src={image} alt="Captured" style={{ width: '640px', height: '480px', objectFit: 'cover' }} />
            ) : (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={640}
                height={480}
              />
            )}
            <Button
              variant="secondary"
              onClick={() => setImage(webcamRef.current.getScreenshot())}
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            >
              Capture Photo
            </Button>
          </Col>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="w-100 mt-3 mb-4"
          style={{ display: 'block', margin: '0 auto' }}
        >
          Submit
        </Button>
      </Form>
      <h2>Recent Toegevoegde Deelnemers</h2>
      <Table striped bordered hover>
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
              <td>{participant.naam}</td>
              <td>{new Date(participant.geboortedatum).toLocaleDateString('nl-NL')}</td>
              <td>{new Date(participant.registratietijd).toLocaleTimeString('nl-NL')}</td>
              <td>
                <button onClick={() => handleDelete(participant.id, participant.naam)}>Verwijder</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Intake;
