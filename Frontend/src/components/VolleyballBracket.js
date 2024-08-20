import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import useWindowSize from './useWindowSize';

const VolleyballBracket = () => {
  const [matches, setMatches] = useState([]);
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);

  useEffect(() => {
    // Fetch matches from the server api/matches/match-list
    axios.get('http://localhost:9000/api/volleyball/match-list')
      .then(response => {
        console.log('Matches data:', response.data); // Log the response data
        setMatches(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the matches list:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div className='flex flex-col w-full justify-center items-center h-screen'>
      <h1 className="text-2xl font-bold mb-4 text-center">Volleyball Bracket</h1>
      {matches.length > 0 && (
        <SingleEliminationBracket
          matches={matches}
          matchComponent={Match}
          svgWrapper={({ children, ...props }) => (
            <SVGViewer width={finalWidth} height={finalHeight} {...props}>
              {children}
            </SVGViewer>
          )}
        />
      )}
    </div>
  );
  
};

export default VolleyballBracket;
