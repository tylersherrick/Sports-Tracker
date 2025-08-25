function nflVariables(event) {
    return {
        gameId: event.id,
        awayTeam: event.competitions[0].competitors[1].team.displayName,
        homeTeam: event.competitions[0].competitors[0].team.displayName,
        shortAwayTeam: event.competitions[0].competitors[1].team.abbreviation,
        shortHomeTeam: event.competitions[0].competitors[0].team.abbreviation,
        homeLogo: event.competitions[0].competitors[0].team.logo,
        awayLogo: event.competitions[0].competitors[1].team.logo,
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
                <div id="${this.gameId}" class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${this.time} </br></br>
                            ${this.awayTeam} -  ${this.awayScore} ${this.awayID}</br>
                            ${this.homeTeam} -  ${this.homeScore} ${this.homeID}</br>
                        </p>
                        <p class="game-details">
                            ${this.ballPosition}
                        </p>
                    </div>
                </div>
            `;
        },
        endOfPeriod() {
            return `
                <div id="${this.gameId}" class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${this.time} </br></br>
                            ${this.awayTeam} -  ${this.awayScore} </br>
                            ${this.homeTeam} -  ${this.homeScore} </br>
                        </p>
                        <p class="game-details">
                            End of Quarter
                        </p>
                    </div>
                </div>
            `;
        },
        halfTime() {
            return `
                <div id="${this.gameId}" class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${this.time} </br></br>
                            ${this.awayTeam} -  ${this.awayScore} </br>
                            ${this.homeTeam} -  ${this.homeScore} </br>
                        </p>
                        <p class="game-details">
                        </p>
                    </div>
                </div>
            `;
        },
        gameOver() {
            return `
                <div id="${this.gameId}" class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${this.time} </br></br>
                            ${this.awayTeam} -  ${this.awayScore} </br>
                            ${this.homeTeam} -  ${this.homeScore} </br></br>
                        </p>
                        <p class="game-details">
                        </p>
                    </div>
                </div>
            `;
        },
        renderIndividualView() {
            if (this.gameStatus === "Final") {
                return `
                    <div class="nfl-teams">
                        <h3>Final Score:</h3>
                        <h4>${this.awayTeam}: ${this.awayScore}</h4> 
                        <h4>${this.homeTeam}: ${this.homeScore}</h4>
                    </div>
                    <div class="position-play">
                        <p>${this.gameSummary}</p>
                    </div>
                    <div class="game-facts">
                        <p>${this.attendance} fans at ${this.venue}</p>
                `;
            }
            if (this.gameStatus === "Scheduled") {
                return `
                    Game status: ${this.gameStatus} <br>
                    ${this.awayTeam} at ${this.homeTeam} <br>
                    ${this.time} <br>
                    ${this.situation?.note || ''}
                `;
            }
            if (this.gameStatus === "In Progress") {
                return `
                    <div class="individua-game"
                        <div class="nfl-teams">
                            <h3>${this.awayTeam}: ${this.awayScore}</h3> 
                            <h3>${this.homeTeam}: ${this.homeScore}</h3>
                        </div>
                        <div class="position-play">
                            <p>${this.ballPosition}</p>
                            <p>${this.lastPlay}</p>
                        </div>
                        <div class="weather">
                            ${this.weather} and ${this.temperature}° at ${this.venue}
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