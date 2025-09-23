function mlbVariables(game) {
    return {
        gameId: game.id,
        attendance: game.competitions[0].attendance,
        awayAvg: { stat: game.competitions[0].competitors[1].leaders[0].abbreviation, athlete: game.competitions[0].competitors[1].leaders[0].leaders[0].athlete.fullName },
        awayAwayRecord: game.competitions[0].competitors[1].records[2]?.summary,
        awayHR: { stat: game.competitions[0].competitors[1].leaders[1].abbreviation, athlete: game.competitions[0].competitors[1].leaders[1].leaders[0].athlete.fullName },
        awayLogo: game.competitions[0].competitors[1].team.logo,
        awayMLBRating: { stat: game.competitions[0].competitors[1].leaders[3].abbreviation, athlete: game.competitions[0].competitors[1].leaders[3].leaders[0].athlete.fullName },
        awayOdds: game.competitions[0].odds?.[0]?.awayTeamOdds?.moneyLine || "",
        awayOverallRecord: game.competitions[0].competitors[1].records[0]?.summary,
        awayRBI: { stat: game.competitions[0].competitors[1].leaders[2].abbreviation, athlete: game.competitions[0].competitors[1].leaders[2].leaders[0].athlete.fullName },
        awayRecord: game.competitions[0].competitors[1].records[0].summary,
        awayScore: game.competitions[0].competitors[1].score,
        awayTeam: game.competitions[0].competitors[1].team.displayName,
        awayTeamId: game.competitions[0].competitors[1].team.id,
        battingTeamId: game.competitions[0].situation?.batter?.athlete?.team?.id,
        balls: game.competitions[0].situation?.balls ?? 0,
        currentBatter: game.competitions[0].situation?.batter?.athlete?.displayName || "",
        currentBatterId: game.competitions[0].situation?.batter?.athlete?.team?.id || "",
        currentPitcher: game.competitions[0].situation?.pitcher?.athlete?.displayName || "",
        currentWeather: game.weather?.conditionId || "",
        dueUp1: game.competitions[0].situation?.dueUp?.[0]?.athlete?.fullName,
        dueUp2: game.competitions[0].situation?.dueUp?.[1]?.athlete?.fullName,
        dueUp3: game.competitions[0].situation?.dueUp?.[2]?.athlete?.fullName,
        futureWeather: game.weather?.displayValue || "",
        gameShortDetail: game.status.type.shortDetail,
        gameStatus: game.status.type.description,
        gameSummary: game.competitions[0].headlines?.[0]?.shortLinkText || "",
        homeAvg: { stat: game.competitions[0].competitors[0].leaders[0].abbreviation, athlete: game.competitions[0].competitors[0].leaders[0].leaders[0].athlete.fullName },
        homeAwayRecord: game.competitions[0].competitors[0].records[2]?.summary,
        homeHR: { stat: game.competitions[0].competitors[0].leaders[1].abbreviation, athlete: game.competitions[0].competitors[0].leaders[1].leaders[0].athlete.fullName },
        homeHomeRecord: game.competitions[0].competitors[0].records[1]?.summary,
        homeLogo: game.competitions[0].competitors[0].team.logo,
        homeMLBRating: { stat: game.competitions[0].competitors[0].leaders[3].abbreviation, athlete: game.competitions[0].competitors[0].leaders[3].leaders[0].athlete.fullName },
        homeOdds: game.competitions[0].odds?.[0]?.homeTeamOdds?.moneyLine || "",
        homeOverallRecord: game.competitions[0].competitors[0].records[0]?.summary,
        homeRBI: { stat: game.competitions[0].competitors[0].leaders[2].abbreviation, athlete: game.competitions[0].competitors[0].leaders[2].leaders[0].athlete.fullName },
        homeRecord: game.competitions[0].competitors[0].records[0].summary,
        homeScore: game.competitions[0].competitors[0].score,
        homeTeam: game.competitions[0].competitors[0].team.displayName,
        homeTeamId: game.competitions[0].competitors[0].team.id,
        inning: game.status.type.detail,
        inningStatus: game.competitions[0].situation?.lastPlay?.type.text || "",
        lastPlay: game.competitions[0].situation?.lastPlay?.text ? game.competitions[0].situation.lastPlay.text : "",
        onFirst: game.competitions[0].situation?.onFirst ?? false,
        onSecond: game.competitions[0].situation?.onSecond ?? false,
        onThird: game.competitions[0].situation?.onThird ?? false,
        outs: game.competitions[0].outsText,
        overUnder: game.competitions[0]?.odds?.[0]?.overUnder || "",
        preGameMessage: game.competitions[0].headlines?.[0]?.shortLinkText || "",
        probableAwayStarter: game.competitions[0].competitors[1].probables?.[0]?.athlete?.displayName || "Undecided",
        probableAwayStarterStats: game.competitions[0].competitors[1].probables?.[0]?.record || "",
        probableHomeStarter: game.competitions[0].competitors[0].probables?.[0]?.athlete?.displayName || "Undecided",
        probableHomeStarterStats: game.competitions[0].competitors[0].probables?.[0]?.record || "",
        shortAwayTeam: game.competitions[0].competitors[1].team.abbreviation,
        shortHomeTeam: game.competitions[0].competitors[0].team.abbreviation,
        shortInning: game.status.type.shortDetail,
        strikes: game.competitions[0].situation?.strikes ?? 0,
        teamsPlaying: game.status.type.shortDetail,
        temperature: game.weather?.temperature || "",
        venue: game.competitions[0].venue.fullName,
        weather: "",
        ballsStrikesOuts: "",
        nextBatters: "",
        scheduledGame() {
            return `
                <div id="${this.gameId}" class="game-row scheduled">
                    <div class="team away">
                        <img src="${this.awayLogo}" class="team-logo" alt="${this.awayTeam}">
                        <div class="team-info">
                            <div class="score"></div>
                            <div class="abbr">${this.shortAwayTeam}</div>
                            <div class="abbr">${this.awayRecord}</div>
                        </div>
                    </div>
                    <div class="game-center">
                        <div class="inning-outs">${this.shortInning}</div>
                    </div>
                    <div class="team home">
                        <div class="team-info">
                            <div class="score"></div>
                            <div class="abbr">${this.shortHomeTeam}</div>
                            <div class="abbr">${this.homeRecord}</div>
                        </div>
                        <img src="${this.homeLogo}" class="team-logo" alt="${this.homeTeam}">
                    </div>
                </div>
            `;
        },
        inProgressGame() {
            return `
                <div id="${this.gameId}" class="game-row in-progress">
                    <div class="team away">
                        <img src="${this.awayLogo}" class="team-logo" alt="${this.awayTeam}">
                        <div class="team-info">
                            <div class="abbr">${this.shortAwayTeam}</div>
                            <div class="abbr">${this.awayRecord}</div>
                        </div>
                    </div>
                    <div class="abbr">${this.awayScore}</div>
                    <div class="game-center">
                        <div class="inning-outs">${this.shortInning} - ${this.outs}</div>
                        <div class="base-map">
                            <div class="base first-base ${this.onFirst ? 'occupied' : ''}"></div>
                            <div class="base second-base ${this.onSecond ? 'occupied' : ''}"></div>
                            <div class="base third-base ${this.onThird ? 'occupied' : ''}"></div>
                        </div>
                    </div>
                                            <div class="abbr">${this.homeScore}</div>

                    <div class="team home">
                        <div class="team-info">
                            
                            <div class="abbr">${this.shortHomeTeam}</div>
                            <div class="abbr">${this.homeRecord}</div>
                        </div>
                        <img src="${this.homeLogo}" class="team-logo" alt="${this.homeTeam}">
                    </div>
                </div>
            `;
        },
        gameOver() {
            return `
                <div id="${this.gameId}" class="game-row over">
                    <div class="team away">
                        <img src="${this.awayLogo}" class="team-logo" alt="${this.awayTeam}">
                        <div class="team-info">
                            <div class="abbr">${this.shortAwayTeam}</div>
                            <div class="abbr">${this.awayRecord}</div>
                        </div>
                    </div>
                    <div class="game-center">
                        <div class="inning-outs">${this.shortInning}</div>
                        <div class="inning-outs">${this.awayScore} - ${this.homeScore}</div>
                    </div>
                    <div class="team home">
                        <div class="team-info">
                            <div class="abbr">${this.shortHomeTeam}</div>
                            <div class="abbr">${this.homeRecord}</div>
                        </div>
                        <img src="${this.homeLogo}" class="team-logo" alt="${this.homeTeam}">
                    </div>
                </div>
            `;
        },
        renderIndividualView() {
            if(this.homeOdds > 0) {
                this.homeOdds = `+${this.homeOdds}`;
            }
            if(this.awayOdds > 0) {
                this.awayOdds = `+${this.awayOdds}`;
            }
            this.weather = this.venue || "";
            if (this.futureWeather || this.currentWeather) {
                const useFuture = typeof this.futureWeather === "string" && isNaN(this.futureWeather) && this.futureWeather.length > 1;
                const forecast = useFuture ? this.futureWeather : this.currentWeather || "";
                const temp = this.temperature ? ` and ${this.temperature}°` : "";
                if (forecast) {
                    this.weather = `${forecast}${temp} at ${this.venue}`;
                }
            }
            if(this.currentPitcher != "") {
                this.currentPitcher = `Pitching: ${this.currentPitcher}`;
            }
            if(this.currentBatter != "") {
                this.currentBatter = `At bat: ${this.currentBatter}`;
            }
            this.ballsStrikesOuts = `${this.balls} - ${this.strikes} &nbsp; ${this.outs}`;
            if(this.teamsPlaying.includes("Mid") || this.teamsPlaying.includes("End")) {
                this.inning = "";
                this.balls = "";
                this.strikes = "";
                this.outs = "";
                this.ballsStrikesOuts = "";
                this.nextBatters = `
                <div id="${this.gameId}" class="game-row individual-game-row second-section pitcher-section">
                        <div class="team away individual-away">
                            <div class="abbr individual-details">
                                ${this.dueUp1}</br></br> ${this.dueUp2}</br></br> ${this.dueUp3}
                            </div>
                        </div>
                        <div class="individual-center">Due Up</div>
                        <div class="team home">
                            
                            <div class="abbr individual-details"></div>
                        </div>
                    </div>`
            }
            if (this.gameStatus === "Scheduled") {
                return `
                    <div id="${this.gameId}" class="game-row individual-game-row">
                        <div class="team away individual-away">
                            <img src="${this.awayLogo}" class="individual-logo" alt="${this.awayTeam}">
                            <div class="individual-team-info">
                                <div class="score"></div>
                                <div class="abbr individual-details">${this.shortAwayTeam} - ${this.awayRecord}</div>
                                <div class="abbr individual-details">${this.awayOdds}</div>
                            </div>
                        </div>
                        <div class="individual-center">
                            <div class="center-item">${this.awayTeam} at ${this.homeTeam}</div>
                            <div class="center-item">${this.teamsPlaying}</div>
                            <div class="center-item">Over Under: ${this.overUnder}</div>
                            <div class="center-item">${this.weather}</div>
                        </div>
                        <div class="team home">
                            <img src="${this.homeLogo}" class="individual-logo" alt="${this.homeTeam}">
                            <div class="individual-team-info">
                                <div class="score"></div>
                                <div class="abbr individual-details">${this.shortHomeTeam} - ${this.homeRecord}</div>
                                <div class="abbr individual-details">${this.homeOdds}</div>
                            </div>
                        </div>
                    </div>
                    <div id="${this.gameId}" class="game-row individual-game-row second-section pitcher-section">
                        <div class="team away individual-away">
                            <div class="abbr individual-details">
                                <img src="${this.awayLogo}" alt="${this.awayTeam}" class="individual-small-logo" />
                                ${this.probableAwayStarter || "Undecided"}
                                ${this.probableAwayStarterStats ? ` - ${this.probableAwayStarterStats} ERA` : ""}
                            </div>
                        </div>
                        <div class="individual-center">Pitching Today</div>
                        <div class="team home">
                            
                            <div class="abbr individual-details">
                                <img src="${this.homeLogo}" alt="${this.homeTeam}" class="individual-small-logo" />
                                ${this.probableHomeStarter || "Undecided"}
                                ${this.probableHomeStarterStats ? ` - ${this.probableHomeStarterStats} ERA` : ""}
                            </div>
                        </div>
                    </div>
                `;
            }

            if (this.gameStatus === "In Progress") {
                return `
                    <div id="${this.gameId}" class="game-row individual-game-row">
                        <div class="team away individual-away">
                            <img src="${this.awayLogo}" class="individual-logo" alt="${this.awayTeam}">
                            <div class="individual-team-info">
                                <div class="score"></div>
                                <div class="abbr individual-details">${this.shortAwayTeam} - ${this.awayRecord}</div>
                                <div class="abbr individual-details">${this.awayOdds}</div>
                            </div>
                        </div>
                        <div class="individual-center">
                            <div class="center-item">${this.awayTeam} at ${this.homeTeam}</div>
                            <div class="center-item">Score: ${this.awayScore} - ${this.homeScore} &nbsp; ${this.inning} &nbsp;  ${this.ballsStrikesOuts}</div>
                            <div class="center-item">${this.currentPitcher}</div>
                            <div class="center-item">${this.currentBatter}</div>
                            <div class="center-item">${this.lastPlay}</div>
                            <div class="base-map center-item">
                                <div class="base first-base ${this.onFirst ? 'occupied' : ''}"></div>
                                <div class="base second-base ${this.onSecond ? 'occupied' : ''}"></div>
                                <div class="base third-base ${this.onThird ? 'occupied' : ''}"></div>
                            </div>
                        </div>
                        <div class="team home">
                            <img src="${this.homeLogo}" class="individual-logo" alt="${this.homeTeam}">
                            <div class="individual-team-info">
                                <div class="score"></div>
                                <div class="abbr individual-details">${this.shortHomeTeam} - ${this.homeRecord}</div>
                                <div class="abbr individual-details">${this.homeOdds}</div>
                            </div>
                        </div>
                    </div>
                    ${this.nextBatters}
                `;
            }

            if (this.gameStatus === "Final") {
                return `
                    <div id="${this.gameId}" class="game-row individual-game-row">
                        <div class="team away individual-away">
                            <img src="${this.awayLogo}" class="individual-logo" alt="${this.awayTeam}">
                            <div class="individual-team-info">
                                <div class="score"></div>
                                <div class="abbr individual-details">${this.shortAwayTeam} - ${this.awayRecord}</div>
                                <div class="abbr individual-details">Away - ${this.awayAwayRecord}</div>
                            </div>
                        </div>
                        <div class="individual-center">
                            <div class="center-item">${this.awayTeam} at ${this.homeTeam}</div>
                            <div class="center-item"><strong>${this.teamsPlaying}</strong>: ${this.awayScore} - ${this.homeScore}</div>
                            <div class="center-item">${this.gameSummary}</div>
                        </div>
                        <div class="team home">
                            <img src="${this.homeLogo}" class="individual-logo" alt="${this.homeTeam}">
                            <div class="individual-team-info">
                                <div class="score"></div>
                                <div class="abbr individual-details">${this.shortHomeTeam} - ${this.homeRecord}</div>
                                <div class="abbr individual-details">Home - ${this.homeHomeRecord}</div>
                            </div>
                        </div>
                    </div>
                `;
            }
            return "Game info unavailable.";
        }
    };
}
