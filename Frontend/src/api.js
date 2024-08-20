import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:9000/api',
});

export const fetchUsers = () => API.get('/users');
export const fetchSports = () => API.get('/sportsList');
export const fetchStandings = () => API.get('/standings');
export const fetchTeams = () => API.get('/teams');
export const fetchMatches = () => API.get('/matches');
export const fetchParticipants = () => API.get('/participants');
export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const registerUser = (credentials) => API.post('/auth/register', credentials);