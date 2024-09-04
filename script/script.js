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
    sportsDiv.innerHTML = `
        <h1>Todays Sporting Events</h1>
        <h3 id="show-all-mlb">MLB</h3>
    `;
    mlbData.innerHTML = ``;
    const inProgress = sportsData.MLB.slice(0, sportsData.MLB.length).filter(event => event.status.type.name === "STATUS_IN_PROGRESS");
    const yetToStart = sportsData.MLB.slice(0, sportsData.MLB.length).filter(event => event.status.type.name === "STATUS_SCHEDULED");
    const limitedGames = [...inProgress, ...yetToStart].slice(0, 3).filter(event => 
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
                            ${inning} </br></br>
                            ${awayTeam} -  ${awayScore} </br>
                            ${homeTeam} -  ${homeScore}
                        </p>
                        <p class="game-details">
                            ${balls}-${strikes} - ${outs}
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
    document.getElementById("show-all-mlb").addEventListener("click", showAllMLB);
    currentView = 'showLess';
};

const showAllMLB = () => {
    sportsDiv.innerHTML = `
        <h1>All MLB Games Today</h1>
        <button id="back-to-main">Back</button>
    `;
    mlbData.innerHTML = '';
    const inProgress = sportsData.MLB.slice(0, sportsData.MLB.length).filter(event => event.status.type.name === "STATUS_IN_PROGRESS");
    const yetToStart = sportsData.MLB.slice(0, sportsData.MLB.length).filter(event => event.status.type.name === "STATUS_SCHEDULED");
    const alreadyFinal = sportsData.MLB.slice(0, sportsData.MLB.length).filter(event => event.status.type.name === "STATUS_FINAL");
    const longGamesList = [...inProgress, ...yetToStart, ...alreadyFinal].forEach(event => {
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
        if(event.status.type.name === "STATUS_IN_PROGRESS") {
            mlbData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${inning} </br></br>
                            ${awayTeam} -  ${awayScore} </br>
                            ${homeTeam} -  ${homeScore}
                        </p>
                        <p class="game-details">
                            ${balls}-${strikes} - ${outs}
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
        if (event.status.type.name === "STATUS_FINAL") {
            mlbData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${inning} </br></br>
                            ${awayTeam} -  ${awayScore} </br>
                            ${homeTeam} -  ${homeScore}
                        </p>
                        <p class="game-details">
                            
                        </p>
                    </div>
                </div>
            `;
        }
    },
    document.getElementById("back-to-main").addEventListener("click", showLessMLB));
    currentView = 'showAll';
};

fetchGamesData().then(() => setInterval(fetchGamesData, 1000));
