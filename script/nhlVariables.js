function nhlVariables(event) {
    return {
        gameId: event.id,
        attendance: event.competitions[0].attendance,
        awayTeam: event.competitions[0].competitors[1].team.displayName,
        homeTeam: event.competitions[0].competitors[0].team.displayName,
        awayLogo: event.competitions[0].competitors[1].team.logo,
        awayScore: event.competitions[0].competitors[1].score,
        homeLogo: event.competitions[0].competitors[0].team.logo,
        homeScore: event.competitions[0].competitors[0].score,
        shortAwayTeam: event.competitions[0].competitors[1].team.abbreviation,
        shortHomeTeam: event.competitions[0].competitors[0].team.abbreviation,
        time: event.status.type.detail,
        scheduleTime: event.status.type.shortDetail,
        gameStatus: event.status.type.description,
        awayRecord: event.competitions[0].competitors[1].records[0].summary,
        homeRecord: event.competitions[0].competitors[0].records[0].summary,
        venue: event.competitions[0].venue.fullName,
        spread: event.competitions[0].odds?.[0]?.details || "",
        awayOdds: event.competitions[0].odds?.[0]?.awayTeamOdds?.moneyLine || "",
        homeOdds: event.competitions[0].odds?.[0]?.awayTeamOdds?.moneyLine || "",
        inProgress() {
            return `
                <div id="${this.gameId}" class="game-row scheduled">
                    <div class="team away">
                        <img src="${this.awayLogo}" class="team-logo" alt="${this.awayTeam}">
                        <div class="team-info">
                            <div class="abbr">${this.shortAwayTeam}</div>
                            <div class="abbr">${this.awayRecord}</div>
                        </div>
                    </div>
                    <div class="game-center">
                        <div class="game-center">
                        <div class="inning-outs">${this.scheduleTime} </div>
                        <div class="abbr">${this.awayScore} - ${this.homeScore}</div>
                    </div>
                    </div>
                    <div class="team home">
                        <div class="team-info">
                            <div class="abbr">${this.shortHomeTeam}</div>
                            <div class="abbr">${this.homeRecord}</div>
                        </div>
                        <img src="${this.homeLogo}" class="team-logo" alt="${this.homeTeam}">
                    </div>
                </div>
            `
        },
        endOfPeriod() {
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
                        <div class="inning-outs">${this.scheduleTime} </div>
                        <div class="abbr">${this.awayScore} - ${this.homeScore}</div>
                    </div>
                    <div class="team home">
                        <div class="team-info">
                            <div class="abbr">${this.shortHomeTeam}</div>
                            <div class="abbr">${this.homeRecord}</div>
                        </div>
                        <img src="${this.homeLogo}" class="team-logo" alt="${this.homeTeam}">
                    </div>
                </div>
            `
        },
        scheduledGame() {
            return `
                <div id="${this.gameId}" class="game-row scheduled">
                    <div class="team away">
                        <img src="${this.awayLogo}" class="team-logo" alt="${this.awayTeam}">
                        <div class="team-info">
                            <div class="">${this.shortAwayTeam}</div>
                            <div class="abbr">${this.awayRecord}</div>
                        </div>
                    </div>
                    <div class="game-center">
                        <div class="inning-outs">${this.scheduleTime}</div>
                    </div>
                    <div class="team home">
                        <div class="team-info">
                            <div class="">${this.shortHomeTeam}</div>
                            <div class="abbr">${this.homeRecord}</div>
                        </div>
                        <img src="${this.homeLogo}" class="team-logo" alt="${this.homeTeam}">
                    </div>
                </div>
            `
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
                        <div class="inning-outs">${this.scheduleTime}</div>
                        <div class="score">${this.awayScore} - ${this.homeScore}</div>
                    </div>
                    <div class="team home">
                        <div class="team-info">
                            <div class="abbr">${this.shortHomeTeam}</div>
                            <div class="abbr">${this.awayRecord}</div>
                        </div>
                        <img src="${this.homeLogo}" class="team-logo" alt="${this.homeTeam}">
                    </div>
                </div>
            `
        },
        renderIndividualView() {
            if(this.homeOdds > 0) {
                this.homeOdds = `+${this.homeOdds}`;
            }
            if(this.awayOdds > 0) {
                this.awayOdds = `+${this.awayOdds}`;
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
                            <div class="center-item">${this.venue}</div>
                            <div class="center-item">${this.scheduleTime}</div>
                            <div class="center-item">${this.spread}</div>
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
                            </div>
                        </div>
                        <div class="individual-center">
                            <div class="center-item">${this.awayTeam} at ${this.homeTeam}</div>
                            <div class="center-item">${this.time}</div>
                            <div class="center-item">${this.awayScore} - ${this.homeScore}</div>
                        </div>
                        <div class="team home">
                            <img src="${this.homeLogo}" class="individual-logo" alt="${this.homeTeam}">
                            <div class="individual-team-info">
                                <div class="score"></div>
                                <div class="abbr individual-details">${this.shortHomeTeam} - ${this.homeRecord}</div>
                            </div>
                        </div>
                    </div>
                `;
            }
            if (this.gameStatus === "End of Period") {
                return `
                    <div id="${this.gameId}" class="game-row individual-game-row">
                        <div class="team away individual-away">
                            <img src="${this.awayLogo}" class="individual-logo" alt="${this.awayTeam}">
                            <div class="individual-team-info">
                                <div class="score"></div>
                                <div class="abbr individual-details">${this.shortAwayTeam} - ${this.awayRecord}</div>
                            </div>
                        </div>
                        <div class="individual-center">
                            <div class="center-item">${this.awayTeam} at ${this.homeTeam}</div>
                            <div class="center-item">${this.scheduleTime}</div>
                            <div class="center-item">${this.awayScore} - ${this.homeScore}</div>
                        </div>
                        <div class="team home">
                            <img src="${this.homeLogo}" class="individual-logo" alt="${this.homeTeam}">
                            <div class="individual-team-info">
                                <div class="score"></div>
                                <div class="abbr individual-details">${this.shortHomeTeam} - ${this.homeRecord}</div>
                            </div>
                        </div>
                    </div>
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
                            </div>
                        </div>
                        <div class="individual-center">
                            <div class="center-item">${this.awayTeam} at ${this.homeTeam}</div>
                            <div class="center-item"><strong>${this.scheduleTime}</strong>: ${this.awayScore} - ${this.homeScore}</div>
                            <div class="center-item"><strong>Attendance</strong>: ${this.attendance}</div>
                        </div>
                        <div class="team home">
                            <img src="${this.homeLogo}" class="individual-logo" alt="${this.homeTeam}">
                            <div class="individual-team-info">
                                <div class="score"></div>
                                <div class="abbr individual-details">${this.shortHomeTeam} - ${this.homeRecord}</div>
                            </div>
                        </div>
                    </div>
                `;
            }
            return "Game info unavailable.";
        }
    }
}