import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Kanban from './pages/Kanban';
import ThemeContextProvider from './ThemeContext';

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <CssBaseline />
        <Navbar />
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/kanban" element={<Kanban />} />
          </Routes>
        </div>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;


