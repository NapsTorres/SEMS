import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { Card } from 'flowbite-react';

const Competitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newSport, setNewSport] = useState({ type: '', sportname: '', description: '' });
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { name: "Competitions", path: "/competitions" },
    { name: "Teams", path: "/teams" },
    { name: "Schedules", path: "/schedules" },
    { name: "Standings", path: "/standings" }
  ];

  useEffect(() => {
    axios.get('http://localhost:9000/api/sportlist/list')
      .then(response => {
        setCompetitions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the sports list!', error);
      });
  }, []);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (e) => {
    setNewSport({ ...newSport, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.post('http://localhost:9000/api/sportlist/create', newSport)
      .then(response => {
        setCompetitions([...competitions, response.data]);
        handleCloseModal();
      })
      .catch(error => {
        console.error('There was an error creating the sport!', error);
      })
      .finally(() => {
        setIsLoading(false);
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
          <button className="bg-blue-600 text-white py-2 px-4 rounded mb-4" onClick={handleOpenModal}>
            Add Sport
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {competitions.map(competition => (
              <Link to={`/sports/${competition.slug}`} key={competition.id} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="w-full rounded-t-lg h-32 md:h-auto md:w-24 m-2 md:rounded-none md:rounded-s-lg" src={competition.badge} alt={competition.sportname} />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{competition.sportname}</h3>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{competition.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Add Sport Modal"
            className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
            overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
          >
            <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
              <h2 className="text-2xl mb-4">Add New Sport</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1" htmlFor="type">Type</label>
                  <input
                    type="text"
                    id="type"
                    name="type"
                    value={newSport.type}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1" htmlFor="sportname">Sport Name</label>
                  <input
                    type="text"
                    id="sportname"
                    name="sportname"
                    value={newSport.sportname}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1" htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={newSport.description}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={handleCloseModal} className="bg-gray-600 text-white py-2 px-4 rounded mr-2">
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add Sport'}
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        </main>
      </div>
    </div>
  );
};

export default Competitions;
