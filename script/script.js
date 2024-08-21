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
    sportsDiv.innerHTML += `
        <h1>Active Sporting Events</h1>
        <h3 id="show-all-mlb">MLB</h3>
    `;
    const activeMLBGames = sportsData.MLB.filter(event => 
        event.status.type.name === "STATUS_IN_PROGRESS" || event.status.type.name === "STATUS_SCHEDULED" 
    ).slice(0, 3);
    activeMLBGames.forEach(event => {
        const awayTeam = event.competitions[0].competitors[1].team.displayName;
        const homeTeam = event.competitions[0].competitors[0].team.displayName;
        const awayScore = event.competitions[0].competitors[1].score;
        const homeScore = event.competitions[0].competitors[0].score;
        const inning = event.status.type.detail;
        const gameStatus = event.status.type.shortDetail;
        if(event.status.type.name === "STATUS_IN_PROGRESS") {
            sportsDiv.innerHTML += `<p>${awayTeam} ${awayScore} at ${homeTeam} ${homeScore} - ${inning}</p>`;
        }
        if(event.status.type.name === "STATUS_SCHEDULED") {
            sportsDiv.innerHTML += `<p>${awayTeam} at ${homeTeam} - ${inning} for ${gameStatus}`;
        }
    });
    if(activeMLBGames.length == 0) {
        sportsDiv.innerHTML += `<p>There are no games active or scheduled today</p>`;
    }

    sportsDiv.innerHTML += `<h3>NFL</h3>`;
    const activeNFLGames = sportsData.NFL.filter(event => 
        event.status.type.name === "STATUS_IN_PROGRESS"
    ).slice(0, 3);
    activeNFLGames.forEach(event => {
        const awayTeam = event.competitions[0].competitors[1].team.displayName;
        const homeTeam = event.competitions[0].competitors[0].team.displayName;
        const awayScore = event.competitions[0].competitors[1].score;
        const homeScore = event.competitions[0].competitors[0].score;
        const inning = event.status.type.detail;
        sportsDiv.innerHTML += `
            <p>${awayTeam} ${awayScore} at ${homeTeam} ${homeScore} - ${inning}</p>
        `;
    });
    if(activeNFLGames.length == 0) {
        sportsDiv.innerHTML += `<p>There are no games active or scheduled today</p>`;
    }

    sportsDiv.innerHTML += `<h3>NHL</h3>`;
    const activeNHLGames = sportsData.NHL.filter(event => 
        event.status.type.name === "STATUS_IN_PROGRESS"
    ).slice(0, 3);
    activeNHLGames.forEach(event => {
        const awayTeam = event.competitions[0].competitors[1].team.displayName;
        const homeTeam = event.competitions[0].competitors[0].team.displayName;
        const awayScore = event.competitions[0].competitors[1].score;
        const homeScore = event.competitions[0].competitors[0].score;
        const inning = event.status.type.detail;
        sportsDiv.innerHTML += `
            <p>${awayTeam} ${awayScore} at ${homeTeam} ${homeScore} - ${inning}</p>
        `;
    });
    if(activeNHLGames.length == 0) {
        sportsDiv.innerHTML += `<p>There are no games active or scheduled today</p>`;
    }
});

setInterval(fetchAllSportsData, 6000);