import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList';
import UpdateStudent from './components/UpdateStudents';

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard Layout with Persistent Nav */}
        <Route path="/" element={<Dashboard />}>
          <Route path="addstudent" element={<AddStudent />} />
          <Route path="studentlist" element={<StudentList />} />
          <Route path='updatestudent' element={<UpdateStudent/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
