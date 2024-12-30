import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Side Navigation */}
      <div
        style={{
          width: '20%',
          backgroundColor: '#333',
          color: '#fff',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', margin: '0 0 20px 0' }}>Side Nav</h1>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/addstudent" style={{ color: '#fff', textDecoration: 'none' }}>
              Add Student
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
          <Link to="/studentlist" style={{ color: '#fff', textDecoration: 'none' }}>
              Student List
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/addfacultylist" style={{ color: '#fff', textDecoration: 'none' }}>
              Add Faculty
            </Link>
          </li>          <li style={{ marginBottom: '10px' }}>
            <Link to="/facultylist" style={{ color: '#fff', textDecoration: 'none' }}>
              Faculty List
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#f4f4f4',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
