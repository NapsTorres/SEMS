import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const VolleyballDetail = () => {
  const { slug } = useParams();
  const [sport, setSport] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [archive , setArchive] = useState([]);
  const [teams, setTeams] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bulkModalIsOpen, setBulkModalIsOpen] = useState(false);
  const [newMatch, setNewMatch] = useState({
                                    matchId: '',
                                    team1Id: '',
                                    team2Id: '',
                                    sporttype: '',
                                    date: '',
                                    status: 'scheduled',
                                    elimination: 'single',
                                    tournamentRoundText: ''
                                });
    const [bulkTeams, setBulkTeams] = useState({
        match1_team1: '',
        match1_team2: '',
        match1_date: '',
        match2_team1: '',
        match2_team2: '',
        match2_date: '',
        match3_team1: '',
        match3_team2: '',
        match3_date: '',
        match4_team1: '',
        match4_team2: '',
        match4_date: ''
        });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
    axios.get('http://localhost:9000/api/volleyball/list')
        .then(response => {
        console.log('Matches List Response:', response.data);
        const filteredMatches = response.data.filter(match => match.team1Id !== null && match.team2Id !== null);
        setSchedules(filteredMatches);
        })
        .catch(error => {
        console.error('There was an error fetching the matches list!', error);
        });

    axios.get('http://localhost:9000/api/teams/list')
        .then(response => {
        console.log('Teams List Response:', response.data);
        setTeams(response.data);
        })
        .catch(error => {
        console.error('There was an error fetching the teams list!', error);
        });
    }, []);

    const handleOpenModal = () => {
    setModalIsOpen(true);
    };

    const handleCloseModal = () => {
    setModalIsOpen(false);
    };

    const handleOpenBulkModal = () => {
    setBulkModalIsOpen(true);
    };

    const handleCloseBulkModal = () => {
    setBulkModalIsOpen(false);
    };

    const handleChange = (e) => {
    setNewMatch({ ...newMatch, [e.target.name]: e.target.value });
    };

    const handleBulkTeamChange = (e) => {
    setBulkTeams({ ...bulkTeams, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios.post('http://localhost:9000/api/volleyball/create', newMatch)
        .then(response => {
        setSchedules([...schedules, response.data]);
        setArchive([...archive, response.data]);
        handleCloseModal();
        })
        .catch(error => {
        console.error('There was an error creating the match!', error);
        })
        .finally(() => {
        setIsLoading(false);
        });
    };

    const handleCreateBulkMatches = () => {
    const bulkMatches = [
        {
            matchId: 1,
            team1Id: bulkTeams.match1_team1,
            team2Id: bulkTeams.match1_team2,
            sporttype: 'Volleyball',
            date: bulkTeams.match1_date,
            status: 'scheduled',
            elimination: newMatch.elimination,
            nextMatchId: 5,
            tournamentRoundText: '1'
        },
        {
            matchId: 2,
            team1Id: bulkTeams.match2_team1,
            team2Id: bulkTeams.match2_team2,
            sporttype: 'Volleyball',
            date: bulkTeams.match2_date,
            status: 'scheduled',
            elimination: newMatch.elimination,
            tournamentRoundText: '1',
            nextMatchId: 5
        },
        {
            matchId: 3,
            team1Id: bulkTeams.match3_team1,
            team2Id: bulkTeams.match3_team2,
            sporttype: 'Volleyball',
            date: bulkTeams.match3_date,
            status: 'scheduled',
            elimination: newMatch.elimination,
            tournamentRoundText: '1',
            nextMatchId: 6
        },
        {
            matchId: 4,
            team1Id: bulkTeams.match4_team1,
            team2Id: bulkTeams.match4_team2,
            sporttype: 'Volleyball',
            date: bulkTeams.match4_date,
            status: 'scheduled',
            elimination: newMatch.elimination,
            tournamentRoundText: '1',
            nextMatchId: 6
        },
        {
            matchId: 5,
            team1Id: null,
            team2Id: null,
            sporttype: 'Volleyball',
            date: '2021-05-30',
            status: 'scheduled',
            elimination: newMatch.elimination,
            tournamentRoundText: 'Semi-Finals',
            nextMatchId: 7
        },
        {
            matchId: 6,
            team1Id: null,
            team2Id: null,
            sporttype: 'Volleyball',
            date: '2021-05-30',
            status: 'scheduled',
            elimination: newMatch.elimination,
            tournamentRoundText: 'Semi-Finals',
            nextMatchId: 7
        },
        {
            matchId: 7,
            team1Id: null,
            team2Id: null,
            sporttype: 'Volleyball',
            date: '2021-05-30',
            status: 'scheduled',
            elimination: newMatch.elimination,
            tournamentRoundText: 'Finals',
            nextMatchId: null
        }

        ];

    axios.post('http://localhost:9000/api/volleyball/create-bulk', { matches: bulkMatches })
        .then(response => {
        setSchedules([...schedules, ...response.data]);
        handleCloseBulkModal();
        })
        .catch(error => {
        console.error('There was an error creating the bulk matches!', error);
        });
        axios.post('http://localhost:9000/api/archive/create-bulk', { matches: bulkMatches })
        .then(response => {
        setArchive([...archive, ...response.data]);
        })
        .catch(error => {
        console.error('There was an error creating the bulk matches!', error);
        });


    };
    
  const tabs = [
    { name: "Competitions", path: "/competitions" },
    { name: "Teams", path: "/teams" },
    { name: "Schedules", path: "/schedules" },
    { name: "Standings", path: "/standings" }
  ];

  useEffect(() => {
    axios.get(`http://localhost:9000/api/sportlist/${slug}`)
      .then(response => {
        setSport(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the sport details!', error);
      });
  }, [slug]);


  return (
    <div className="flex flex-col min-h-screen">
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Sports Competitions - Volleyball</h1>
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
        <div className="flex flex-row justify-between">
            <div>
                <button
                    className="bg-blue-600 text-white py-2 px-4 rounded mb-4"
                    onClick={handleOpenModal}
                >
                    Create Single Match
                </button>
                <button
                    className="bg-green-600 ml-2 text-white py-2 px-4 rounded mb-4"
                    onClick={handleOpenBulkModal}
                >
                    Create Team Matches
                </button>
            </div>
            <div>
                <Link to={`/volleyball-bracket`}>
                <button className="bg-green-600 ml-2 text-white py-2 px-4 rounded mb-4">
                    View Bracket
                </button>
                </Link>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {schedules.map(schedule => (
            <a href={`/volleyball-match/${schedule.id}`} key={schedule.id} className="bg-white p-6 rounded border shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="text-center">
                  {schedule.Team1 && schedule.Team1.logo ? (
                    <img src={schedule.Team1.logo} alt={schedule.Team1.collegename} className="w-24 h-24 object-cover rounded-full mx-auto" />
                  ) : (
                    <p>TBA</p>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-gray-600 font-bold">VS</p>
                </div>
                <div className="text-center">
                  {schedule.Team2 && schedule.Team2.logo ? (
                    <img src={schedule.Team2.logo} alt={schedule.Team2.collegename} className="w-24 h-24 object-cover rounded-full mx-auto" />
                  ) : (
                    <p>TBA</p>
                  )}
                </div>
              </div>
              <div className="text-center mt-4">
                <p className="text-gray-700 font-medium">{new Date(schedule.date).toLocaleDateString()} {new Date(schedule.date).toLocaleTimeString()}</p>
                <p className="text-gray-700 font-medium">{schedule.sporttype}</p>
                <p className="text-gray-700 font-medium">
                {(() => {
                  switch (schedule.status) {
                    case 'in-progress':
                      return "In-Progress";
                    case 'scheduled':
                      return "Match Scheduled";
                    case 'completed':
                      return "Finished";
                    case 'cancelled':
                      return "Cancelled";
                    default:
                      return "Unknown Status";
                  }
                })()}
              </p>

              </div>
            </a>
          ))}
        </div>
        </main>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Create Match Modal"
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
      >
        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
          <h2 className="text-2xl mb-4">Create New Match</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="team1Id">Team 1</label>
              <select
                id="team1Id"
                name="team1Id"
                value={newMatch.team1Id}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              >
                <option value="">Select Team 1</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>{team.collegename}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="team2Id">Team 2</label>
              <select
                id="team2Id"
                name="team2Id"
                value={newMatch.team2Id}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              >
                <option value="">Select Team 2</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>{team.collegename}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="sporttype">Sport Type</label>
              <input
                type="text"
                id="sporttype"
                name="sporttype"
                value={newMatch.sporttype}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="date">Date & Time</label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={newMatch.date}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={handleCloseModal} className="bg-gray-600 text-white py-2 px-4 rounded mr-2">
                Cancel
              </button>
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Match'}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        isOpen={bulkModalIsOpen}
        onRequestClose={handleCloseBulkModal}
        contentLabel="Create Bulk Matches Modal"
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
        >
        <div className="bg-white p-8 rounded shadow-lg max-w-2xl w-full">
            <h2 className="text-2xl mb-4">Create Basketball Matches</h2>
            <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-4">
                <div className="mb-4">
                <label className="block mb-1" htmlFor="elimination">Elimination Type</label>
                <select
                    id="elimination"
                    name="elimination"
                    value={newMatch.elimination}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                >
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                </select>
                </div>
            <form onSubmit={e => e.preventDefault()} className="grid grid-cols-3 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                <React.Fragment key={i}>
                    <div className="mb-4">
                    <label className="block mb-1 text-xs" htmlFor={`match${i + 1}_team1`}>Match {i + 1} - Team 1</label>
                    <select
                        id={`match${i + 1}_team1`}
                        name={`match${i + 1}_team1`}
                        value={bulkTeams[`match${i + 1}_team1`]}
                        onChange={handleBulkTeamChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    >
                        <option value="">Select Team 1</option>
                        {teams.map(team => (
                        <option key={team.id} value={team.id}>{team.collegename}</option>
                        ))}
                    </select>
                    </div>
                    <div className="mb-4">
                    <label className="block mb-1 text-xs" htmlFor={`match${i + 1}_team2`}>Match {i + 1} - Team 2</label>
                    <select
                        id={`match${i + 1}_team2`}
                        name={`match${i + 1}_team2`}
                        value={bulkTeams[`match${i + 1}_team2`]}
                        onChange={handleBulkTeamChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    >
                        <option value="">Select Team 2</option>
                        {teams.map(team => (
                        <option key={team.id} value={team.id}>{team.collegename}</option>
                        ))}
                    </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-xs mb-1" htmlFor={`match${i + 1}_date`}>Date</label>
                        <input
                            type="datetime-local"
                            id={`match${i + 1}_date`}
                            name={`match${i + 1}_date`}
                            value={bulkTeams[`match${i + 1}_date`]}
                            onChange={handleBulkTeamChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        /> 
                    </div>
                </React.Fragment>
                ))}
            </form>
            </div>
            <div className="flex justify-end">
            <button onClick={handleCloseBulkModal} className="bg-gray-600 text-white py-2 px-4 rounded mr-2">
                Cancel
            </button>
            <button onClick={handleCreateBulkMatches} className="bg-green-600 text-white py-2 px-4 rounded">
                {isLoading ? 'Creating...' : 'Create Bulk Matches'}
            </button>
            </div>
        </div>
</Modal>

    </div>
    );

};

export default VolleyballDetail;
