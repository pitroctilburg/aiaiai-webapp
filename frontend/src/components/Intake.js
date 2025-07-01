import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Intake() {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Name:', name);
    console.log('Birthdate:', birthdate);
  };

  return (
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
          <DatePicker
            selected={birthdate}
            onChange={(date) => setBirthdate(date)}
            dateFormat="yyyy/MM/dd"
            required
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
    <div>
      <h1>Intake</h1>
      {/* Add form and logic for intake data */}
    </div>
  );
}

export default Intake;
