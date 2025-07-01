import React, { useState, useRef } from "react";

function Intake() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Name:", name);
    console.log("Birthdate:", birthdate);
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
