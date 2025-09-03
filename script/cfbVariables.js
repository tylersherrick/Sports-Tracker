function cfbVariables(event) {
    return {
        gameId: event.id,
        awayTeam: event.competitions[0].competitors[1].team.shortDisplayName,
        homeTeam: event.competitions[0].competitors[0].team.shortDisplayName,
        shortAwayTeam: event.competitions[0].competitors[1].team.abbreviation,
        shortHomeTeam: event.competitions[0].competitors[0].team.abbreviation,
        homeLogo: event.competitions[0].competitors[0].team.logo,
        awayLogo: event.competitions[0].competitors[1].team.logo,
        homeRecord: event.competitions[0].competitors[0].records[0].summary,
        awayRecord: event.competitions[0].competitors[0].records[0].summary,
        spread: event.competitions[0]?.odds?.[0]?.details || "",
        awayId: event.competitions[0].competitors[1].id,
        homeId: event.competitions[0].competitors[0].id,
        gameStatus: event.status.type.description,
        awayScore: event.competitions[0].competitors[1].score,
        homeScore: event.competitions[0].competitors[0].score,
        time: event.status.type.detail,
        scheduleTime: event.status.type.shortDetail, 
        awayRank: event.competitions[0].competitors[1].curatedRank.current,
        homeRank: event.competitions[0].competitors[0].curatedRank.current,
        situation: event.competitions[0].situation || "",
        ballPosition: event.competitions[0].situation?.downDistanceText || 'Switching Possession',
        posession: event.competitions[0].situation?.possession || "",
        gameStatus: event.status.type.description,
        venue: event.competitions[0].venue.fullName,
        scheduledGame() {
            return `
                <div id="${this.gameId}" class="game-row scheduled">
                    <!-- Away team: logo, score, abbrev -->
                    <div class="team away">
                        <img src="${this.awayLogo}" class="team-logo" alt="${this.awayTeam}">
                        <div class="team-info">
                            <div class="score">${this.awayRank}</div>
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
                            <div class="score">${this.homeRank}</div>
                            <div class="abbr">${this.shortHomeTeam}</div>
                        </div>
                        <img src="${this.homeLogo}" class="team-logo" alt="${this.homeTeam}">
                    </div>
                </div>
            `
        },
        inProgress() {
            return `
                <div id="${this.gameId}" class="game-row scheduled">
                    <!-- Away team: logo, score, abbrev -->
                    <div class="team away">
                        <img src="${this.awayLogo}" class="team-logo" alt="${this.awayTeam}">
                        <div class="team-info">
                            <div class="score">${this.awayRank}</div>
                            <div class="abbr">${this.shortAwayTeam}</div>
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
                            <div class="score">${this.homeRank}</div>
                            <div class="abbr">${this.shortHomeTeam}</div>
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
                            <div class="score">${this.awayScore}</div>
                            <div class="abbr">${this.shortAwayTeam}</div>
                        </div>
                    </div>
                    <div class="game-center">
                        <div class="inning-outs">${this.scheduleTime}</div>
                    </div>
                    <div class="team home">
                        <div class="team-info">
                            <div class="score">${this.homeScore}</div>
                            <div class="abbr">${this.shortHomeTeam}</div>
                        </div>
                        <img src="${this.homeLogo}" class="team-logo" alt="${this.homeTeam}">
                    </div>
                </div>
            `
        },
        halfTime() {
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
                        <div class="inning-outs">${this.scheduleTime}</div>
                    </div>
                    <div class="team home">
                        <div class="team-info">
                            <div class="score">${this.homeScore}</div>
                            <div class="abbr">${this.shortHomeTeam}</div>
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
                            <div class="score">${this.awayRank}</div>
                            <div class="abbr">${this.shortAwayTeam}</div>
                        </div>
                    </div>
                    <div class="game-center">
                        <div class="inning-outs">${this.scheduleTime}</div>
                        <div class="score">${this.awayScore} - ${this.homeScore}</div>
                    </div>
                    <div class="team home">
                        <div class="team-info">
                            <div class="score">${this.homeRank}</div>
                            <div class="abbr">${this.shortHomeTeam}</div>
                        </div>
                        <img src="${this.homeLogo}" class="team-logo" alt="${this.homeTeam}">
                    </div>
                </div>
            `
        },
        renderIndividualView() {
            if (this.gameStatus === "Scheduled") {
                return `
                    <div id="${this.gameId}" class="game-row individual-game-row">
                    <!-- Away team: logo, score, abbrev -->
                    <div class="team away individual-away">
                        <img src="${this.awayLogo}" class="individual-logo" alt="${this.awayTeam}">
                        <div class="individual-team-info">
                            <div class="score"></div>
                            <div class="abbr individual-details">${this.shortAwayTeam} - ${this.awayRecord}</div>
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
                        </div>
                    </div>
                </div>
                `;
            }
        }
    }
}
