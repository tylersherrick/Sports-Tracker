const sportsDiv = document.getElementById("sports-data");
const tester = document.getElementById("tester");
const mlbData = document.getElementById("mlb-data");
const nflData = document.getElementById("nfl-data");
const nhlData = document.getElementById("nhl-data");
const sportsData = {
    MLB: [],
    NFL: [],
    NHL: []
};
let isViewingAllMLB = false;
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
        if(!isViewingAllMLB) {
            MLB();
        }
    } catch (error) {
        console.error('Error fetching sports data:', error);
    }
};

const MLB = () => {
    const games = sportsData.MLB;
    const showLessMLB = () => {
        sportsDiv.innerHTML = `<h1>Todays Sporting Events</h1>`;
        mlbData.innerHTML = `
            <h3 id="show-all-test">MLB</h3>
        `;
        const shortGamesList = games.map(event => {
            const awayTeam = event.competitions[0].competitors[1].team.displayName;
            const homeTeam = event.competitions[0].competitors[0].team.displayName;
            const awayScore = event.competitions[0].competitors[1].score;
            const homeScore = event.competitions[0].competitors[0].score;
            const inning = event.status.type.detail;
            const gameStatus = event.status.type.shortDetail;
            const outs = event.competitions[0].outsText;
            const situation = event.competitions[0].situation;
            const balls = situation ? situation.balls : 'N/A';
            const strikes = situation ? situation.strikes : 'N/A';
            if(event.status.type.name === "STATUS_IN_PROGRESS") {
                mlbData.innerHTML += `
                    <p><b>${awayTeam} ${awayScore} at ${homeTeam} ${homeScore}</b> - ${inning}</p>
                    <p>Count: ${balls}-${strikes} - ${outs}</p>
                `;
            }
            if(event.status.type.name === "STATUS_SCHEDULED") {
                mlbData.innerHTML += `<p>${awayTeam} at ${homeTeam} - ${inning} ${gameStatus}</p>`;
            }
        }).slice(0, 3).join('');
        document.getElementById("show-all-test").addEventListener("click", showAllMLB);
    }
    const showAllMLB = () => {
        const longGamesList = games.map(event => {
            const awayTeam = event.competitions[0].competitors[1].team.displayName;
            const homeTeam = event.competitions[0].competitors[0].team.displayName;
            const awayScore = event.competitions[0].competitors[1].score;
            const homeScore = event.competitions[0].competitors[0].score;
            const inning = event.status.type.detail;
            const gameStatus = event.status.type.shortDetail;
            const outs = event.competitions[0].outsText;
            const situation = event.competitions[0].situation;
            const balls = situation ? situation.balls : 'N/A';
            const strikes = situation ? situation.strikes : 'N/A';
            if(event.status.type.name === "STATUS_IN_PROGRESS") {
                return `
                    <p><b>${awayTeam} ${awayScore} at ${homeTeam} ${homeScore}</b> - ${inning}</p>
                    <p>Count: ${balls}-${strikes} - ${outs}</p>
                `;
            }
            if(event.status.type.name === "STATUS_SCHEDULED") {
                return `<p>${awayTeam} at ${homeTeam} - ${inning} ${gameStatus}</p>`;
            }
            if(event.status.type.name === "STATUS_FINAL") {
                return `<p>${awayTeam} ${awayScore} at ${homeTeam} ${homeScore} - ${gameStatus}</p>`;
            }
        }).join('');
        if(longGamesList.length === 0) {
            return `<p>There are no active or scheduled games today</p>`;
        }
        sportsDiv.innerHTML = '';
        mlbData.innerHTML = `
            <h1>All MLB Games Today</h1>
            <button id="back-to-main">Back</button>
            ${longGamesList}
        `;
        document.getElementById("back-to-main").addEventListener("click", showLessMLB);
        isViewingAllMLB = true;
    }
    showLessMLB();
}

fetchAllSportsData().then(() => setInterval(fetchAllSportsData, 1000));

