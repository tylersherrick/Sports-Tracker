function nflVariables(event) {
    return {
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
        scheduledGame() {
            return `
                <div class="game-row">
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
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${this.time} </br></br>
                            ${this.awayTeam} -  ${this.awayScore} ${this.awayID}</br>
                            ${this.homeTeam} -  ${this.homeScore} ${this.homeID}</br></br>
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
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${this.time} </br></br>
                            ${this.awayTeam} -  ${this.awayScore} </br>
                            ${this.homeTeam} -  ${this.homeScore} </br></br>
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
                <div class="game-row">
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
        gameOver() {
            return `
                <div class="game-row">
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
        }
    }
}