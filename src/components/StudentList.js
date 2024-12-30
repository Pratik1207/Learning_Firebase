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
      setStudentData(data);
    });
  }, []);

  function handleDelete(key) {
    const db = getDatabase(app);
    const studentRef = ref(db, 'students/' + key);
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
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Student List</h2>
      {studentData && (
        <div>
          {Object.entries(studentData).map(([key, value]) => (
            <div
              key={key}
              style={{
                backgroundColor: '#f8f9fa',
                padding: '15px',
                marginBottom: '20px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Name: <span style={{ fontWeight: 'normal' }}>{value.name}</span></p>
              <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Phone Number: <span style={{ fontWeight: 'normal' }}>{value.phone}</span></p>
              <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleDelete(key)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#ff4d4d",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    transition: "background-color 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#cc0000")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4d4d")}
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate('/updatestudent', { state: [key, value] })}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    transition: "background-color 0.3s, transform 0.3s",
                }}
                onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#218838";
                    e.target.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#28a745";
                    e.target.style.transform = "scale(1)";
                }}
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {!studentData && <p style={{ textAlign: 'center', color: '#999' }}>No students found.</p>}
    </div>
  );
};

export default StudentList;
