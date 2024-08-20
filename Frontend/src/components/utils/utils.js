// Fetch all matches
async function fetchAllMatches() {
    try {
        const res = await pool.query('SELECT * FROM matches');
        return res.rows;
    } catch (err) {
        console.error('Error fetching all matches:', err);
        throw err;
    }
}

// Fetch matches by round
async function fetchMatchesByRound(round) {
    try {
        const res = await pool.query('SELECT * FROM matches WHERE round = $1', [round]);
        return res.rows;
    } catch (err) {
        console.error('Error fetching matches by round:', err);
        throw err;
    }
}

// Fetch match by ID
async function fetchMatchById(id) {
    try {
        const res = await pool.query('SELECT * FROM matches WHERE id = $1', [id]);
        return res.rows[0];
    } catch (err) {
        console.error('Error fetching match by ID:', err);
        throw err;
    }
}

module.exports = { fetchAllMatches, fetchMatchesByRound, fetchMatchById };
