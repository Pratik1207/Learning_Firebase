import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { useEffect, useState } from 'react';
import { app } from '../firebaseConfig';
import { useNavigate, useLocation } from 'react-router-dom';

const StudentList = () => {
  const [studentData, setStudentData] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const db = getDatabase(app);
    const studentRef = ref(db, 'students');
    onValue(studentRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setStudentData(data);
    });
  }, []);

  function handleDelete(key) {
    const db = getDatabase(app);
    const studentRef = ref(db, 'students/' + key); // Fixed reference path
    remove(studentRef)
      .then(() => {
        alert('Student deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting student:', error);
      });
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Student List</h2>
      {studentData && (
        <div>
          {
            Object.entries(studentData).map(([key, value]) => {
              return (
                <div key={key} style={{
                  backgroundColor: '#f4f4f4', padding: '15px', marginBottom: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Name:</span>
                    <span style={{ fontSize: '1.2rem', color: '#555' }}>{value.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Phone Number:</span>
                    <span style={{ fontSize: '1.2rem', color: '#555' }}>{value.phone}</span>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(key)}
                    style={{
                      marginTop: '15px',
                      padding: '8px 16px',
                      backgroundColor: '#ff4d4d',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      transition: 'background-color 0.3s',
                      marginRight: '10px', // Add some space between the buttons
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#cc0000')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#ff4d4d')}
                  >
                    Delete
                  </button>

                  {/* Update Button */}
                  <button
                    onClick={() => navigate("/updatestudent", { state: [key, value] })}
                    style={{
                      marginTop: '15px',
                      padding: '8px 16px',
                      backgroundColor: '#28a745',  // Green background for the update button
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      transition: 'background-color 0.3s, transform 0.3s',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#218838';  // Darker green on hover
                      e.target.style.transform = 'scale(1.05)';  // Slight scaling effect on hover
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#28a745';  // Original green
                      e.target.style.transform = 'scale(1)';  // Reset scaling
                    }}
                  >
                    Update
                  </button>
                </div>
              );
            })
          }
        </div>
      )}
    </div>
  );
}

export default StudentList;
