import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../style.css'; 
const ViewerMatchDetails = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/matches/${id}`);
        console.log('Viewer Match Details Response:', response.data);
        setMatch(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching match details');
        setLoading(false);
      }
    };

    fetchMatchDetails();

    const intervalId = setInterval(fetchMatchDetails, 5000); // Poll every 5 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!match) {
    return <p>Match not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl bg-white p-6 rounded border shadow-lg justify-center mx-auto items-center mt-12 card-container">
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold text-red-600">
            {match.status === 'scheduled' ? 'Scheduled' :
             match.status === 'completed' ? 'Completed' :
             match.status === 'in-progress' ? 'In-Progress' : ''}
          </h2>
          <p>{match.details}</p>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            {match.Team1 && match.Team1.logo ? (
              <img src={match.Team1.logo} alt={match.Team1.collegename} className="w-24 h-24 object-cover rounded-full mx-auto" />
            ) : (
              <p>TBA</p>
            )}
            <p className="mt-2 font-bold">{match.Team1.collegename}</p>
            <p className="text-3xl mt-4 font-bold">{match.team1Score !== null ? match.team1Score : '0'}</p>
          </div>
          <div className="text-center">
            <p className="text-red-600 font-bold text-lg">VS</p>
          </div>
          <div className="text-center">
            {match.Team2 && match.Team2.logo ? (
              <img src={match.Team2.logo} alt={match.Team2.collegename} className="w-24 h-24 object-cover rounded-full mx-auto" />
            ) : (
              <p>TBA</p>
            )}
            <p className="mt-2 font-bold">{match.Team2.collegename}</p>
            <p className="text-3xl mt-4 font-bold">{match.team2Score !== null ? match.team2Score : '0'}</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-700 font-medium">{new Date(match.date).toLocaleDateString()} {new Date(match.date).toLocaleTimeString()}</p>
          <p className="text-gray-700 font-bold text-lg mt-6">{match.sporttype}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewerMatchDetails;
