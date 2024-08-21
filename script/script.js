const sportsDiv = document.getElementById("sports-data");
const mlbData = document.getElementById("mlb-data");
const nflData = document.getElementById("nfl-data");
const nhlData = document.getElementById("nhl-data");
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

const displayMainView = () => {
    sportsDiv.innerHTML = `<h1>Active Sporting Events</h1>`;
    mlbData.innerHTML = `<h3 id="show-all-mlb">MLB</h3>`;
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
        const outs = event.competitions[0].outsText;
        if(event.status.type.name === "STATUS_IN_PROGRESS") {
            mlbData.innerHTML += `<p>${awayTeam} ${awayScore} at ${homeTeam} ${homeScore} - ${inning} - ${outs}</p>`;
        }
        if(event.status.type.name === "STATUS_SCHEDULED") {
            mlbData.innerHTML += `<p>${awayTeam} at ${homeTeam} - ${inning} ${gameStatus}</p>`;
        }
    });
    if(activeMLBGames.length === 0) {
        mlbData.innerHTML += `<p>There are no games active or scheduled today</p>`;
    }

    nflData.innerHTML = `<h3>NFL</h3>`;
    const activeNFLGames = sportsData.NFL.filter(event => 
        event.status.type.name === "STATUS_IN_PROGRESS" || event.status.type.name === "STATUS_SCHEDULED"
    ).slice(0, 3);
    activeNFLGames.forEach(event => {
        const awayTeam = event.competitions[0].competitors[1].team.displayName;
        const homeTeam = event.competitions[0].competitors[0].team.displayName;
        const awayScore = event.competitions[0].competitors[1].score;
        const homeScore = event.competitions[0].competitors[0].score;
        const inning = event.status.type.detail;
        nflData.innerHTML += `
            <p>${awayTeam} ${awayScore} at ${homeTeam} ${homeScore} - ${inning}</p>
        `;
    });
    if(activeNFLGames.length === 0) {
        nflData.innerHTML += `<p>There are no games active or scheduled today</p>`;
    }
    nhlData.innerHTML = `<h3>NHL</h3>`;
    const activeNHLGames = sportsData.NHL.filter(event => 
        event.status.type.name === "STATUS_IN_PROGRESS" || event.status.type.name === "STATUS_SCHEDULED"
    ).slice(0, 3);
    activeNHLGames.forEach(event => {
        const awayTeam = event.competitions[0].competitors[1].team.displayName;
        const homeTeam = event.competitions[0].competitors[0].team.displayName;
        const awayScore = event.competitions[0].competitors[1].score;
        const homeScore = event.competitions[0].competitors[0].score;
        const inning = event.status.type.detail;
        nhlData.innerHTML += `
            <p>${awayTeam} ${awayScore} at ${homeTeam} ${homeScore} - ${inning}</p>
        `;
    });
    if(activeNHLGames.length === 0) {
        nhlData.innerHTML += `<p>There are no games active or scheduled today</p>`;
    }
    document.getElementById('show-all-mlb').addEventListener('click', displayMLBSection);
};

const displayMLBSection = () => {
    nflData.innerHTML = "";
    nhlData.innerHTML = "";
    sportsDiv.innerHTML = '<h1>MLB Games Today</h1>';
    mlbData.innerHTML = '<button id="back-to-main">Back</button>';
    sportsData.MLB.forEach(event => {
        const awayTeam = event.competitions[0].competitors[1].team.displayName;
        const homeTeam = event.competitions[0].competitors[0].team.displayName;
        const awayScore = event.competitions[0].competitors[1].score;
        const homeScore = event.competitions[0].competitors[0].score;
        const inning = event.status.type.detail;
        const outs = event.competitions[0].outsText;
        const gameStatus = event.status.type.shortDetail;
        if(event.status.type.name === "STATUS_IN_PROGRESS") {
            mlbData.innerHTML += `<p>${awayTeam} ${awayScore} at ${homeTeam} ${homeScore} - ${inning} - ${outs}</p>`;
        }
        if(event.status.type.name === "STATUS_SCHEDULED") {
            mlbData.innerHTML += `<p>${awayTeam} at ${homeTeam} - ${inning} ${gameStatus}</p>`;
        }
        if(event.status.type.name === "STATUS_FINAL") {
            mlbData.innerHTML += `<p>${awayTeam} ${awayScore} at ${homeTeam} ${homeScore} - ${inning}</p>`;
        }
    });
    document.getElementById('back-to-main').addEventListener('click', displayMainView);
};

fetchAllSportsData().then(displayMainView);
setInterval(fetchAllSportsData, 6000);
