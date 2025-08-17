function cfbVariables(event) {
    return {
        awayTeam: event.competitions[0].competitors[1].team.shortDisplayName,
        homeTeam: event.competitions[0].competitors[0].team.shortDisplayName,
        awayId: event.competitions[0].competitors[1].id,
        homeId: event.competitions[0].competitors[0].id,
        gameStatus: event.status.type.shortDetail,
        awayScore: event.competitions[0].competitors[1].score,
        homeScore: event.competitions[0].competitors[0].score,
        time: event.status.type.detail,
        awayRank: event.competitions[0].competitors[1].curatedRank.current,
        homeRank: event.competitions[0].competitors[0].curatedRank.current,
        situation: event.competitions[0].situation || "",
        ballPosition: event.competitions[0].situation?.downDistanceText || 'Switching Possession',
        posession: event.competitions[0].situation?.possession || "",
        inProgress() {
            return `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${this.time} </br></br>
                            ${this.awayRank} ${this.awayTeam} -  ${this.awayScore} ${this.awayID}</br>
                            ${this.homeRank} ${this.homeTeam} -  ${this.homeScore} ${this.homeID}</br></br>
                        </p>
                        <p class="game-details">
                            ${this.allPosition}
                        </p>
                    </div>
                </div>
            `
        },
        endOfPeriod() {
            return `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${this.time} </br></br>
                            ${this.awayRank} ${this.awayTeam} -  ${this.awayScore} </br>
                            ${this.homeRank} ${this.homeTeam} -  ${this.homeScore} </br></br>
                        </p>
                        <p class="game-details">
                            End of Quarter
                        </p>
                    </div>
                </div>
            `
        },
        halfTime() {
            return `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${this.time} </br></br>
                            ${this.awayRank} ${this.awayTeam} -  ${this.awayScore} </br>
                            ${this.homeRank} ${this.homeTeam} -  ${this.homeScore} </br></br>
                        </p>
                        <p class="game-details">
                            Halftime
                        </p>
                    </div>
                </div>
            `
        },
        gameOver() {
            return `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${this.time} </br></br>
                            ${this.awayRank} ${this.awayTeam} </br>
                            ${this.homeRank} ${this.homeTeam}
                        </p>
                        <p class="game-details">
                        </p>
                    </div>
                </div>
            `
        },
        scheduledGame() {
            return `
                <div class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${this.time} </br></br>
                            ${this.awayRank} ${this.awayTeam} </br>
                            ${this.homeRank} ${this.homeTeam} </br></br>
                        </p>
                        <p class="game-details">
                        </p>
                    </div>
                </div>
            `
        }
    }
}