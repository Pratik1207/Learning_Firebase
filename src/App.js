import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList';
import UpdateStudent from './components/UpdateStudents';
import FacultyList from './components/FacultyList';
import AddFacultyList from './AddFacultyList';
import UpdateFaculty from './components/UpdateFaculty';

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
        <Routes>
          {/* Dashboard Layout with Persistent Nav */}
          <Route
            path="/"
            element={
              <Dashboard style={{ padding: '20px', textAlign: 'center', color: '#333' }} />
            }
          >
            <Route
              path="addstudent"
              element={
                <AddStudent style={{ padding: '20px', margin: '20px auto', maxWidth: '600px' }} />
              }
            />
            <Route
              path="studentlist"
              element={
                <StudentList style={{ padding: '20px', margin: '20px auto', maxWidth: '800px' }} />
              }
            />
            <Route
              path="updatestudent"
              element={
                <UpdateStudent style={{ padding: '20px', margin: '20px auto', maxWidth: '600px' }} />
              }
            />
            <Route
              path="facultylist"
              element={
                <FacultyList style={{ padding: '20px', margin: '20px auto', maxWidth: '800px' }} />
              }
            />
            <Route
              path="addfacultylist"
              element={
                <AddFacultyList style={{ padding: '20px', margin: '20px auto', maxWidth: '600px' }} />
              }
            />
            <Route
              path="updatefaculty"
              element={
                <UpdateFaculty style={{ padding: '20px', margin: '20px auto', maxWidth: '600px' }} />
              }
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
