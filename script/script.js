const sportsDiv = document.getElementById("sports-data");

const sportsData = {
    MLB: [],
    NFL: [],
    NHL: []
};

const fetchAllSportsData = async () => {
    try {
        const mlbURL = 'https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard';
        const nflURL = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';
        const nhlURL = 'https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard';
        const [mlbResponse, nflResponse, nhlResponse] = await Promise.all([
            fetch(mlbURL),
            fetch(nflURL),
            fetch(nhlURL)
        ]);
        const mlbData = await mlbResponse.json();
        const nflData = await nflResponse.json();
        const nhlData = await nhlResponse.json();
        sportsData.MLB = mlbData.events;
        sportsData.NFL = nflData.events;
        sportsData.NHL = nhlData.events;
        console.log('All sports data fetched and stored:', sportsData);
    } catch (error) {
        console.error('Error fetching sports data:', error);
    }
};

fetchAllSportsData().then(() => {
    sportsDiv.innerHTML += `<h3>MLB</h3>`;
    const activeMLBGames = sportsData.MLB.filter(event => 
        event.status.type.name === "STATUS_IN_PROGRESS" || event.status.type.name === "STATUS_SCHEDULED"
    ).slice(0, 3);
    activeMLBGames.forEach(event => {
        const awayTeam = event.competitions[0].competitors[1].team.displayName;
        const homeTeam = event.competitions[0].competitors[0].team.displayName;
        const awayScore = event.competitions[0].competitors[1].score;
        const homeScore = event.competitions[0].competitors[0].score;
        const inning = event.status.type.detail;
        sportsDiv.innerHTML += `
            <p>${awayTeam} ${awayScore} at ${homeTeam} ${homeScore} - ${inning}</p>
        `;
    });
    console.log(sportsData.MLB)

    sportsDiv.innerHTML += `<h3>NFL</h3>`;
    sportsData.NFL.forEach(event => {
        sportsDiv.innerHTML += `<p>${event.name}</p>`;
    });

    sportsDiv.innerHTML += `<h3>NHL</h3>`;
    sportsData.NHL.forEach(event => {
        sportsDiv.innerHTML += `<p>${event.name}</p>`;
    });
});

