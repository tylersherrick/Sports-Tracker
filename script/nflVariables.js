function nflVariables(event) {
    return {
        gameId: event.id,
        awayTeam: event.competitions[0].competitors[1].team.displayName,
        homeTeam: event.competitions[0].competitors[0].team.displayName,
        shortAwayTeam: event.competitions[0].competitors[1].team.abbreviation,
        shortHomeTeam: event.competitions[0].competitors[0].team.abbreviation,
        homeLogo: event.competitions[0].competitors[0].team.logo,
        awayLogo: event.competitions[0].competitors[1].team.logo,
        homeOdds: event.competitions[0].odds?.[0]?.homeTeamOdds?.moneyLine || "",
        awayOdds: event.competitions[0].odds?.[0]?.awayTeamOdds?.moneyLine || "",
        homeRecord: event.competitions[0].competitors[0].records[0].summary,
        awayRecord: event.competitions[0].competitors[1].records[0].summary,
        spread: event.competitions[0].odds?.[0]?.details || "",
        gameStatus: event.status.type.shortDetail,
        awayScore: event.competitions[0].competitors[1].score,
        homeScore: event.competitions[0].competitors[0].score,
        time: event.status.type.detail,
        scheduleTime: event.status.type.shortDetail,
        situation: event.competitions[0].situation || "",
        ballPosition: event.competitions[0].situation?.downDistanceText || 'Switching Possession',
        possession: event.competitions[0].situation?.possession || "",
        awayID: event.competitions[0].competitors[1].id,
        homeID: event.competitions[0].competitors[0].id,
        gameStatus: event.status.type.description,
        gameSummary: event.competitions[0].headlines?.[0]?.shortLinkText || "",
        lastPlay: event.competitions[0].situation?.lastPlay?.text ? event.competitions[0].situation.lastPlay.text : "",
        weather: event.weather?.conditionId || "",
        temperature: event.weather?.temperature || "",
        venue: event.competitions[0].venue.fullName,
        gameType: event.season.slug || "",
        attendance: event.competitions[0].attendance,
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
                        <div class="inning-outs">${this.scheduleTime}</div>
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
                <div id="${this.gameId}" class="game-row scheduled">
                    <!-- Away team: logo, score, abbrev -->
                    <div class="team away">
                        <img src="${this.awayLogo}" class="team-logo" alt="${this.awayTeam}">
                        <div class="team-info">
                            <div class="abbr">${this.shortAwayTeam}</div>
                            <div class="abbr">${this.awayRecord}</div>
                        </div>
                    </div>

                    <!-- Center: inning/short detail -->
                    <div class="game-center">
                        <div class="inning-outs">
                            ${this.scheduleTime}
                        </div>
                    </div>

                    <!-- Home team: score, abbrev, logo -->
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
        endOfPeriod() {
            return `
                <div id="${this.gameId}" class="game-row scheduled">
                    <!-- Away team: logo, score, abbrev -->
                    <div class="team away">
                        <img src="${this.awayLogo}" class="team-logo" alt="${this.awayTeam}">
                        <div class="team-info">
                            <div class="abbr">${this.shortAwayTeam}</div>
                            <div class="abbr">${this.awayRecord}</div>
                        </div>
                    </div>

                    <!-- Center: inning/short detail -->
                    <div class="game-center">
                        <div class="inning-outs">
                            ${this.scheduleTime}
                        </div>
                    </div>

                    <!-- Home team: score, abbrev, logo -->
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
        halfTime() {
            return `
                <div id="${this.gameId}" class="game-row scheduled">
                    <!-- Away team: logo, score, abbrev -->
                    <div class="team away">
                        <img src="${this.awayLogo}" class="team-logo" alt="${this.awayTeam}">
                        <div class="team-info">
                            <div class="abbr">${this.shortAwayTeam}</div>
                            <div class="abbr">${this.awayRecord}</div>
                        </div>
                    </div>

                    <!-- Center: inning/short detail -->
                    <div class="game-center">
                        <div class="inning-outs">
                            ${this.scheduleTime}
                        </div>
                    </div>

                    <!-- Home team: score, abbrev, logo -->
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
                <div id="${this.gameId}" class="game-row scheduled">
                    <!-- Away team: logo, score, abbrev -->
                    <div class="team away">
                        <img src="${this.awayLogo}" class="team-logo" alt="${this.awayTeam}">
                        <div class="team-info">
                            <div class="score"></div>
                            <div class="abbr">${this.shortAwayTeam}</div>
                            <div class="abbr">${this.awayRecord}</div>
                        </div>
                    </div>

                    <!-- Center: inning/short detail -->
                    <div class="game-center">
                        <div class="inning-outs">${this.scheduleTime}</div>
                        <div class="score">${this.awayScore} - ${this.homeScore}</div>
                    </div>

                    <!-- Home team: score, abbrev, logo -->
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
        renderIndividualView() {
            if(this.homeOdds > 0) {
                this.homeOdds = `+${this.homeOdds}`;
            }
            if(this.awayOdds > 0) {
                this.awayOdds = `+${this.awayOdds}`;
            }
            if (this.gameStatus === "Final") {
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
                            <div class="center-item"><strong>${this.scheduleTime}</strong>: ${this.awayScore} - ${this.homeScore}</div>
                            <div class="center-item">${this.gameSummary}</div>
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
                            <div class="center-item">${this.venue}</div>
                            <div class="center-item">${this.scheduleTime}</div>
                            <div class="center-item">${this.spread}</div>
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
                `;
            }
            if (this.gameStatus === "In Progress") {
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
                            <div class="center-item">${this.time}</div>
                            <div class="center-item">${this.awayScore} - ${this.homeScore}</div>
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
                `;
            }
            if (this.gameStatus === "End of Period") {
                return `
                    ${this.awayTeam}: ${this.awayScore} <br>
                    ${this.homeTeam}: ${this.homeScore} <br>
                    End of Quarter
                `;
            }
            if (this.gameStatus === "Half Time") {
                return `
                    ${this.awayTeam}: ${this.awayScore} <br>
                    ${this.homeTeam}: ${this.homeScore} <br>
                    Halftime
                `;
            }

            return "Game info unavailable.";
        }
    }
}