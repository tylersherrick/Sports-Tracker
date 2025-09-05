function mlbVariables(game) {
    return {
        gameId: game.id,
        homeTeam: game.competitions[0].competitors[0].team.displayName,
        shortHomeTeam: game.competitions[0].competitors[0].team.abbreviation,
        awayTeam: game.competitions[0].competitors[1].team.displayName,
        shortAwayTeam: game.competitions[0].competitors[1].team.abbreviation,
        homeScore: game.competitions[0].competitors[0].score,
        awayScore: game.competitions[0].competitors[1].score,
        homeOdds: game.competitions[0].odds?.[0]?.homeTeamOdds?.moneyLine || "",
        awayOdds: game.competitions[0].odds?.[0]?.awayTeamOdds?.moneyLine || "",
        homeRecord: game.competitions[0].competitors[0].records[0].summary,
        awayRecord: game.competitions[0].competitors[1].records[0].summary,
        futureWeather: game.weather?.displayValue || "",
        currentWeather: game.weather?.conditionId || "",
        temperature: game.weather?.temperature || "",
        venue: game.competitions[0].venue.fullName,
        gameSummary: game.competitions[0].headlines?.[0]?.shortLinkText || "",
        preGameMessage: game.competitions[0].headlines?.[0]?.shortLinkText || "",
        lastPlay: game.competitions[0].situation?.lastPlay?.text ? game.competitions[0].situation.lastPlay.text : "",
        attendance: game.competitions[0].attendance,
        gameStatus: game.status.type.description,
        teamsPlaying: game.status.type.shortDetail,
        balls: game.competitions[0].situation?.balls ?? 0,
        strikes: game.competitions[0].situation?.strikes ?? 0,
        outs: game.competitions[0].outsText,
        inning: game.status.type.detail,
        shortInning: game.status.type.shortDetail,
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
        probableHomeStarter: game.competitions[0].competitors[0].probables?.[0]?.athlete?.displayName || "",
        probableAwayStarter: game.competitions[0].competitors[1].probables?.[0]?.athlete?.displayName || "",
        probableHomeStarterStats: game.competitions[0].competitors[0].probables?.[0]?.record || "",
        probableAwayStarterStats: game.competitions[0].competitors[1].probables?.[0]?.record || "",
        battingTeamId: game.competitions[0].situation?.batter?.athlete?.team?.id,
        homeTeamId: game.competitions[0].competitors[0].team.id,
        awayTeamId: game.competitions[0].competitors[1].team.id,
        homeAvg: { stat: game.competitions[0].competitors[0].leaders[0].abbreviation, athlete: game.competitions[0].competitors[0].leaders[0].leaders[0].athlete.fullName },
        homeHR: { stat: game.competitions[0].competitors[0].leaders[1].abbreviation, athlete: game.competitions[0].competitors[0].leaders[1].leaders[0].athlete.fullName },
        homeRBI: { stat: game.competitions[0].competitors[0].leaders[2].abbreviation, athlete: game.competitions[0].competitors[0].leaders[2].leaders[0].athlete.fullName },
        homeMLBRating: { stat: game.competitions[0].competitors[0].leaders[3].abbreviation, athlete: game.competitions[0].competitors[0].leaders[3].leaders[0].athlete.fullName },
        awayAvg: { stat: game.competitions[0].competitors[1].leaders[0].abbreviation, athlete: game.competitions[0].competitors[1].leaders[0].leaders[0].athlete.fullName },
        awayHR: { stat: game.competitions[0].competitors[1].leaders[1].abbreviation, athlete: game.competitions[0].competitors[1].leaders[1].leaders[0].athlete.fullName },
        awayRBI: { stat: game.competitions[0].competitors[1].leaders[2].abbreviation, athlete: game.competitions[0].competitors[1].leaders[2].leaders[0].athlete.fullName },
        awayMLBRating: { stat: game.competitions[0].competitors[1].leaders[3].abbreviation, athlete: game.competitions[0].competitors[1].leaders[3].leaders[0].athlete.fullName },
        dueUp1: game.competitions[0].situation?.dueUp?.[0]?.athlete?.fullName,
        dueUp2: game.competitions[0].situation?.dueUp?.[1]?.athlete?.fullName,
        dueUp3: game.competitions[0].situation?.dueUp?.[2]?.athlete?.fullName,
        scheduledGame() {
            return `
                <div id="${this.gameId}" class="game-row scheduled">
                    <!-- Away team: logo, score, abbrev -->
                    <div class="team away">
                        <img src="${this.awayLogo}" class="team-logo" alt="${this.awayTeam}">
                        <div class="team-info">
                            <div class="score"></div>
                            <div class="abbr">${this.shortAwayTeam}</div>
                        </div>
                    </div>

                    <!-- Center: inning/short detail -->
                    <div class="game-center">
                        <div class="inning-outs">${this.shortInning}</div>
                    </div>

                    <!-- Home team: score, abbrev, logo -->
                    <div class="team home">
                        <div class="team-info">
                            <div class="score"></div>
                            <div class="abbr">${this.shortHomeTeam}</div>
                        </div>
                        <img src="${this.homeLogo}" class="team-logo" alt="${this.homeTeam}">
                    </div>
                </div>
            `;
        },
        inProgressGame() {
            return `
                <div id="${this.gameId}" class="game-row in-progress">
                    <!-- Away team: logo, score, abbrev -->
                    <div class="team away">
                        <img src="${this.awayLogo}" class="team-logo" alt="${this.awayTeam}">
                        <div class="team-info">
                            <div class="score">${this.awayScore}</div>
                            <div class="abbr">${this.shortAwayTeam}</div>
                        </div>
                    </div>
                    <div class="game-center">
                        <div class="inning-outs">${this.shortInning} - ${this.outs}</div>
                        <div class="base-map">
                            <div class="base first-base ${this.onFirst ? 'occupied' : ''}"></div>
                            <div class="base second-base ${this.onSecond ? 'occupied' : ''}"></div>
                            <div class="base third-base ${this.onThird ? 'occupied' : ''}"></div>
                        </div>
                    </div>
                    <div class="team home">
                        <div class="team-info">
                            <div class="score">${this.homeScore}</div>
                            <div class="abbr">${this.shortHomeTeam}</div>
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
                            <div class="score">${this.awayScore}</div>
                            <div class="abbr">${this.shortAwayTeam}</div>
                        </div>
                    </div>
                    <div class="game-center">
                        <div class="inning-outs">${this.shortInning}</div>
                    </div>
                    <div class="team home">
                        <div class="team-info">
                            <div class="score">${this.homeScore}</div>
                            <div class="abbr">${this.shortHomeTeam}</div>
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
            if (this.gameStatus === "Final") {
                return `
                    <div class="mlb-teams">
                        <h3>${this.awayTeam}: ${this.awayScore}</h3>
                        <h3>${this.homeTeam}: ${this.homeScore}</h3>
                    </div>
                    <div class="position-play">
                        ${this.gameSummary ? `<p>${this.gameSummary}</p>` : ''}
                        <p>Attendance: ${this.attendance}</p>
                    </div>
                `;
            }

            if (this.gameStatus === "Scheduled") {
                return `
                    <div id="${this.gameId}" class="game-row individual-game-row">
                        <!-- Away team: logo, score, abbrev -->
                        <div class="team away individual-away">
                            <img src="${this.awayLogo}" class="individual-logo" alt="${this.awayTeam}">
                            <div class="individual-team-info">
                                <div class="score"></div>
                                <div class="abbr individual-details">${this.shortAwayTeam} - ${this.awayRecord}</div>
                                <div class="abbr individual-details">${this.awayOdds}</div>
                            </div>
                        </div>

                        <!-- Center: inning/short detail -->
                        <div class="individual-center">
                            <div class="center-item">${this.awayTeam} at ${this.homeTeam}</div>
                            <div class="center-item">${this.teamsPlaying}</div>
                            <div class="weather">${this.futureWeather ? `${this.futureWeather} and ${this.temperature}°` : ''} at ${this.venue}</div>
                            
                        </div>

                        <!-- Home team: score, abbrev, logo -->
                        <div class="team home">
                            <img src="${this.homeLogo}" class="individual-logo" alt="${this.homeTeam}">
                            <div class="individual-team-info">
                                <div class="score"></div>
                                <div class="abbr individual-details">${this.shortHomeTeam} - ${this.homeRecord}</div>
                                <div class="abbr individual-details">${this.homeOdds}</div>
                            </div>
                        </div>
                    </div>
                    <div id="${this.gameId}" class="game-row individual-game-row second-section">
                        <div class="team away individual-away">
                            <div class="abbr individual-details">${this.probableAwayStarter} - ${this.probableAwayStarterStats} ERA</div>
                        </div>
                        <div class="individual-center">Pitching Today</div>
                        <div class="team home">
                            <div class="abbr individual-details">${this.probableHomeStarter} - ${this.probableHomeStarterStats} ERA</div>
                        </div>
                    </div>
                `;
            }

            if (this.gameStatus === "In Progress") {
                return `
                    <div class="mlb-teams">
                        <h3>${this.awayTeam}: ${this.awayScore}</h3> 
                        <h3>${this.homeTeam}: ${this.homeScore}</h3>
                    </div>
                    <div class="position-play">
                        <p>${this.balls}-${this.strikes} - ${this.outs}</p>
                        <p>${this.currentPitcher} pitching to ${this.currentBatter}</p>
                        <p>${this.lastPlay}</p>
                    </div>
                    <div class="weather">
                        ${this.currentWeather} and ${this.temperature}° at ${this.venue}
                    </div>
                `;
            }

            return "Game info unavailable.";
        }
    };
}
