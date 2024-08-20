
function generateRoundRobinBracket(teams) {
    if (teams.length !== 8) {
        throw new Error('Round Robin requires exactly 8 teams');
    }
    let matches = [];
    let numTeams = teams.length;

    for (let i = 0; i < numTeams; i++) {
        for (let j = i + 1; j < numTeams; j++) {
            matches.push([teams[i], teams[j]]);
        }
    }

    return matches;
}

const teams = ['Team1', 'Team2', 'Team3', 'Team4', 'Team5', 'Team6', 'Team7', 'Team8'];
console.log(generateRoundRobinBracket(teams));

module.exports = generateRoundRobinBracket;