// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Competitions from './components/Competitions';
import Teams from './components/Teams';
import Schedules from './components/Schedules';
import Standings from './components/Standings';
import BracketSample from './components/BasketballBracket';
import BasketballDetail from './components/BasketballDetail';
import VolleyballDetail from './components/VolleyballDetail';
import VolleyballBracket from './components/VolleyballBracket';
import SoccerDetail from './components/SoccerDetail';
import SoccerBracket from './components/SoccerBracket';
import BadmintonDetail from './components/BadmintonDetail';
import BadmintonBracket from './components/BadmintonBracket';
import TeamDetail from './components/TeamDetail';
import MatchDetails from './components/BasketballMatchDetails';
import ViewerMatchDetails from './components/BasketballViewer';
import VolleyballMatchDetails from './components/VolleyballMatchDetails';
import VolleyballViewerMatchDetails from './components/VolleyballViewer';
import AdminPanel from './components/admin/AdminPanel';


const App = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/competitions" element={isAuthenticated ? <Competitions /> : <Navigate to="/login" />} />
        <Route path="/teams" element={isAuthenticated ? <Teams /> : <Navigate to="/login" />} />
        <Route path="/schedules" element={isAuthenticated ? <Schedules /> : <Navigate to="/login" />} />
        <Route path="/standings" element={isAuthenticated ? <Standings /> : <Navigate to="/login" />} />
        <Route path="/basketball-bracket" element={isAuthenticated ? <BracketSample /> : <Navigate to="/login" />} />
        <Route path="/sports/basketball" element={isAuthenticated ? <BasketballDetail /> : <Navigate to="/login" />} />
        <Route path="/sports/volleyball" element={isAuthenticated ? <VolleyballDetail /> : <Navigate to="/login" />} />
        <Route path="/volleyball-bracket" element={isAuthenticated ? <VolleyballBracket /> : <Navigate to="/login" />} />
        <Route path="/sports/soccer" element={isAuthenticated ? <SoccerDetail /> : <Navigate to="/login" />} />
        <Route path="/soccer-bracket" element={isAuthenticated ? <SoccerBracket /> : <Navigate to="/login" />} />
        <Route path="/sports/badminton" element={isAuthenticated ? <BadmintonDetail /> : <Navigate to="/login" />} />
        <Route path="/badminton-bracket" element={isAuthenticated ? <BadmintonBracket /> : <Navigate to="/login" />} />
        <Route path="/teams/:slug" element={isAuthenticated ? <TeamDetail /> : <Navigate to="/login" />} />
        <Route path="/match/:id" element={isAuthenticated ? <MatchDetails /> : <Navigate to="/login" />} />
        <Route path="/match/view/:id" element={isAuthenticated ? <ViewerMatchDetails /> : <Navigate to="/login" />} />
        <Route path="/volleyball-match/:id" element={isAuthenticated ? <VolleyballMatchDetails /> : <Navigate to="/login" />} />
        <Route path="/volleyball-match/view/:id" element={isAuthenticated ? <VolleyballViewerMatchDetails /> : <Navigate to="/login" />} />
        <Route path="/admin" element={isAuthenticated ? <AdminPanel /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
