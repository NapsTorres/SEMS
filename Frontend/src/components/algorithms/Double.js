
function generateDoubleEliminationBracket(teams) {
    if (teams.length !== 8) {
        throw new Error('Double Elimination requires exactly 8 teams');
    }

    let winnersBracket = [];
    let losersBracket = [];

    // Winners bracket matches
    for (let i = 0; i < teams.length; i += 2) {
        winnersBracket.push([teams[i], teams[i + 1]]);
    }

    losersBracket.push(['Match1', 'Match2', 'Match3', 'Match4'].map(name => [name, name]));

    return {
        winnersBracket,
        losersBracket
    };
}

const teams = ['Team1', 'Team2', 'Team3', 'Team4', 'Team5', 'Team6', 'Team7', 'Team8'];
console.log(generateDoubleEliminationBracket(teams));

module.exports = generateDoubleEliminationBracket;