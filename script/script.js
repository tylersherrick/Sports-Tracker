const sportsDiv = document.getElementById("sports-data");
const mlbData = document.getElementById("mlb-data");
const nflName = document.getElementById("nfl-name")
const nflData = document.getElementById("nfl-data");
const cfbName = document.getElementById("cfb-name")
const cfbData = document.getElementById("cfb-data");
const sportsData = { MLB: [], NFL: [], CFB: [] };
let currentView = 'showLess';

const fetchGamesData = async () => {
    try {
        const mlbURL = 'https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard';
        const nflURL = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';
        const cfbURL = 'https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard';
        const [mlbResponse, nflResponse, cfbResponse] = await Promise.all([
            fetch(mlbURL),
            fetch(nflURL),
            fetch(cfbURL)
        ]);
        const mlbData = await mlbResponse.json();
        const nflData = await nflResponse.json();
        const cfbData = await cfbResponse.json();
        sportsData.MLB = mlbData.events;
        sportsData.NFL = nflData.events;
        sportsData.CFB = cfbData.events;

        updateViews();
    } catch (error) {
        console.error('Error fetching sports data:', error);
    }
};


const updateViews = () => {
    if (currentView === 'showLess') {
        showLessMLB();
        showLessNFL();
        showLessCFB();
    } 
    if (currentView === 'mlb') {
        showAllMLB();
    }
    if (currentView === 'nfl') {
        showAllNFL;
    }
    if (currentView === 'cfb') {
        showAllCFB();
    }
};

const showNothing = () => {
    currentView = 'showLess';
}

const showLessMLB = () => {
    sportsDiv.innerHTML = `<h1>Todays Sporting Events</h1>`;
    sportsDiv.innerHTML += `<h3 id="show-all-mlb">MLB</h3>`;
    mlbData.innerHTML = ``;
    const inProgress = sportsData.MLB.slice(0, sportsData.MLB.length).filter(event => event.status.type.name === "STATUS_IN_PROGRESS");
    const yetToStart = sportsData.MLB.slice(0, sportsData.MLB.length).filter(event => event.status.type.name === "STATUS_SCHEDULED");
    const limitedGames = [...inProgress, ...yetToStart].slice(0, 3).filter(event => 
        event.status.type.name === "STATUS_IN_PROGRESS" || event.status.type.name === "STATUS_SCHEDULED"
    );
    const gameTotal = limitedGames.length;
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
                        ${inning} ${gameStatus} </br></br>
                        ${awayTeam} </br>
                        ${homeTeam}
                        </p>
                        <p class="game-details">
                            
                        </p>
                    </div>
                </div>
            `;
        }
    });
    if (limitedGames.length === 0) {
        mlbData.innerHTML += `<h4>There are no active games.</h4>`;
    }
    document.getElementById("show-all-mlb").addEventListener("click", showAllMLB);
    currentView = 'showLess';
};

const showAllMLB = () => {
    sportsDiv.innerHTML = `
        <h1>All MLB Games Today</h1>
        <button id="back-to-main">Back</button>
    `;
    mlbData.innerHTML = '';
    nflData.innerHTML = '';
    nflName.innerHTML = '';
    cfbData.innerHTML = '';
    cfbName.innerHTML = '';
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
                        ${inning} ${gameStatus} </br></br>
                        ${awayTeam} </br>
                        ${homeTeam}
                        </p>
                        <p class="game-details">
                            
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
    document.getElementById("back-to-main").addEventListener("click", showNothing));
    currentView = 'mlb';
};

const showLessNFL = () => {
    nflData.innerHTML = '';
    nflName.innerHTML = '<h3 id="show-all-nfl">NFL</h3>';
    if (!sportsData.NFL || sportsData.NFL.length === 0) {
        nflData.innerHTML += '<h4>No NFL games available.</h4>';
    }
    const nflHalfTime = sportsData.NFL.slice(0, sportsData.NFL.length).filter(event => event.status.type.name === "STATUS_HALFTIME");
    const nflInProgress = sportsData.NFL.slice(0, sportsData.NFL.length).filter(event => event.status.type.name === "STATUS_IN_PROGRESS");
    const nflScheduled = sportsData.NFL.slice(0, sportsData.NFL.length).filter(event => event.status.type.name === "STATUS_SCHEDULED");
    const smallNFLList = [...nflInProgress, ...nflHalfTime, ...nflScheduled].slice(0, 3);
    smallNFLList.forEach(event => {
        const awayTeam = event.competitions[0].competitors[1].team.displayName;
        const homeTeam = event.competitions[0].competitors[0].team.displayName;
        const gameStatus = event.status.type.shortDetail;
        const awayScore = event.competitions[0].competitors[1].score;
        const homeScore = event.competitions[0].competitors[0].score;
        const time = event.status.type.detail;
        const situation = event.competitions[0].situation || null;
        const ballPosition = situation && situation.downDistanceText ? situation.downDistanceText : 'Switching Possession';
        const possession = situation && situation.possession ? situation.possession : '';
        let awayID = event.competitions[0].competitors[1].id;
        let homeID = event.competitions[0].competitors[0].id;
        awayID = possession === awayID ? "🏈" : "";
        homeID = possession === homeID ? "🏈" : "";
        if(event.status.type.name === "STATUS_IN_PROGRESS") {
            nflData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayTeam} -  ${awayScore} ${awayID}</br>
                            ${homeTeam} -  ${homeScore} ${homeID}</br></br>
                        </p>
                        <p class="game-details">
                            ${ballPosition}
                        </p>
                    </div>
                </div>
            `;
        }
        if(event.status.type.name === "STATUS_HALFTIME") {
            cfbData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayRank} ${awayTeam} -  ${awayScore} </br>
                            ${homeRank} ${homeTeam} -  ${homeScore} </br></br>
                        </p>
                        <p class="game-details">
                        </p>
                    </div>
                </div>
            `;
        }
        if(event.status.type.name === "STATUS_SCHEDULED") {
            nflData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayTeam} </br>
                            ${homeTeam}
                        </p>
                        <p class="game-details">
                        </p>
                    </div>
                </div>
            `;
        }
        
    },
    document.getElementById("show-all-nfl").addEventListener("click", showAllNFL));
    currentView = 'showLess';
};

const showAllNFL = () => {
    sportsDiv.innerHTML = `
        <h1>All NFL Games Today</h1>
        <button id="back-to-all">Back</button>
    `;
    mlbData.innerHTML = '';
    nflData.innerHTML = '';
    nflName.innerHTML = '';
    cfbData.innerHTML = '';
    cfbName.innerHTML = '';
    const nflHalfTime = sportsData.NFL.slice(0, sportsData.NFL.length).filter(event => event.status.type.name === "STATUS_HALFTIME");
    const nflInProgress = sportsData.NFL.slice(0, sportsData.NFL.length).filter(event => event.status.type.name === "STATUS_IN_PROGRESS");
    const nflScheduled = sportsData.NFL.slice(0, sportsData.NFL.length).filter(event => event.status.type.name === "STATUS_SCHEDULED");
    const nflFinal = sportsData.NFL.slice(0, sportsData.NFL.length).filter(event => event.status.type.name === "STATUS_FINAL");
    const longNFLList = [...nflInProgress, ...nflHalfTime, ...nflScheduled, ...nflFinal];
    longNFLList.forEach(event => {
        const awayTeam = event.competitions[0].competitors[1].team.displayName;
        const homeTeam = event.competitions[0].competitors[0].team.displayName;
        const gameStatus = event.status.type.shortDetail;
        const awayScore = event.competitions[0].competitors[1].score;
        const homeScore = event.competitions[0].competitors[0].score;
        const time = event.status.type.detail;
        const situation = event.competitions[0].situation || null;
        const ballPosition = situation && situation.downDistanceText ? situation.downDistanceText : 'Switching Possession';
        const possession = situation && situation.possession ? situation.possession : '';
        let awayID = event.competitions[0].competitors[1].id;
        let homeID = event.competitions[0].competitors[0].id;
        awayID = possession === awayID ? "🏈" : "";
        homeID = possession === homeID ? "🏈" : "";
        if(event.status.type.name === "STATUS_IN_PROGRESS") {
            nflData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayTeam} -  ${awayScore} ${awayID}</br>
                            ${homeTeam} -  ${homeScore} ${homeID}</br></br>
                        </p>
                        <p class="game-details">
                            ${ballPosition}
                        </p>
                    </div>
                </div>
            `;
        }
        if(event.status.type.name === "STATUS_HALFTIME") {
            nflData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayTeam} -  ${awayScore} </br>
                            ${homeTeam} -  ${homeScore} </br></br>
                        </p>
                        <p class="game-details">
                        </p>
                    </div>
                </div>
            `;
        }
        if(event.status.type.name === "STATUS_SCHEDULED") {
            nflData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayTeam} </br>
                            ${homeTeam}
                        </p>
                        <p class="game-details">
                        </p>
                    </div>
                </div>
            `;
        }
        if(event.status.type.name === "STATUS_FINAL") {
            nflData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayTeam} -  ${awayScore} </br>
                            ${homeTeam} -  ${homeScore} </br></br>
                        </p>
                        <p class="game-details">
                        </p>
                    </div>
                </div>
            `;
        }
    },
    document.getElementById("back-to-all").addEventListener("click", showNothing));
    currentView = 'nfl';
}

const showLessCFB = () => {
    cfbData.innerHTML = '';
    cfbName.innerHTML = `<h3 id="show-all-cfb">CFB</h3>`;
    const cfbHalfTime = sportsData.CFB.slice(0, sportsData.CFB.length).filter(event => event.status.type.name === "STATUS_HALFTIME");
    const cfbInProgress = sportsData.CFB.slice(0, sportsData.CFB.length).filter(event => event.status.type.name === "STATUS_IN_PROGRESS");
    const cfbScheduled = sportsData.CFB.slice(0, sportsData.CFB.length).filter(event => event.status.type.name === "STATUS_SCHEDULED");
    const cfgGames = cfbHalfTime.length + cfbInProgress.length + cfbScheduled.length;
    if (!sportsData.CFB || cfgGames == 0) {
        cfbData.innerHTML = `<h4>No CFB games available.</h4>`;
    }
    const cfbSmallList = [...cfbInProgress, ...cfbHalfTime, ...cfbScheduled].slice(0, 3);
    cfbSmallList.forEach(event => {
        const awayTeam = event.competitions[0].competitors[1].team.shortDisplayName;
        const homeTeam = event.competitions[0].competitors[0].team.shortDisplayName;
        let awayID = event.competitions[0].competitors[1].id;
        let homeID = event.competitions[0].competitors[0].id;
        const gameStatus = event.status.type.shortDetail;
        const awayScore = event.competitions[0].competitors[1].score;
        const homeScore = event.competitions[0].competitors[0].score;
        const time = event.status.type.detail;
        let awayRank = event.competitions[0].competitors[1].curatedRank.current;
        let homeRank = event.competitions[0].competitors[0].curatedRank.current;
        awayRank = awayRank > 25 ? "" : awayRank;
        homeRank = homeRank > 25 ? "" : homeRank;
        const situation = event.competitions[0].situation || null;
        const ballPosition = situation && situation.downDistanceText ? situation.downDistanceText : 'Switching Possession';
        const possession = situation && situation.possession ? situation.possession : '';
        awayID = possession === awayID ? "🏈" : "";
        homeID = possession === homeID ? "🏈" : "";
        if(event.status.type.name === "STATUS_IN_PROGRESS") {
            cfbData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayRank} ${awayTeam} -  ${awayScore} ${awayID}</br>
                            ${homeRank} ${homeTeam} -  ${homeScore} ${homeID}</br></br>
                        </p>
                        <p class="game-details">
                            ${ballPosition}
                        </p>
                    </div>
                </div>
            `;
        }
        if(event.status.type.name === "STATUS_HALFTIME") {
            cfbData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayRank} ${awayTeam} -  ${awayScore} </br>
                            ${homeRank} ${homeTeam} -  ${homeScore} </br></br>
                        </p>
                        <p class="game-details">
                        </p>
                    </div>
                </div>
            `;
        }
        if(event.status.type.name === "STATUS_SCHEDULED") {
            cfbData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayRank} ${awayTeam} </br>
                            ${homeRank} ${homeTeam}
                        </p>
                        <p class="game-details">
                        </p>
                    </div>
                </div>
            `;
        }
    }),
    document.getElementById("show-all-cfb").addEventListener("click", showAllCFB);
    currentView = 'showLess';
}

const showAllCFB = () => {
    sportsDiv.innerHTML = `
        <h1>All Ranked CFB Games</h1>
        <button id="back-to">Back</button>
    `;
    mlbData.innerHTML = '';
    nflData.innerHTML = '';
    nflName.innerHTML = '';
    cfbData.innerHTML = '';
    cfbName.innerHTML = '';
    const cfbHalfTime = sportsData.CFB.slice(0, sportsData.CFB.length).filter(event => event.status.type.name === "STATUS_HALFTIME");
    const cfbInProgress = sportsData.CFB.slice(0, sportsData.CFB.length).filter(event => event.status.type.name === "STATUS_IN_PROGRESS");
    const cfbScheduled = sportsData.CFB.slice(0, sportsData.CFB.length).filter(event => event.status.type.name === "STATUS_SCHEDULED");
    const cfbFinal = sportsData.CFB.slice(0, sportsData.CFB.length).filter(event => event.status.type.name === "STATUS_FINAL");
    const cfbSmallList = [...cfbInProgress, ...cfbHalfTime, ...cfbScheduled, ...cfbFinal];
    cfbSmallList.forEach(event => {
        const awayTeam = event.competitions[0].competitors[1].team.shortDisplayName;
        const homeTeam = event.competitions[0].competitors[0].team.shortDisplayName;
        let awayID = event.competitions[0].competitors[1].id;
        let homeID = event.competitions[0].competitors[0].id;
        const gameStatus = event.status.type.shortDetail;
        const awayScore = event.competitions[0].competitors[1].score;
        const homeScore = event.competitions[0].competitors[0].score;
        const time = event.status.type.detail;
        let awayRank = event.competitions[0].competitors[1].curatedRank.current;
        let homeRank = event.competitions[0].competitors[0].curatedRank.current;
        awayRank = awayRank > 25 ? "" : awayRank;
        homeRank = homeRank > 25 ? "" : homeRank;
        const situation = event.competitions[0].situation || null;
        const ballPosition = situation && situation.downDistanceText ? situation.downDistanceText : 'Switching Possession';
        const possession = situation && situation.possession ? situation.possession : '';
        awayID = possession === awayID ? "🏈" : "";
        homeID = possession === homeID ? "🏈" : "";
        if(event.status.type.name === "STATUS_IN_PROGRESS") {
            cfbData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayRank} ${awayTeam} -  ${awayScore} ${awayID}</br>
                            ${homeRank} ${homeTeam} -  ${homeScore} ${homeID}</br></br>
                        </p>
                        <p class="game-details">
                            ${ballPosition}
                        </p>
                    </div>
                </div>
            `;
        }
        if(event.status.type.name === "STATUS_HALFTIME") {
            cfbData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayRank} ${awayTeam} -  ${awayScore} </br>
                            ${homeRank} ${homeTeam} -  ${homeScore} </br></br>
                        </p>
                        <p class="game-details">
                        </p>
                    </div>
                </div>
            `;
        }
        if(event.status.type.name === "STATUS_SCHEDULED") {
            cfbData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayRank} ${awayTeam} -  ${awayScore} </br>
                            ${homeRank} ${homeTeam} -  ${homeScore} </br></br>
                        </p>
                        <p class="game-details">
                        </p>
                    </div>
                </div>
            `;
        }
        if(event.status.type.name === "STATUS_FINAL") {
            cfbData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayRank} ${awayTeam} </br>
                            ${homeRank} ${homeTeam} </br></br>
                        </p>
                        <p class="game-details">
                        </p>
                    </div>
                </div>
            `;
        }
    }),
    document.getElementById("back-to").addEventListener("click", showNothing);
    currentView = 'cfb';
}


fetchGamesData().then(() => setInterval(fetchGamesData, 1000));
