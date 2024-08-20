import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const TeamDetail = () => {
  const { slug } = useParams();
  const [team, setTeam] = useState(null);
  const [matches, setMatches] = useState({ badminton: [], soccer: [], volleyball: [] });
  const [isLoading, setIsLoading] = useState(true);

  const tabs = [
    { name: "Competitions", path: "/competitions" },
    { name: "Teams", path: "/teams" },
    { name: "Schedules", path: "/schedules" },
    { name: "Standings", path: "/standings" }
  ];

  useEffect(() => {
    // Fetch team details
    axios.get(`http://localhost:9000/api/teams/${slug}`)
      .then(response => {
        setTeam(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the team details!', error);
        setIsLoading(false);
      });
  
    // Fetch matches for each sport type
    Promise.all([
      axios.get(`http://localhost:9000/api/badminton/match/list/${slug}`),
      axios.get(`http://localhost:9000/api/badminton/match/list/${slug}`),
      axios.get(`http://localhost:9000/api/badminton/match/list/${slug}`)
    ])
      .then(([badmintonResponse, soccerResponse, volleyballResponse]) => {
        setMatches({
          badminton: badmintonResponse.data.badminton,
          soccer: soccerResponse.data.soccer,
          volleyball: volleyballResponse.data.volleyball
        });
        setIsLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the matches!', error);
        setIsLoading(false);
      });
  }, [slug]);
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!team) {
    return <div>Team not found</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-green-600 text-white p-4 flex justify-between items-center">
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
          <div className="flex flex-col items-center p-4 rounded-md border bg-gray-100">
            <img src={team.logo} alt={team.name} className="w-32 h-32 mb-4" />
            <p className="text-2xl mt-2 font-bold">{team.collegename}</p>
            <p className="text-lg mt-2">{team.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Sport Matches</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border rounded bg-gray-100 p-4">
                {Object.keys(matches).map((sportType, index) => (
                    <div key={index}>
                        <div className='flex flex-row justify-between items-center'>
                            <h3 className="text-lg font-bold mb-2 capitalize">{sportType} Matches</h3>
                            <Link to={`/${sportType}-bracket`} className="text-blue-400 underline">Bracket</Link>
                        </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg overflow-hidden">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                            <th className="text-left py-2 px-3">Date</th>
                            <th className="text-left py-2 px-3">Team 1</th>
                            <th className="text-left py-2 px-3">Team 2</th>
                            <th className="text-left py-2 px-3">Score</th>
                            <th className="text-left py-2 px-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {matches[sportType].map(match => (
                            <tr key={match.id}>
                                <td className="text-left py-2 px-3">{formatDate(match.date)}</td>
                                <td className="text-left py-2 px-3">{match.Team1.collegename}</td>
                                <td className="text-left py-2 px-3">{match.Team2.collegename}</td>
                                <td className="text-left py-2 px-3">{match.team1Score} - {match.team2Score}</td>
                                <td className="text-left py-2 px-3">{match.status}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    </div>
                ))}
                </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default TeamDetail;
