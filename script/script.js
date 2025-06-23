const sportsDiv = document.getElementById("sports-data");
const mlbData = document.getElementById("mlb-data");
const nflName = document.getElementById("nfl-name")
const nflData = document.getElementById("nfl-data");
const cfbName = document.getElementById("cfb-name")
const cfbData = document.getElementById("cfb-data");
const nhlData = document.getElementById("nhl-data");
const nhlName = document.getElementById("nhl-name");
const nbaData = document.getElementById("nba-data");
const nbaName = document.getElementById("nba-name");
const cbbName = document.getElementById("cbb-name");
const cbbData = document.getElementById("cbb-data");
const sportsData = { MLB: [], NFL: [], CFB: [], NHL: [], NBA: [], CBB: [] };
let currentView = 'showLess';

const fetchGamesData = async () => {
    try {
        const mlbURL = 'https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard';
        const nflURL = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';
        const cfbURL = 'https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard';
        const nhlURL = 'https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard';
        const nbaURL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard';
        const cbbURL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard';
        const [mlbResponse, nflResponse, cfbResponse, nhlResponse, nbaResponse, cbbResponse] = await Promise.all([
            fetch(mlbURL),
            fetch(nflURL),
            fetch(cfbURL),
            fetch(nhlURL),
            fetch(nbaURL),
            fetch(cbbURL)
        ]);
        const mlbData = await mlbResponse.json();
        const nflData = await nflResponse.json();
        const cfbData = await cfbResponse.json();
        const nhlData = await nhlResponse.json();
        const nbaData = await nbaResponse.json();
        const cbbData = await cbbResponse.json();
        sportsData.MLB = mlbData.events;
        sportsData.NFL = nflData.events;
        sportsData.CFB = cfbData.events;
        sportsData.NHL = nhlData.events;
        sportsData.NBA = nbaData.events;
        sportsData.CBB = cbbData.events;
        console.log(sportsData);
        updateViews();
    } catch (error) {
        console.error('Error fetching sports data:', error);
    }
};


const updateViews = () => {
    if (currentView === 'showLess') {
        showLessMLB();
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
    if (currentView === 'nhl') {
        showAllNHL();
    }
    if (currentView === 'nba') {
        showAllNBA();
    }
    if(currentView === 'cbb') {
        showAllCBB();
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
        const gameId = event.id;
        if (event.status.type.name === "STATUS_IN_PROGRESS") {
            mlbData.innerHTML += `
                <div id="${gameId}" class="game-row">
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
                <div id="${gameId}" class="game-row">
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
    nhlName.innerHTML = '';
    nhlData.innerHTML = '';
    nbaName.innerHTML = '';
    nbaData.innerHTML = '';
    cbbData.innerHTML = '';
    cbbName.innerHTML = '';
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
    sportsDiv.innerHTML = `<h1>Todays Sporting Events</h1>`;
    nflData.innerHTML = '';
    nflName.innerHTML = '<h3 id="show-all-nfl">NFL</h3>';
    const nflHalfTime = sportsData.NFL.slice(0, sportsData.NFL.length).filter(event => event.status.type.name === "STATUS_HALFTIME");
    const nflInProgress = sportsData.NFL.slice(0, sportsData.NFL.length).filter(event => event.status.type.name === "STATUS_IN_PROGRESS");
    const nflScheduled = sportsData.NFL.slice(0, sportsData.NFL.length).filter(event => event.status.type.name === "STATUS_SCHEDULED");
    const nflEndQuarter = sportsData.NFL.slice(0, sportsData.NFL.length).filter(event => event.status.type.name === "STATUS_END_PERIOD");
    const smallNFLList = [...nflInProgress, ...nflHalfTime, ...nflEndQuarter, ...nflScheduled].slice(0, 3);
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
        if(event.status.type.name === "STATUS_END_PERIOD") {
            nflData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayTeam} -  ${awayScore} </br>
                            ${homeTeam} -  ${homeScore} </br></br>
                        </p>
                        <p class="game-details">
                            End of Quarter
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
    if (smallNFLList.length === 0) {
        nflData.innerHTML += `<h4>There are no active games.</h4>`
    }
};

const showAllNFL = () => {
    sportsDiv.innerHTML = `
        <h1>All NFL Games</h1>
        <button id="back-to-all">Back</button>
    `;
    mlbData.innerHTML = '';
    nflData.innerHTML = '';
    nflName.innerHTML = '';
    cfbData.innerHTML = '';
    cfbName.innerHTML = '';
    nhlName.innerHTML = '';
    nhlData.innerHTML = '';
    nbaName.innerHTML = '';
    nbaData.innerHTML = '';
    cbbData.innerHTML = '';
    cbbName.innerHTML = '';
    const nflHalfTime = sportsData.NFL.slice(0, sportsData.NFL.length).filter(event => event.status.type.name === "STATUS_HALFTIME");
    const nflInProgress = sportsData.NFL.slice(0, sportsData.NFL.length).filter(event => event.status.type.name === "STATUS_IN_PROGRESS");
    const nflEndQuarter = sportsData.NFL.slice(0, sportsData.NFL.length).filter(event => event.status.type.name === "STATUS_END_PERIOD");
    const nflScheduled = sportsData.NFL.slice(0, sportsData.NFL.length).filter(event => event.status.type.name === "STATUS_SCHEDULED");
    const nflFinal = sportsData.NFL.slice(0, sportsData.NFL.length).filter(event => event.status.type.name === "STATUS_FINAL");
    const longNFLList = [...nflInProgress, ...nflHalfTime, ...nflEndQuarter, ...nflScheduled, ...nflFinal];
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
        if(event.status.type.name === "STATUS_END_PERIOD") {
            nflData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayTeam} -  ${awayScore} </br>
                            ${homeTeam} -  ${homeScore} </br></br>
                        </p>
                        <p class="game-details">
                            End of Quarter
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
    const cfbEndofQuarter = sportsData.CFB.slice(0, sportsData.CFB.length).filter(event => event.status.type.name === "STATUS_END_PERIOD");
    const cfgGames = cfbHalfTime.length + cfbInProgress.length + cfbScheduled.length;
    if (!sportsData.CFB || cfgGames == 0) {
        cfbData.innerHTML = `<h4>No CFB games available.</h4>`;
    }
    const cfbSmallList = [...cfbInProgress, ...cfbHalfTime,...cfbEndofQuarter , ...cfbScheduled].slice(0, 3);
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
        if(event.status.type.name === "STATUS_END_PERIOD") {
            cfbData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayRank} ${awayTeam} -  ${awayScore} </br>
                            ${homeRank} ${homeTeam} -  ${homeScore} </br></br>
                        </p>
                        <p class="game-details">
                            End of Quarter
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
                            Halftime
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
    nhlName.innerHTML = '';
    nhlData.innerHTML = '';
    nbaName.innerHTML = '';
    nbaData.innerHTML = '';
    cbbData.innerHTML = '';
    cbbName.innerHTML = '';
    const cfbHalfTime = sportsData.CFB.slice(0, sportsData.CFB.length).filter(event => event.status.type.name === "STATUS_HALFTIME");
    const cfbInProgress = sportsData.CFB.slice(0, sportsData.CFB.length).filter(event => event.status.type.name === "STATUS_IN_PROGRESS");
    const cfbScheduled = sportsData.CFB.slice(0, sportsData.CFB.length).filter(event => event.status.type.name === "STATUS_SCHEDULED");
    const cfbFinal = sportsData.CFB.slice(0, sportsData.CFB.length).filter(event => event.status.type.name === "STATUS_FINAL");
    const cfbEndofQuarter = sportsData.CFB.slice(0, sportsData.CFB.length).filter(event => event.status.type.name === "STATUS_END_PERIOD");
    const cfbSmallList = [...cfbInProgress, ...cfbHalfTime, ...cfbEndofQuarter, ...cfbScheduled, ...cfbFinal];
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
                            Halftime
                        </p>
                    </div>
                </div>
            `;
        }
        if(event.status.type.name === "STATUS_END_PERIOD") {
            cfbData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayRank} ${awayTeam} -  ${awayScore} </br>
                            ${homeRank} ${homeTeam} -  ${homeScore} </br></br>
                        </p>
                        <p class="game-details">
                            End of Quarter
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
                            ${homeRank} ${homeTeam} </br></br>
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
                            ${awayRank} ${awayTeam} -  ${awayScore} </br>
                            ${homeRank} ${homeTeam} -  ${homeScore} </br></br>
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

const showLessNHL = () => {
    nhlData.innerHTML = '';
    nhlName.innerHTML = `<h3 id="show-all-nhl">NHL</h3>`;
    const nhlYetToStart = sportsData.NHL.slice(0, sportsData.NHL.length).filter(event => event.status.type.name === "STATUS_SCHEDULED");
    const nhlInProgress = sportsData.NHL.slice(0, sportsData.NHL.length).filter(event => event.status.type.name === "STATUS_IN_PROGRESS");
    const nhlEndofPeriod = sportsData.NHL.slice(0, sportsData.NHL.length).filter(event => event.status.type.name === "STATUS_END_PERIOD");
    const nhlSmallList = [...nhlInProgress, ...nhlEndofPeriod, ...nhlYetToStart].slice(0, 3);
    if (!sportsData.NHL || nhlSmallList == 0) {
        nhlData.innerHTML = `<h4>No NHL games available.</h4>`;
    }
    nhlSmallList.forEach(event => {
        const awayTeam = event.competitions[0].competitors[1].team.displayName;
        const homeTeam = event.competitions[0].competitors[0].team.displayName;
        const awayScore = event.competitions[0].competitors[1].score;
        const homeScore = event.competitions[0].competitors[0].score;
        const time = event.status.type.detail;
        if(event.status.type.name === "STATUS_IN_PROGRESS") {
            nhlData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayTeam} - ${awayScore} </br>
                            ${homeTeam} - ${homeScore}
                        </p>
                        <p class="game-details">
                        </p>
                    </div>
                </div>
            `;
        }
        if(event.status.type.name === "STATUS_END_PERIOD") {
            nhlData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayTeam} - ${awayScore} </br>
                            ${homeTeam} - ${homeScore}
                        </p>
                        <p class="game-details">
                            End of Period
                        </p>
                    </div>
                </div>
            `;
        }
        if(event.status.type.name === "STATUS_SCHEDULED") {
            nhlData.innerHTML += `
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
    })
    if(nhlSmallList === 0) {
        nhlData.innerHTML += `<h4>There are no active games.</h4.`;
    }
    document.getElementById("show-all-nhl").addEventListener("click", showAllNHL);
    currentView = 'showLess';
}

const showAllNHL = () => {
    sportsDiv.innerHTML = `
        <h1>All NHL Games Today</h1>
        <button id="back-to-main">Back</button>
    `;
    mlbData.innerHTML = '';
    nflData.innerHTML = '';
    nflName.innerHTML = '';
    cfbData.innerHTML = '';
    cfbName.innerHTML = '';
    nhlName.innerHTML = '';
    nhlData.innerHTML = '';
    nbaName.innerHTML = '';
    nbaData.innerHTML = '';
    cbbData.innerHTML = '';
    cbbName.innerHTML = '';
    const nhlYetToStart = sportsData.NHL.slice(0, sportsData.NHL.length).filter(event => event.status.type.name === "STATUS_SCHEDULED");
    const nhlInProgress = sportsData.NHL.slice(0, sportsData.NHL.length).filter(event => event.status.type.name === "STATUS_IN_PROGRESS");
    const nhlEndofPeriod = sportsData.NHL.slice(0, sportsData.NHL.length).filter(event => event.status.type.name === "STATUS_END_PERIOD");
    const nhlFinal = sportsData.NHL.slice(0, sportsData.NHL.length).filter(event => event.status.type.name === "STATUS_FINAL");
    const nhlLongList = [...nhlInProgress,, ...nhlEndofPeriod, ...nhlYetToStart, ...nhlFinal];
    nhlLongList.forEach(event => {
        const awayTeam = event.competitions[0].competitors[1].team.displayName;
        const homeTeam = event.competitions[0].competitors[0].team.displayName;
        const awayScore = event.competitions[0].competitors[1].score;
        const homeScore = event.competitions[0].competitors[0].score;
        const time = event.status.type.detail;
        if(event.status.type.name === "STATUS_IN_PROGRESS") {
            nhlData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayTeam} - ${awayScore} </br>
                            ${homeTeam} - ${homeScore}
                        </p>
                        <p class="game-details">
                        </p>
                    </div>
                </div>
            `;
        }
        if(event.status.type.name === "STATUS_END_PERIOD") {
            nhlData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayTeam} - ${awayScore} </br>
                            ${homeTeam} - ${homeScore}
                        </p>
                        <p class="game-details">
                            End of Period
                        </p>
                    </div>
                </div>
            `;
        }
        if(event.status.type.name === "STATUS_SCHEDULED") {
            nhlData.innerHTML += `
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
            nhlData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayTeam} - ${awayScore} </br>
                            ${homeTeam} - ${homeScore}
                        </p>
                        <p class="game-details">
                        </p>
                    </div>
                </div>
            `;
        }
    });
    if(nhlLongList === 0) {
        nhlData.innerHTML += `<h4>There are no active games.</h4.`;
    }
    document.getElementById("back-to-main").addEventListener("click", showNothing);
    currentView = 'nhl';
}

const showLessNBA = () => {
    nbaData.innerHTML = '';
    nbaName.innerHTML = `<h3 id="show-all-nba">NBA</h3>`;
    const nbaYetToStart = sportsData.NBA.slice(0, sportsData.NBA.length).filter(event => event.status.type.name === "STATUS_SCHEDULED");
    const nbaInProgress = sportsData.NBA.slice(0, sportsData.NBA.length).filter(event => event.status.type.name === "STATUS_IN_PROGRESS");
    const nbaEndofQuarter = sportsData.NBA.slice(0, sportsData.NBA.length).filter(event => event.status.type.name === "STATUS_END_PERIOD");
    const nbaSmallList = [...nbaInProgress, ...nbaEndofQuarter, ...nbaYetToStart].slice(0, 3);
    if (!sportsData.NBA || nbaSmallList == 0) {
        nbaData.innerHTML = `<h4>No NBA games available.</h4>`;
    }
    nbaSmallList.forEach(event => {
        const awayTeam = event.competitions[0].competitors[1].team.displayName;
        const homeTeam = event.competitions[0].competitors[0].team.displayName;
        const awayScore = event.competitions[0].competitors[1].score;
        const homeScore = event.competitions[0].competitors[0].score;
        const time = event.status.type.detail;
        if(event.status.type.name === "STATUS_IN_PROGRESS") {
            nbaData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayTeam} - ${awayScore} </br>
                            ${homeTeam} - ${homeScore}
                        </p>
                        <p class="game-details">
                        </p>
                    </div>
                </div>
            `;
        }
        if(event.status.type.name === "STATUS_END_PERIOD") {
            nbaData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayTeam} - ${awayScore} </br>
                            ${homeTeam} - ${homeScore}
                        </p>
                        <p class="game-details">
                            End of Quarter
                        </p>
                    </div>
                </div>
            `;
        }
        if(event.status.type.name === "STATUS_SCHEDULED") {
            nbaData.innerHTML += `
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
    })
    if(nbaSmallList === 0) {
        nbaData.innerHTML += `<h4>There are no active games.</h4.`;
    }
    document.getElementById("show-all-nba").addEventListener("click", showAllNBA);
    currentView = 'showLess';
}

const showAllNBA = () => {
    sportsDiv.innerHTML = `
        <h1>All NBA Games Today</h1>
        <button id="back-to-main">Back</button>
    `;
    mlbData.innerHTML = '';
    nflData.innerHTML = '';
    nflName.innerHTML = '';
    cfbData.innerHTML = '';
    cfbName.innerHTML = '';
    nhlName.innerHTML = '';
    nhlData.innerHTML = '';
    nbaName.innerHTML = '';
    nbaData.innerHTML = '';
    cbbData.innerHTML = '';
    cbbName.innerHTML = '';
    const nbaYetToStart = sportsData.NBA.slice(0, sportsData.NBA.length).filter(event => event.status.type.name === "STATUS_SCHEDULED");
    const nbaInProgress = sportsData.NBA.slice(0, sportsData.NBA.length).filter(event => event.status.type.name === "STATUS_IN_PROGRESS");
    const nbaEndofQuarter = sportsData.NBA.slice(0, sportsData.NBA.length).filter(event => event.status.type.name === "STATUS_END_PERIOD");
    const nbaFinal = sportsData.NBA.slice(0, sportsData.NBA.length).filter(event => event.status.type.name === "STATUS_FINAL");
    const nbaLongList = [...nbaInProgress, ...nbaEndofQuarter, ...nbaYetToStart, ...nbaFinal];
    nbaLongList.forEach(event => {
        const awayTeam = event.competitions[0].competitors[1].team.displayName;
        const homeTeam = event.competitions[0].competitors[0].team.displayName;
        const awayScore = event.competitions[0].competitors[1].score;
        const homeScore = event.competitions[0].competitors[0].score;
        const time = event.status.type.detail;
        if(event.status.type.name === "STATUS_IN_PROGRESS") {
            nbaData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayTeam} - ${awayScore} </br>
                            ${homeTeam} - ${homeScore}
                        </p>
                        <p class="game-details">
                        </p>
                    </div>
                </div>
            `;
        }
        if(event.status.type.name === "STATUS_END_PERIOD") {
            nbaData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayTeam} - ${awayScore} </br>
                            ${homeTeam} - ${homeScore}
                        </p>
                        <p class="game-details">
                            End of Quarter
                        </p>
                    </div>
                </div>
            `;
        }
        if(event.status.type.name === "STATUS_SCHEDULED") {
            nbaData.innerHTML += `
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
            nbaData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayTeam} - ${awayScore} </br>
                            ${homeTeam} - ${homeScore}
                        </p>
                        <p class="game-details">
                        </p>
                    </div>
                </div>
            `;
        }
    });
    if(nbaLongList === 0) {
        nbaData.innerHTML += `<h4>There are no active games.</h4.`;
    }
    document.getElementById("back-to-main").addEventListener("click", showNothing);
    currentView = 'nba';
}

const showLessCBB = () => {
    cbbData.innerHTML = '';
    cbbName.innerHTML = `<h3 id="show-all-cbb">CBB</h3>`;
    const cbbYetToStart = sportsData.CBB.slice(0, sportsData.CBB.length).filter(event => event.status.type.name === "STATUS_SCHEDULED");
    const cbbInProgress = sportsData.CBB.slice(0, sportsData.CBB.length).filter(event => event.status.type.name === "STATUS_IN_PROGRESS");
    const cbbEndofQuarter = sportsData.CBB.slice(0, sportsData.CBB.length).filter(event => event.status.type.name === "STATUS_END_PERIOD");
    const cbbSmallList = [...cbbInProgress, ...cbbEndofQuarter, ...cbbYetToStart].slice(0, 3);
    if (!sportsData.CBB || cbbSmallList == 0) {
        cbbData.innerHTML = `<h4>No CBB games available.</h4>`;
    }
    cbbSmallList.forEach(event => {
        const awayTeam = event.competitions[0].competitors[1].team.displayName;
        const homeTeam = event.competitions[0].competitors[0].team.displayName;
        const awayScore = event.competitions[0].competitors[1].score;
        const homeScore = event.competitions[0].competitors[0].score;
        let awayRank = event.competitions[0].competitors[1].curatedRank.current;
        let homeRank = event.competitions[0].competitors[0].curatedRank.current;
        awayRank = awayRank > 25 ? "" : awayRank;
        homeRank = homeRank > 25 ? "" : homeRank;
        const time = event.status.type.detail;
        if(event.status.type.name === "STATUS_IN_PROGRESS") {
            cbbData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayRank}  ${awayTeam} - ${awayScore} </br>
                            ${homeRank}  ${homeTeam} - ${homeScore}
                        </p>
                        <p class="game-details">
                        </p>
                    </div>
                </div>
            `;
        }
        if(event.status.type.name === "STATUS_END_PERIOD") {
            cbbData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayRank} ${awayTeam} - ${awayScore} </br>
                            ${homeRank} ${homeTeam} - ${homeScore}
                        </p>
                        <p class="game-details">
                            End of Quarter
                        </p>
                    </div>
                </div>
            `;
        }
        if(event.status.type.name === "STATUS_SCHEDULED") {
            cbbData.innerHTML += `
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
    })
    if(cbbSmallList === 0) {
        cbbData.innerHTML += `<h4>There are no active games.</h4.`;
    }
    document.getElementById("show-all-cbb").addEventListener("click", showAllCBB);
    currentView = 'showLess';
}

const showAllCBB = () => {
    sportsDiv.innerHTML = `
        <h1>All CBB Games Today</h1>
        <button id="back-to-main">Back</button>
    `;
    mlbData.innerHTML = '';
    nflData.innerHTML = '';
    nflName.innerHTML = '';
    cfbData.innerHTML = '';
    cfbName.innerHTML = '';
    nhlName.innerHTML = '';
    nhlData.innerHTML = '';
    nbaName.innerHTML = '';
    nbaData.innerHTML = '';
    cbbData.innerHTML = '';
    cbbName.innerHTML = '';
    const cbbYetToStart = sportsData.CBB.slice(0, sportsData.CBB.length).filter(event => event.status.type.name === "STATUS_SCHEDULED");
    const cbbInProgress = sportsData.CBB.slice(0, sportsData.CBB.length).filter(event => event.status.type.name === "STATUS_IN_PROGRESS");
    const cbbEndofQuarter = sportsData.CBB.slice(0, sportsData.CBB.length).filter(event => event.status.type.name === "STATUS_END_PERIOD");
    const cbbFinal = sportsData.CBB.slice(0, sportsData.CBB.length).filter(event => event.status.type.name === "STATUS_FINAL");
    const cbbLongList = [...cbbInProgress, ...cbbEndofQuarter, ...cbbYetToStart, ...cbbFinal];
    cbbLongList.forEach(event => {
        const awayTeam = event.competitions[0].competitors[1].team.displayName;
        const homeTeam = event.competitions[0].competitors[0].team.displayName;
        const awayScore = event.competitions[0].competitors[1].score;
        const homeScore = event.competitions[0].competitors[0].score;
        let awayRank = event.competitions[0].competitors[1].curatedRank.current;
        let homeRank = event.competitions[0].competitors[0].curatedRank.current;
        awayRank = awayRank > 25 ? "" : awayRank;
        homeRank = homeRank > 25 ? "" : homeRank;
        const time = event.status.type.detail;
        if(event.status.type.name === "STATUS_IN_PROGRESS") {
            cbbData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayRank}  ${awayTeam} - ${awayScore} </br>
                            ${homeRank}  ${homeTeam} - ${homeScore}
                        </p>
                        <p class="game-details">
                        </p>
                    </div>
                </div>
            `;
        }
        if(event.status.type.name === "STATUS_END_PERIOD") {
            cbbData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayRank} ${awayTeam} - ${awayScore} </br>
                            ${homeRank} ${homeTeam} - ${homeScore}
                        </p>
                        <p class="game-details">
                            End of Quarter
                        </p>
                    </div>
                </div>
            `;
        }
        if(event.status.type.name === "STATUS_SCHEDULED") {
            cbbData.innerHTML += `
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
        if(event.status.type.name === "STATUS_FINAL") {
            cbbData.innerHTML += `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${time} </br></br>
                            ${awayRank} ${awayTeam} - ${awayScore} </br>
                            ${homeRank} ${homeTeam} - ${homeScore}
                        </p>
                        <p class="game-details">
                        </p>
                    </div>
                </div>
            `;
        }
    });
    if(cbbLongList === 0) {
        cbbData.innerHTML += `<h4>There are no active games.</h4.`;
    }
    document.getElementById("back-to-main").addEventListener("click", showNothing);
    currentView = 'cbb';
}

fetchGamesData().then(() => setInterval(fetchGamesData, 1000));

