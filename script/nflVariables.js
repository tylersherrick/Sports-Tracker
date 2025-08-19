function nflVariables(event) {
    return {
        gameId: event.id,
        awayTeam: event.competitions[0].competitors[1].team.displayName,
        homeTeam: event.competitions[0].competitors[0].team.displayName,
        gameStatus: event.status.type.shortDetail,
        awayScore: event.competitions[0].competitors[1].score,
        homeScore: event.competitions[0].competitors[0].score,
        time: event.status.type.detail,
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
                <div id="${this.gameId}" class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${this.time} </br></br>
                            ${this.awayTeam} </br>
                            ${this.homeTeam}
                        </p>
                        <p class="game-details">
                        </p>
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