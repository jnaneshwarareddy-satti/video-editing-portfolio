import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ShortForm from './pages/ShortForm';
import LongForm from './pages/LongForm';
import Login from './pages/Login';
import Admin from './pages/Admin';
import KyndallPitch from './pages/KyndallPitch';
import ThinkBeautifulPitch from './pages/ThinkBeautifulPitch';
import MizanaReactsPitch from './pages/MizanaReactsPitch';
import BennettMeltPitch from './pages/BennettMeltPitch';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/short-form" element={<ShortForm />} />
            <Route path="/long-form" element={<LongForm />} />
            <Route path="/kyndall" element={<KyndallPitch />} />
            <Route path="/think-beautiful" element={<ThinkBeautifulPitch />} />
            <Route path="/mizana-reacts" element={<MizanaReactsPitch />} />
            <Route path="/bennett-melt" element={<BennettMeltPitch />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
