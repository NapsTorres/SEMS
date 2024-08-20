import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [filteredStandings, setFilteredStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sportType, setSportType] = useState(''); // State for selected sport type
  const [sportTypes, setSportTypes] = useState([]); // State for unique sport types

  const tabs = [
    { name: "Competitions", path: "/competitions" },
    { name: "Teams", path: "/teams" },
    { name: "Schedules", path: "/schedules" },
    { name: "Standings", path: "/standings" }
  ];

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/standings');
        if (response.ok) {
          const data = await response.json();
          setStandings(data);
          setFilteredStandings(data);
          // Extract unique sport types
          const uniqueSportTypes = Array.from(new Set(data.map(item => item.sportType)));
          setSportTypes(uniqueSportTypes);
        } else {
          console.error('Failed to fetch standings:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching standings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  useEffect(() => {
    if (sportType === '') {
      setFilteredStandings(standings);
    } else {
      setFilteredStandings(standings.filter(standing => standing.sportType === sportType));
    }
  }, [sportType, standings]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sports Competitions</h1>
        <div>
          <button
            className="bg-white text-blue-600 py-2 px-4 rounded"
            onClick={() => {
              localStorage.removeItem('isAuthenticated');
              window.location.href = '/login';
            }}
          >
            Logout
          </button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="bg-gray-100 w-64 p-4">
          <ul>
            {tabs.map((tab, index) => (
              <li key={index} className="mb-4">
                <Link to={tab.path} className="text-blue-600 font-bold">{tab.name}</Link>
              </li>
            ))}
          </ul>

        </aside>
        <main className="container flex-1 p-4 mx-auto">
        <div className="mt-4 max-w-sm ml-4">
            <label htmlFor="sportType" className="block text-gray-700 font-bold mb-2">Filter</label>
            <select
              id="sportType"
              value={sportType}
              onChange={(e) => setSportType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All</option>
              {sportTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {filteredStandings.length > 0 ? (
              filteredStandings.map((standing) => (
                <div key={standing.id} className="bg-white shadow-md rounded-lg p-4 border-b-4 border-blue-500">
                  <h3 className="text-xl font-semibold mb-2">{standing.teamName}</h3>
                  <p className="text-gray-700 mb-1"><strong>Sport Type:</strong> {standing.sportType}</p>
                  <p className="text-gray-700 mb-1"><strong>Score:</strong> {standing.score}</p>
                  <p className="text-gray-700 mb-1"><strong>Season:</strong> {standing.season}</p>
                  <p className="text-gray-700 mb-1"><strong>College:</strong> {standing.collegeName}</p>
                </div>
              ))
            ) : (
              <p>No standings available.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Standings;
