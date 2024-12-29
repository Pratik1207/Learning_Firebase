import React, { useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import { app } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    uid: '',
    name: '',
    phone: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { uid, name, phone } = formData;

    if (!uid || !name || !phone) {
      alert('All fields are required!');
      return;
    }

    const db = getDatabase(app);
    set(ref(db, 'students/' + uid), {
      name: name,
      phone: phone,
    })
    console.log("added successfully");

    navigate("/studentlist")
    
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Add Student</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <div>
          <label
            htmlFor="uid"
            style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
          >
            Unique ID:
          </label>
          <input
            type="text"
            id="uid"
            name="uid"
            value={formData.uid}
            onChange={handleChange}
            placeholder="Enter unique ID"
            required
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>
        <div>
          <label
            htmlFor="name"
            style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
            required
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
          >
            Phone Number:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            color: '#fff',
            backgroundColor: '#007BFF',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#007BFF')}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
