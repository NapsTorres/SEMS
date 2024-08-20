import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../style.css'; // Import the CSS file with the loading bar styles

const VolleyballMatchDetails = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [viewerLink, setViewerLink] = useState('');


  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/volleyball/${id}`);
        console.log('Match Details Response:', response.data);
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

  useEffect(() => {
    // Generate a viewer link based on the current URL
    const viewerUrl = `${window.location.origin}/volleyball-match/view/${id}`;
    setViewerLink(viewerUrl);
  }, [id]);
  const handleUpdateScore = async (team, increment) => {
    try {
      const updatedScore = team === 'Team1'
        ? { team1Score: match.team1Score + increment }
        : { team2Score: match.team2Score + increment };

      const updatedMatch = {
        ...match,
        ...updatedScore
      };

      const response = await axios.put(`http://localhost:9000/api/volleyball/${id}`, updatedMatch);
      console.log('Update Match Response:', response.data);
      setMatch(response.data); // Update the local state with the updated match data
    } catch (err) {
      setError('Error updating match details');
    }
  };

  const handleStatusUpdate = async () => {
    try {
      const updatedMatch = {
        ...match,
        status: newStatus
      };

      const response = await axios.put(`http://localhost:9000/api/volleyball/${id}`, updatedMatch);
      console.log('Update Status Response:', response.data);
      setMatch(response.data); // Update the local state with the updated match data
    } catch (err) {
      setError('Error updating match status');
    }
  };

  const handleMatchFinish = async () => {
    try {
      const updatedMatch = {
        ...match,
        status: 'completed' // Assuming you want to mark the match as completed when finished
      };

      const response = await axios.put(`http://localhost:9000/api/volleyball/${id}`, updatedMatch);
      console.log('Match Finished Response:', response.data);
      setMatch(response.data); // Update the local state with the updated match data
    } catch (err) {
      setError('Error finishing match');
    }
  };

  const statusOptions = ['in-progress', 'completed', 'cancelled'];

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
      <div className="max-w-3xl bg-white p-6 rounded border shadow-lg justify-center mx-auto items-center mt-12 card-container">
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold text-red-600">
            {match.status === 'scheduled' ? 'Scheduled' :
             match.status === 'completed' ? 'Completed' :
             match.status === 'in-progress' ? 'In-Progress' : ''}
          </h2>
          <p>{match.details}</p>
          {match.status === 'scheduled' && (
            <div className="mt-4">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="border border-gray-400 p-2 mr-2"
              >
                <option value="">Select Status</option>
                {statusOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={handleStatusUpdate}
              >
                Update Status
              </button>
            </div>
          )}
          {match.status === 'in-progress' && (
            <div className="mt-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                onClick={handleMatchFinish}
              >
                Match Finished
              </button>
            </div>
          )}
          <div className="mt-4 mb-4">
            <p className="text-gray-700">Share this link with viewers:</p>
            <input
              type="text"
              readOnly
              className="border border-gray-400 p-2 w-full mt-2"
              value={viewerLink}
            />
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-center border bg-gray-100 rounded-md p-4">
            {match.Team1 && match.Team1.logo ? (
              <img src={match.Team1.logo} alt={match.Team1.collegename} className="w-24 h-24 object-cover rounded-full mx-auto" />
            ) : (
              <p>TBA</p>
            )}
            <p className="mt-2 font-bold">{match.Team1.collegename}</p>
            <p className="text-3xl mt-4 font-bold">{match.team1Score !== null ? match.team1Score : '0'}</p>
            {match.status !== 'scheduled' && match.status !== 'completed' && (
              <div className='mt-4'>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2" onClick={() => handleUpdateScore('Team1', 1)}>Add 1</button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2" onClick={() => handleUpdateScore('Team1', 2)}>Add 2</button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={() => handleUpdateScore('Team1', 3)}>Add 3</button>
              </div>
            )}
          </div>
          <div className="text-center m-4">
            <p className="text-red-600 font-bold text-lg">VS</p>
          </div>
          <div className="text-center border bg-gray-100 rounded-md p-4">
            {match.Team2 && match.Team2.logo ? (
              <img src={match.Team2.logo} alt={match.Team2.collegename} className="w-24 h-24 object-cover rounded-full mx-auto" />
            ) : (
              <p>TBA</p>
            )}
            <p className="mt-2 font-bold">{match.Team2.collegename}</p>
            <p className="text-3xl mt-4 font-bold">{match.team2Score !== null ? match.team2Score : '0'}</p>
            {match.status !== 'scheduled' && match.status !== 'completed' && (
              <div className='mt-4'>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2" onClick={() => handleUpdateScore('Team2', 1)}>Add 1</button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2" onClick={() => handleUpdateScore('Team2', 2)}>Add 2</button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={() => handleUpdateScore('Team2', 3)}>Add 3</button>
              </div>
            )}
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-700 font-medium">{new Date(match.date).toLocaleDateString()} {new Date(match.date).toLocaleTimeString()}</p>
          <p className="text-gray-700 font-bold text-lg mt-6">{match.sporttype}</p>
        </div>
        {match.status === 'in-progress' && (
          <div className="loading-bar"></div>
        )}

      </div>
    </div>
  );
};

export default VolleyballMatchDetails;
