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
let mlbState = "none";

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
        updateViews();
    } catch (error) {
        console.error('Error fetching sports data:', error);
    }
};

console.log(sportsData);

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
        individualMLBGame(selectedGameId);
    }
    if(currentView === 'individualNFLGame') {
        individualNFLGame(selectedGameId);
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
      }
      if(currentView === 'individualNFLGame' && selectedGameId) {
        individualNFLGame(selectedGameId);
      } 
      if(currentView === 'individualCFBGame' && selectedGameId) {
        individualCFBGame(selectedGameId);
      }
      else {
        updateViews();
      }

      // re-render stats if any team is selected
      if(mlbState !== "none") showStats(mlbState);
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

function hideStats() {
    let statsText = document.getElementById('team-stats');
    statsText.innerHTML = "";
}

function toggleStats(state) {
    if(state === mlbState) {
        mlbState = "none";
        hideStats();
    } else {
        mlbState = state;
        showStats(state);
    }
}

function showStats(state) {
    let statsText = document.getElementById('team-stats');
    if(state === "home") {
        statsText.innerHTML = `
            Home
        `;
    }
    if(state === "away") {
        statsText.innerHTML = `
            Away
        `;
    }
}

const individualMLBGame = (gameId) => {
    if (!gameId) gameId = selectedGameId;
    clearAllSections();
    selectedGameId = gameId;
    currentView = "individualMLBGame";
    const game = sportsData.MLB.find(g => g.id === gameId);
    if (!game) return;
    const mlb = mlbVariables(game);
    sportsDiv.innerHTML = `
        <p id="game-status">${mlb.renderIndividualView()}</p>
        <button id="mlb-scores">MLB Games</button>
        </br></br>
        <button id="back-button">All Games</button>
    `;
    document.getElementById('back-button').addEventListener('click', () => {
        currentView = 'showLess';
        updateViews();
    });
    document.getElementById('mlb-scores').addEventListener('click', () => {
        currentView = 'mlb';
        updateViews();
    });
};

const individualNFLGame = (gameId) => {
    if(!gameId) gameId = selectedGameId;
    clearAllSections();
    selectedGameId = gameId;
    currentView = "individualNFLGame";
    const game = sportsData.NFL.find(g => g.id === gameId);
    if(!game) return;
    const nfl = nflVariables(game);
    sportsDiv.innerHTML = `
        <p id="game-status">${nfl.renderIndividualView()}</p>
        <button id="nfl-scores">NFL Games</button>
        </br></br>
        <button id="back-button">All Games</button>
    `;
    document.getElementById('back-button').addEventListener('click', () => {
        currentView = 'showLess';
        updateViews();
    });
    document.getElementById('nfl-scores').addEventListener('click', () => {
        currentView = 'nfl';
        updateViews();
    });
};

const individualCFBGame = (gameId) => {
    if(!gameId) gameId = selectedGameId;
    clearAllSections();
    selectedGameId = gameId;
    currentView = "individualCFBGame";
    const game = sportsData.CFB.find(g => g.id === gameId);
    if(!game) return;
    const cfb = cfbVariables(game);
    cfb.awayRank = cfb.awayRank > 25 ? "" : cfb.awayRank;
    cfb.homeRank = cfb.homeRank > 25 ? "" : cfb.homeRank;
    sportsDiv.innerHTML = `
        <p id="game-status">${cfb.renderIndividualView()}</p>
        <button id="cfb-scores">CFB Games</button>
        </br></br>
        <button id="back-button">All Games</button>
    `;
    document.getElementById('back-button').addEventListener('click', () => {
        currentView = 'showLess';
        updateViews();
    });
    document.getElementById('cfb-scores').addEventListener('click', () => {
        currentView = 'cfb';
        updateViews();
    });
};

const showLessMLB = () => {
    sportsDiv.innerHTML = `<h1>Todays Sporting Events</h1>`;
    sportsDiv.innerHTML += `<h3 id="show-all-mlb">MLB</h3>`;
    mlbData.innerHTML = ``;
    const inProgress = sportsData.MLB.filter(event => event.status.type.name === "STATUS_IN_PROGRESS");
    const yetToStart = sportsData.MLB.filter(event => event.status.type.name === "STATUS_SCHEDULED");
    const alreadyFinal = sportsData.MLB.filter(event => event.status.type.name === "STATUS_FINAL");
    const limitedGames = [...inProgress, ...yetToStart, ...alreadyFinal].slice(0, 3);
    const gameTotal = limitedGames.length;
    limitedGames.forEach(event => {
        const mlb = mlbVariables(event);
        if (event.status.type.name === "STATUS_SCHEDULED") {
            mlbData.innerHTML += `<div class="hoverer">${mlb.scheduledGame()}</div>`;
        }
        if (event.status.type.name === "STATUS_IN_PROGRESS") {
            mlbData.innerHTML += `<div class="hoverer">${mlb.inProgressGame()}</div>`;
        }
        if (event.status.type.name === "STATUS_FINAL") {
            mlbData.innerHTML += `<div class="hoverer">${mlb.gameOver()}</div>`;
        }
    });
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
        if (event.status.type.name === "STATUS_SCHEDULED") {
            mlbData.innerHTML += `<div class="hoverer">${mlb.scheduledGame()}</div>`;
        }
        if (event.status.type.name === "STATUS_IN_PROGRESS") {
            mlbData.innerHTML += `<div class="hoverer">${mlb.inProgressGame()}</div>`;
        }
        if (event.status.type.name === "STATUS_FINAL") {
            mlbData.innerHTML += `<div class="hoverer">${mlb.gameOver()}</div>`;
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
    const nflGameOver = sportsData.NFL.slice(0, sportsData.NFL.length).filter(event => event.status.type.name === "STATUS_FINAL");
    const smallNFLList = [...nflInProgress, ...nflHalfTime, ...nflEndQuarter, ...nflScheduled, ...nflGameOver].slice(0, 3);
    smallNFLList.forEach(event => {
        const nfl = nflVariables(event);
        nfl.awayID = nfl.possession === nfl.awayID ? "🏈" : "";
        nfl.homeID = nfl.possession === nfl.homeID ? "🏈" : "";
        if(event.status.type.name === "STATUS_IN_PROGRESS") {
            nflData.innerHTML += `<div class="hoverer">${nfl.inProgressGame()}</div>`;
        }
        if(event.status.type.name === "STATUS_END_PERIOD") {
            nflData.innerHTML += `<div class="hoverer">${nfl.endOfPeriod()}</div>`;
        }
        if(event.status.type.name === "STATUS_HALFTIME") {
            nflData.innerHTML += `<div class="hoverer">${nfl.halfTime()}</div>`
        }
        if(event.status.type.name === "STATUS_SCHEDULED") {
            nflData.innerHTML += `<div class="hoverer">${nfl.scheduledGame()}</div>`;
        }
        if(event.status.type.name === "STATUS_FINAL") {
            nflData.innerHTML += `<div class="hoverer">${nfl.gameOver()}</div>`;
        }
    });
    document.querySelectorAll('.game-row').forEach(row => {
        row.addEventListener('click', (event) => {
            individualNFLGame(event.currentTarget.id);
        })
    });
    document.getElementById("show-all-nfl").addEventListener("click", showAllNFL);
    currentView = 'showLess';
};

const showAllNFL = () => {
    sportsDiv.innerHTML = `
        <h1>All NFL Games</h1>
        <button id="back-to-all">Back</button>
    `;
    clearAllSections();
    const nflHalfTime = sportsData.NFL.slice(0, sportsData.NFL.length).filter(event => event.status.type.name === "STATUS_HALFTIME");
    const nflInProgress = sportsData.NFL.slice(0, sportsData.NFL.length).filter(event => event.status.type.name === "STATUS_IN_PROGRESS");
    const nflEndQuarter = sportsData.NFL.slice(0, sportsData.NFL.length).filter(event => event.status.type.name === "STATUS_END_PERIOD");
    const nflScheduled = sportsData.NFL.slice(0, sportsData.NFL.length).filter(event => event.status.type.name === "STATUS_SCHEDULED");
    const nflFinal = sportsData.NFL.slice(0, sportsData.NFL.length).filter(event => event.status.type.name === "STATUS_FINAL");
    const longNFLList = [...nflInProgress, ...nflHalfTime, ...nflEndQuarter, ...nflScheduled, ...nflFinal];
    longNFLList.forEach(event => {
        const nfl = nflVariables(event);
        nfl.awayID = nfl.possession === nfl.awayID ? "🏈" : "";
        nfl.homeID = nfl.possession === nfl.homeID ? "🏈" : "";
        if(event.status.type.name === "STATUS_IN_PROGRESS") {
            nflData.innerHTML += `<div class="hoverer">${nfl.inProgressGame()}</div>`;
        }
        if(event.status.type.name === "STATUS_END_PERIOD") {
            nflData.innerHTML += `<div class="hoverer">${nfl.endOfPeriod()}</div>`;
        }
        if(event.status.type.name === "STATUS_HALFTIME") {
            nflData.innerHTML += `<div class="hoverer">${nfl.halfTime()}</div>`
        }
        if(event.status.type.name === "STATUS_SCHEDULED") {
            nflData.innerHTML += `<div class="hoverer">${nfl.scheduledGame()}</div>`;
        }
        if(event.status.type.name === "STATUS_FINAL") {
            nflData.innerHTML += `<div class="hoverer">${nfl.gameOver()}</div>`;
        }
    });
    document.querySelectorAll('.game-row').forEach(row => {
        row.addEventListener('click', (event) => {
            individualNFLGame(event.currentTarget.id);
        })
    });
    document.getElementById("back-to-all").addEventListener("click", showNothing);
    currentView = 'nfl';
};

const showLessCFB = () => {
    cfbData.innerHTML = '';
    cfbName.innerHTML = `<h3 id="show-all-cfb">CFB</h3>`;
    const cfbHalfTime = sportsData.CFB.slice(0, sportsData.CFB.length).filter(event => event.status.type.name === "STATUS_HALFTIME");
    const cfbInProgress = sportsData.CFB.slice(0, sportsData.CFB.length).filter(event => event.status.type.name === "STATUS_IN_PROGRESS");
    const cfbScheduled = sportsData.CFB.slice(0, sportsData.CFB.length).filter(event => event.status.type.name === "STATUS_SCHEDULED");
    const cfbFinal = sportsData.CFB.slice(0, sportsData.CFB.length).filter(event => event.status.type.name === "STATUS_FINAL");
    const cfbEndofQuarter = sportsData.CFB.slice(0, sportsData.CFB.length).filter(event => event.status.type.name === "STATUS_END_PERIOD");
    const cfbSmallList = [...cfbScheduled, ...cfbInProgress, ...cfbHalfTime, ...cfbEndofQuarter, ...cfbFinal].slice(0, 3);
    cfbSmallList.forEach(event => {
        const cfb = cfbVariables(event);
        cfb.awayRank = cfb.awayRank > 25 ? "" : cfb.awayRank;
        cfb.homeRank = cfb.homeRank > 25 ? "" : cfb.homeRank;
        cfb.awayID = cfb.possession === cfb.awayID ? "🏈" : "";
        cfb.homeID = cfb.possession === cfb.homeID ? "🏈" : "";
        if(event.status.type.name === "STATUS_SCHEDULED") {
            cfbData.innerHTML += `<div class="hoverer">${cfb.scheduledGame()}</div>`;
        }
        if(event.status.type.name === "STATUS_IN_PROGRESS") {
            cfbData.innerHTML += `<div class="hoverer">${cfb.inProgress()}</div>`;
        }
        if(event.status.type.name === "STATUS_HALFTIME") {
            cfbData.innerHTML += `<div class="hoverer">${cfb.halfTime()}</div>`;
        }
        if(event.status.type.name === "STATUS_END_PERIOD") {
            cfbData.innerHTML += `<div class="hoverer">${cfb.endOfPeriod()}</div>`;
        }
        if(event.status.type.name === "STATUS_FINAL") {
            cfbData.innerHTML += `<div class="hoverer">${cfb.gameOver()}</div>`;
        }
    });
    document.querySelectorAll('.game-row').forEach(row => {
        row.addEventListener('click', (event) => {
            individualCFBGame(event.currentTarget.id);
        })
    });
    document.getElementById("show-all-cfb").addEventListener("click", showAllCFB);
    currentView = 'showLess';
}

const showAllCFB = () => {
    sportsDiv.innerHTML = `
        <h1>All Ranked CFB Games</h1>
        <button id="back-to">Back</button>
    `;
    clearAllSections();
    const cfbHalfTime = sportsData.CFB.slice(0, sportsData.CFB.length).filter(event => event.status.type.name === "STATUS_HALFTIME");
    const cfbInProgress = sportsData.CFB.slice(0, sportsData.CFB.length).filter(event => event.status.type.name === "STATUS_IN_PROGRESS");
    const cfbScheduled = sportsData.CFB.slice(0, sportsData.CFB.length).filter(event => event.status.type.name === "STATUS_SCHEDULED");
    const cfbFinal = sportsData.CFB.slice(0, sportsData.CFB.length).filter(event => event.status.type.name === "STATUS_FINAL");
    const cfbEndofQuarter = sportsData.CFB.slice(0, sportsData.CFB.length).filter(event => event.status.type.name === "STATUS_END_PERIOD");
    const cfbSmallList = [...cfbInProgress, ...cfbHalfTime, ...cfbEndofQuarter, ...cfbScheduled, ...cfbFinal];
    cfbSmallList.forEach(event => {
        const cfb = cfbVariables(event);
        cfb.awayRank = cfb.awayRank > 25 ? "" : cfb.awayRank;
        cfb.homeRank = cfb.homeRank > 25 ? "" : cfb.homeRank;
        cfb.awayID = cfb.possession === cfb.awayID ? "🏈" : "";
        cfb.homeID = cfb.possession === cfb.homeID ? "🏈" : "";
        if(event.status.type.name === "STATUS_SCHEDULED") {
            cfbData.innerHTML += `<div class="hoverer">${cfb.scheduledGame()}</div>`;
        }
        if(event.status.type.name === "STATUS_IN_PROGRESS") {
            cfbData.innerHTML += `<div class="hoverer">${cfb.inProgress()}</div>`;
        }
        if(event.status.type.name === "STATUS_HALFTIME") {
            cfbData.innerHTML += `<div class="hoverer">${cfb.halfTime()}</div>`;
        }
        if(event.status.type.name === "STATUS_END_PERIOD") {
            cfbData.innerHTML += `<div class="hoverer">${cfb.endOfPeriod()}</div>`;
        }
        if(event.status.type.name === "STATUS_FINAL") {
            cfbData.innerHTML += `<div class="hoverer">${cfb.gameOver()}</div>`;
        }
    });
    document.querySelectorAll('.game-row').forEach(row => {
        row.addEventListener('click', (event) => {
            individualCFBGame(event.currentTarget.id);
        })
    });
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
    clearAllSections();
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
    clearAllSections();
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
    clearAllSections();
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






