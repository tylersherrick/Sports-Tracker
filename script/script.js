const sportsDiv = document.getElementById("sports-data");
const mlbData = document.getElementById("mlb-data");
const sportsData = { MLB: [], NFL: [], NHL: [] };
let currentView = 'showLess';

const fetchGamesData = async () => {
    try {
        const mlbURL = 'https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard';
        const [mlbResponse] = await Promise.all([fetch(mlbURL)]);
        const mlbData = await mlbResponse.json();
        sportsData.MLB = mlbData.events;
        updateViews();
    } catch (error) {
        console.error('Error fetching sports data:', error);
    }
};

const updateViews = () => {
    if (currentView === 'showLess') {
        showLessMLB();
    } else if (currentView === 'showAll') {
        showAllMLB();
    }
};

const showLessMLB = () => {
    sportsDiv.innerHTML = `<h1>Todays Sporting Events</h1>`;
    mlbData.innerHTML = `<h3 id="show-all-test">MLB</h3>`;
    const limitedGames = sportsData.MLB.slice(0, 3).filter(event => 
        event.status.type.name === "STATUS_IN_PROGRESS" || event.status.type.name === "STATUS_SCHEDULED"
    );
    limitedGames.forEach(event => {
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
        const isFirst = situation ? situation.onFirst : 'N/A';
        const isSecond = situation ? situation.onSecond : 'N/A';
        const isThird = situation ? situation.onThird : 'N/A';
        if (event.status.type.name === "STATUS_IN_PROGRESS") {
            mlbData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            <b>${awayTeam} ${awayScore} at ${homeTeam} ${homeScore}</b> - ${inning}
                        </p>
                        <p class="game-details">
                            Count: ${balls}-${strikes} - ${outs}
                        </p>
                    </div>
                    <div class="base-map">
                        <div class="base first-base ${isFirst ? 'occupied' : ''}"></div>
                        <div class="base second-base ${isSecond ? 'occupied' : ''}"></div>
                        <div class="base third-base ${isThird ? 'occupied' : ''}"></div>
                    </div>
                </div>
            `;
        }
        if (event.status.type.name === "STATUS_SCHEDULED") {
            mlbData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${awayTeam} at ${homeTeam}
                        </p>
                        <p class="game-details">
                            ${inning} ${gameStatus}
                        </p>
                    </div>
                </div>
            `;
        }
    });
    document.getElementById("show-all-test").addEventListener("click", showAllMLB);
    currentView = 'showLess';
};

const showAllMLB = () => {
    sportsDiv.innerHTML = `<h1>All MLB Games Today</h1>`;
    mlbData.innerHTML = '';
    const longGamesList = sportsData.MLB.map(event => {
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
        const isFirst = situation ? situation.onFirst : 'N/A';
        const isSecond = situation ? situation.onSecond : 'N/A';
        const isThird = situation ? situation.onThird : 'N/A';
        if (event.status.type.name === "STATUS_IN_PROGRESS") {
            return `
                <div class="game-row" style="display: flex; align-items: center;">
                    <div class="game-info">
                        <p class="game-details">
                            <b>${awayTeam} ${awayScore} at ${homeTeam} ${homeScore}</b> - ${inning}
                        </p>
                        <p class="game-details">
                            Count: ${balls}-${strikes} - ${outs}
                        </p>
                    </div>
                    <div class="base-map" style="margin-left: 10px;">
                        <div class="base first-base ${isFirst ? 'occupied' : ''}"></div>
                        <div class="base second-base ${isSecond ? 'occupied' : ''}"></div>
                        <div class="base third-base ${isThird ? 'occupied' : ''}"></div>
                    </div>
                </div>
            `;
        }
        if (event.status.type.name === "STATUS_SCHEDULED") {
            return `<p>${awayTeam} at ${homeTeam}</p> 
                    <p>${inning} ${gameStatus}</p>`;
        }
        if (event.status.type.name === "STATUS_FINAL") {
            return `<p>${awayTeam} ${awayScore} at ${homeTeam} ${homeScore} - ${gameStatus}</p>`;
        }
    }).join('');
    if (longGamesList.length === 0) {
        mlbData.innerHTML = `<p>There are no active or scheduled games today</p>`;
    } else {
        mlbData.innerHTML = `
            <button id="back-to-main">Back</button>
            ${longGamesList}
        `;
    }
    document.getElementById("back-to-main").addEventListener("click", showLessMLB);
    currentView = 'showAll';
};

fetchGamesData().then(() => setInterval(fetchGamesData, 1000));
