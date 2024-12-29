import React, { useState } from 'react';
import { getDatabase, ref, set, update } from 'firebase/database';
import { app } from '../firebaseConfig';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateStudent = () => {

    const navigate = useNavigate();
    const location = useLocation();
  const [formData, setFormData] = useState({
    uid: location.state[0],
    name: location.state[1].name,
    phone: location.state[1].phone,
  });

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
    const studentRef = ref(db,'students/'+location.state[0]);
    update(studentRef,{
        name:name,
        phone : phone 
    }).then(() => {
        navigate("/studentlist"); // Navigate to the student list after successful update
    })
    .catch((err) => {
        console.log(err); // Handle errors
    });
    
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
          disabled
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
            padding: '12px 24px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: '#28a745', // Green background for success
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.3s',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#218838'; // Darker green on hover
            e.target.style.transform = 'scale(1.05)'; // Slight scaling effect on hover
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#28a745'; // Original green
            e.target.style.transform = 'scale(1)'; // Reset scaling
          }}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateStudent;
