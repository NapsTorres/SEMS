import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import slugify from 'slugify';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: '', logo: '', collegename: '', slug: '' });
  const [isLoading, setIsLoading] = useState(false); // Loader state

  const tabs = [
    { name: "Competitions", path: "/competitions" },
    { name: "Teams", path: "/teams" },
    { name: "Schedules", path: "/schedules" },
    { name: "Standings", path: "/standings" }
  ];

  useEffect(() => {
    axios.get('http://localhost:9000/api/teams/list')
      .then(response => {
        setTeams(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the teams list!', error);
      });
  }, []);

  const handleOpenTeamModal = () => {
    setIsTeamModalOpen(true);
  };

  const handleCloseTeamModal = () => {
    setIsTeamModalOpen(false);
  };

  const handleTeamChange = (e) => {
    const { name, value } = e.target;
    const updatedTeam = { ...newTeam, [name]: value };
    if (name === 'name') {
      updatedTeam.slug = slugify(value, { lower: true });
    }
    setNewTeam(updatedTeam);
  };

  const handleTeamSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loader
    axios.post('http://localhost:9000/api/teams/create', newTeam)
      .then(response => {
        setTeams([...teams, response.data]);
        handleCloseTeamModal();
      })
      .catch(error => {
        console.error('There was an error creating the team!', error);
      })
      .finally(() => {
        setIsLoading(false); // Stop loader
      });
  };

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
        <main className="flex-1 p-4">
          <div>
            <button className="bg-blue-600 text-white py-2 px-4 rounded mb-6" onClick={handleOpenTeamModal}>
              Add Team
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teams.map(team => (
                <Link to={`/teams/${team.slug}`} key={team.id}>
                    <div key={team.id} className="bg-white p-4 rounded shadow hover:shadow-lg border-b-4 border-blue-500 transition-shadow flex items-center">
                  <img src={team.logo} alt={team.name} className="w-16 h-16 mr-4"/>
                  <h3 className="text-lg font-bold">{team.collegename}</h3>
                </div>
                </Link>
                
              ))}
            </div>

            <Modal
              isOpen={isTeamModalOpen}
              onRequestClose={handleCloseTeamModal}
              contentLabel="Add Team Modal"
              className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
              overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
            >
              <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
                <h2 className="text-2xl mb-4">Add New Team</h2>
                <form onSubmit={handleTeamSubmit}>
                  <div className="mb-4">
                    <label className="block mb-1" htmlFor="name">Team Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newTeam.name}
                      onChange={handleTeamChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1" htmlFor="logo">Logo URL</label>
                    <input
                      type="text"
                      id="logo"
                      name="logo"
                      value={newTeam.logo}
                      onChange={handleTeamChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1" htmlFor="collegename">College Name</label>
                    <input
                      type="text"
                      id="collegename"
                      name="collegename"
                      value={newTeam.collegename}
                      onChange={handleTeamChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button type="button" onClick={handleCloseTeamModal} className="bg-gray-600 text-white py-2 px-4 rounded mr-2">
                      Cancel
                    </button>
                    <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded" disabled={isLoading}>
                      {isLoading ? 'Adding...' : 'Add Team'}
                    </button>
                  </div>
                </form>
              </div>
            </Modal>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Teams;
