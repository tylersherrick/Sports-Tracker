function mlbVariables(game) {
    return {
        gameId: game.id,
        homeTeam: game.competitions[0].competitors[0].team.displayName,
        awayTeam: game.competitions[0].competitors[1].team.displayName,
        homeScore: game.competitions[0].competitors[0].score,
        awayScore: game.competitions[0].competitors[1].score,
        futureWeather: game.weather?.displayValue || "",
        currentWeather: game.weather?.conditionId || "",
        temperature: game.weather?.temperature || "",
        venue: game.competitions[0].venue.fullName,
        gameSummary: game.competitions[0].headlines?.[0]?.shortLinkText || "",
        preGameMessage: game.competitions[0].headlines?.[0]?.shortLinkText,
        lastPlay: game.competitions[0].situation?.lastPlay?.text ? game.competitions[0].situation.lastPlay.text : "",
        attendance: game.competitions[0].attendance,
        gameStatus: game.status.type.description,
        teamsPlaying: game.status.type.shortDetail,
        balls: game.competitions[0].situation?.balls ?? 0,
        strikes: game.competitions[0].situation?.strikes ?? 0,
        outs: game.competitions[0].outsText,
        inning: game.status.type.detail,
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
        probableHomeStarter: game.competitions[0].competitors[0].probables?.[0]?.athlete?.displayName,
        probableAwayStarter: game.competitions[0].competitors[1].probables?.[0]?.athlete?.displayName,
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
                <div id="${this.gameId}" class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${this.inning} ${this.gameShortDetail} </br></br>
                            ${this.awayTeam} </br>
                            ${this.homeTeam}
                        </p>
                        <p class="game-details"></p>
                    </div>
                </div>
            `;
        },
        inProgressGame() {
            return `
                <div id="${this.gameId}" class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${this.inning} </br></br>
                            ${this.awayTeam} - ${this.awayScore} </br>
                            ${this.homeTeam} - ${this.homeScore}
                        </p>
                        <p class="game-details">
                            ${this.balls}-${this.strikes} - ${this.outs}
                        </p>
                    </div>
                    <div class="base-map">
                        <div class="base first-base ${this.onFirst ? 'occupied' : ''}"></div>
                        <div class="base second-base ${this.onSecond ? 'occupied' : ''}"></div>
                        <div class="base third-base ${this.onThird ? 'occupied' : ''}"></div>
                    </div>
                </div>
            `;
        },
        gameOver() {
            return `
                <div id="${this.gameId}" class="game-row">
                    <div class="game-info">
                        <p class="game-details">
                            ${this.inning} </br></br>
                            ${this.awayTeam} - ${this.awayScore} </br>
                            ${this.homeTeam} - ${this.homeScore}
                        </p>
                        <p class="game-details"></p>
                    </div>
                </div>
            `;
        }
    };
}
