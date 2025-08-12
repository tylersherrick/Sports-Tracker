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
let selectedGameId = null;
let nextLine = `</br></br>`;

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
        showLessNFL();
    } 
    if (currentView === 'mlb') {
        showAllMLB();
    }
    if (currentView === 'nfl') {
        showAllNFL();
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
    if(currentView === 'individualMLBGame') {
        individualMLBGame();
    }
};

const showNothing = () => {
    currentView = 'showLess';
}

fetchGamesData().then(() => {
    setInterval(() => {
        fetchGamesData().then(() => {
            if(currentView === 'individualMLBGame' && selectedGameId) {
                individualMLBGame(selectedGameId);
            } else {
                updateViews();
            }
        });
    }, 1000);
});

const clearAllSections = () => {
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
};

function mlbVariables(game) {
    return {
        gameId: game.id,
        homeTeam: game.competitions[0].competitors[0].team.displayName,
        awayTeam: game.competitions[0].competitors[1].team.displayName,
        homeScore: game.competitions[0].competitors[0].score,
        awayScore: game.competitions[0].competitors[1].score,
        futureWeather: game.weather?.displayValue || "",
        currentWeather: game.weather?.conditionId || "",
        temperature: game.weather?.temperature || "",
        venue: game.competitions[0].venue.fullName,
        gameSummary: game.competitions[0].headlines?.[0]?.description,
        preGameMessage: game.competitions[0].headlines?.[0]?.shortLinkText,
        lastPlay: game.competitions[0].situation?.lastPlay?.text ? game.competitions[0].situation.lastPlay.text : "",
        attendance: game.competitions[0].attendance,
        gameStatus: game.status.type.description,
        teamsPlaying: game.status.type.shortDetail,
        balls: game.competitions[0].situation?.balls ?? 0,
        strikes: game.competitions[0].situation?.strikes ?? 0,
        outs: game.competitions[0].outsText,
        inning: game.status.type.detail,
        inningStatus: game.competitions[0].situation?.lastPlay?.type.text || "",
        currentBatter: game.competitions[0].situation?.batter?.athlete?.displayName || "",
        currentBatterId: game.competitions[0].situation?.batter?.athlete?.team?.id || "",
        currentPitcher: game.competitions[0].situation?.pitcher?.athlete?.displayName || "",
        gameShortDetail: game.status.type.shortDetail,
        onFirst: game.competitions[0].situation?.onFirst ?? false,
        onSecond: game.competitions[0].situation?.onSecond ?? false,
        onThird: game.competitions[0].situation?.onThird ?? false,
        homeLogo: game.competitions[0].competitors[0].team.logo,
        awayLogo: game.competitions[0].competitors[1].team.logo,
        homeOverallRecord: game.competitions[0].competitors[0].records[0]?.summary,
        homeHomeRecord: game.competitions[0].competitors[0].records[1]?.summary,
        homeAwayRecord: game.competitions[0].competitors[0].records[2]?.summary,
        awayOverallRecord: game.competitions[0].competitors[1].records[0]?.summary,
        awayHomeRecord: game.competitions[0].competitors[1].records[1]?.summary,
        awayAwayRecord: game.competitions[0].competitors[1].records[2]?.summary,
        probableHomeStarter: game.competitions[0].competitors[0].probables?.[0]?.athlete?.displayName,
        probableAwayStarter: game.competitions[0].competitors[1].probables?.[0]?.athlete?.displayName,
        probableHomeStarterStats: game.competitions[0].competitors[0].probables?.[0]?.record || "",
        probableAwayStarterStats: game.competitions[0].competitors[1].probables?.[0]?.record || "",
        battingTeamId: game.competitions[0].situation?.batter?.athlete?.team?.id,
        homeTeamId: game.competitions[0].competitors[0].team.id,
        awayTeamId: game.competitions[0].competitors[1].team.id,
    };
}

const individualMLBGame = (gameId) => {
    if (!gameId) gameId = selectedGameId;
    // Clear other sections
    clearAllSections();

    selectedGameId = gameId;
    currentView = "individualMLBGame";
    
    // Find the game by ID
    const game = sportsData.MLB.find(g => g.id === gameId);
    if(!game) return;
    const mlb = mlbVariables(game);
    let scheduledWeather = `Expected Weather: ${mlb.futureWeather} and ${mlb.temperature}°${nextLine}`;
    let activeWeather = `${mlb.currentWeather} and ${mlb.temperature}° at ${mlb.venue}`;
    let ballsStrikesOuts = `${mlb.inning}${nextLine}${mlb.balls}-${mlb.strikes} - ${mlb.outs}${nextLine}`;
    let currentMatchup = `${mlb.currentPitcher} pitching to - ${mlb.currentBatter}${nextLine}`;

    if(mlb.inningStatus === "End Inning") {
        ballsStrikesOuts = "";
        currentMatchup = "";
    }
    if(mlb.inningStatus === "Start Batter/Pitcher") {
        currentMatchup = "";
    }
    if(!isNaN(Number(mlb.futureWeather))) {
        scheduledWeather = `Expected Weather: ${mlb.currentWeather} and ${mlb.temperature}°${nextLine}`;
    }
    if(mlb.futureWeather === "") {
        scheduledWeather = "";
    }
    sportsDiv.innerHTML = `
        <h1>${mlb.awayTeam} at ${mlb.homeTeam}</h1>
        <p id="game-status"></p>
        <button id="mlb-scores">MLB Games</button>
        </br></br>
        <button id="back-button">All Games</button>
    `;
    let individualId = document.getElementById("game-status");
    let gameStatus = mlb.gameStatus;

    if (gameStatus === "Final") {
        individualId.innerHTML = `
            <p id="mlb-data" class="game-details"> 
                Final Score: ${nextLine}
                ${mlb.awayTeam}: ${mlb.awayScore} ${nextLine}
                ${mlb.homeTeam}: ${mlb.homeScore} ${nextLine}
                ${mlb.gameSummary}
                Attendance: ${mlb.attendance}
            </p>
        `;
    }

    if (gameStatus === "Scheduled") {
        individualId.innerHTML = `
            <p id="mlb-data" class="game-details"> 
                Game status: ${gameStatus} ${nextLine}
                ${mlb.teamsPlaying} ${nextLine}
                ${mlb.preGameMessage} ${nextLine}
                ${scheduledWeather}
                Hosted at: ${mlb.venue} ${nextLine}${nextLine}
                ${mlb.homeTeam}: ${mlb.homeOverallRecord} ${nextLine}
                Pitching Today: ${mlb.probableHomeStarter} - ${mlb.probableHomeStarterStats.slice(1, -1)} ERA
                ${nextLine}${nextLine}
                ${mlb.awayTeam}: ${mlb.awayOverallRecord} ${nextLine}
                Pitching Today: ${mlb.probableAwayStarter} - ${mlb.probableAwayStarterStats.slice(1, -1)} ERA
            </p>
        `;
    }

    if (gameStatus === "In Progress") {
        individualId.innerHTML = `
            <p id="mlb-data" class="game-details">    
                ${mlb.awayTeam} : ${mlb.awayScore} ${nextLine}
                ${mlb.homeTeam} : ${mlb.homeScore} ${nextLine}
                ${ballsStrikesOuts}
                ${currentMatchup}
                ${mlb.lastPlay} ${nextLine}
                ${activeWeather} ${nextLine}
            </p>
    `;
    }

  document.getElementById('back-button').addEventListener('click', () => {
    currentView = 'showLess';
    updateViews();
  });
  document.getElementById('mlb-scores').addEventListener('click', () => {
    currentView = 'mlb';
    updateViews();
  })
};


const showLessMLB = () => {
    sportsDiv.innerHTML = `<h1>Todays Sporting Events</h1>`;
    sportsDiv.innerHTML += `<h3 id="show-all-mlb">MLB</h3>`;
    mlbData.innerHTML = ``;
    const inProgress = sportsData.MLB.filter(event => event.status.type.name === "STATUS_IN_PROGRESS");
    const yetToStart = sportsData.MLB.filter(event => event.status.type.name === "STATUS_SCHEDULED");
    const limitedGames = [...inProgress, ...yetToStart].slice(0, 3);
    const gameTotal = limitedGames.length;
    limitedGames.forEach(event => {
        const mlb = mlbVariables(event);
        if (event.status.type.name === "STATUS_IN_PROGRESS") {
            mlbData.innerHTML += `
                <div id="${mlb.gameId}" class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${mlb.inning} </br></br>
                            ${mlb.awayTeam} -  ${mlb.awayScore} </br>
                            ${mlb.homeTeam} -  ${mlb.homeScore}
                        </p>
                        <p class="game-details">
                            ${mlb.balls}-${mlb.strikes} - ${mlb.outs}
                        </p>
                    </div>
                    <div class="base-map">
                        <div class="base first-base ${mlb.onFirst ? 'occupied' : ''}"></div>
                        <div class="base second-base ${mlb.onSecond ? 'occupied' : ''}"></div>
                        <div class="base third-base ${mlb.onThird ? 'occupied' : ''}"></div>
                    </div>
                </div>
            `;
        }
        if (event.status.type.name === "STATUS_SCHEDULED") {
            mlbData.innerHTML += `
                <div id="${mlb.gameId}" class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                        ${mlb.inning} ${mlb.gameShortDetail} </br></br>
                        ${mlb.awayTeam} </br>
                        ${mlb.homeTeam}
                        </p>
                        <p class="game-details">
                            
                        </p>
                    </div>
                </div>
            `;
        }
    });
    if (limitedGames.length === 0) {
        mlbData.innerHTML = `<h4>There are no active games.</h4>`;
    }
    // Attach click listeners to all game rows
    document.querySelectorAll('.game-row').forEach(row => {
        row.addEventListener('click', (event) => {
            individualMLBGame(event.currentTarget.id);
        });
    });

    document.getElementById("show-all-mlb").addEventListener("click", showAllMLB);
    currentView = 'showLess';
};

const showAllMLB = () => {
    sportsDiv.innerHTML = `
        <h1>All MLB Games Today</h1>
        <button id="back-to-main">Back</button>
    `;
    clearAllSections();
    const inProgress = sportsData.MLB.filter(event => event.status.type.name === "STATUS_IN_PROGRESS");
    const yetToStart = sportsData.MLB.filter(event => event.status.type.name === "STATUS_SCHEDULED");
    const alreadyFinal = sportsData.MLB.filter(event => event.status.type.name === "STATUS_FINAL");
    const longGamesList = [...inProgress, ...yetToStart, ...alreadyFinal];
    longGamesList.forEach(event => {
        const mlb = mlbVariables(event);
        if (event.status.type.name === "STATUS_IN_PROGRESS") {
            mlbData.innerHTML += `
                <div id="${mlb.gameId}" class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${mlb.inning} </br></br>
                            ${mlb.awayTeam} - ${mlb.awayScore} </br>
                            ${mlb.homeTeam} - ${mlb.homeScore}
                        </p>
                        <p class="game-details">
                            ${mlb.balls}-${mlb.strikes} - ${mlb.outs}
                        </p>
                    </div>
                    <div class="base-map">
                        <div class="base first-base ${mlb.onFirst ? 'occupied' : ''}"></div>
                        <div class="base second-base ${mlb.onSecond ? 'occupied' : ''}"></div>
                        <div class="base third-base ${mlb.onThird ? 'occupied' : ''}"></div>
                    </div>
                </div>
            `;
        }
        if (event.status.type.name === "STATUS_SCHEDULED") {
            mlbData.innerHTML += `
                <div id="${mlb.gameId}" class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${mlb.inning} ${mlb.gameShortDetail} </br></br>
                            ${mlb.awayTeam} </br>
                            ${mlb.homeTeam}
                        </p>
                        <p class="game-details"></p>
                    </div>
                </div>
            `;
        }
        if (event.status.type.name === "STATUS_FINAL") {
            mlbData.innerHTML += `
                <div id="${mlb.gameId}" class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${mlb.inning} </br></br>
                            ${mlb.awayTeam} - ${mlb.awayScore} </br>
                            ${mlb.homeTeam} - ${mlb.homeScore}
                        </p>
                        <p class="game-details"></p>
                    </div>
                </div>
            `;
        }
    });
    document.getElementById("back-to-main").addEventListener("click", showNothing);
    document.querySelectorAll('.game-row').forEach(row => {
        row.addEventListener('click', (event) => {
            individualMLBGame(event.currentTarget.id);
        });
    });
    currentView = 'mlb';
};


const showLessNFL = () => {
    
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






