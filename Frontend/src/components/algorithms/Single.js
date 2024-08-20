
function generateSingleEliminationBracket(teams) {
    if (teams.length !== 8) {
        throw new Error('Single Elimination requires exactly 8 teams');
    }
    let rounds = [];
    let round = [];
    
    for (let i = 0; i < teams.length; i += 2) {
        round.push([teams[i], teams[i + 1]]);
    }
    rounds.push(round);

    while (round.length > 1) {
        round = [];
        for (let i = 0; i < rounds[rounds.length - 1].length; i += 2) {
            round.push([null, null]); // Placeholder for matches
        }
        rounds.push(round);
        round = [];
        for (let i = 0; i < rounds[rounds.length - 2].length; i++) {
            round.push([null, null]); // Placeholder for matches
        }
        rounds.push(round);
    }

    return rounds;
}


const teams = ['Team1', 'Team2', 'Team3', 'Team4', 'Team5', 'Team6', 'Team7', 'Team8'];
console.log(generateSingleEliminationBracket(teams));

module.exports = generateSingleEliminationBracket;