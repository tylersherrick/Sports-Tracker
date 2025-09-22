function cfbVariables(event) {
    return {
        gameId: event.id,
        awayId: event.competitions[0].competitors[1].id,
        awayLogo: event.competitions[0].competitors[1].team.logo,
        awayRank: event.competitions[0].competitors[1].curatedRank.current,
        awayRecord: event.competitions[0].competitors[1].records[0].summary,
        awayScore: event.competitions[0].competitors[1].score,
        awayTeam: event.competitions[0].competitors[1].team.shortDisplayName,
        ballPosition: event.competitions[0].situation?.downDistanceText || 'Switching Possession',
        gameStatus: event.status.type.description,
        homeId: event.competitions[0].competitors[0].id,
        homeLogo: event.competitions[0].competitors[0].team.logo,
        homeRank: event.competitions[0].competitors[0].curatedRank.current,
        homeRecord: event.competitions[0].competitors[0].records[0].summary,
        homeScore: event.competitions[0].competitors[0].score,
        homeTeam: event.competitions[0].competitors[0].team.shortDisplayName,
        posession: event.competitions[0].situation?.possession || "",
        scheduleTime: event.status.type.shortDetail,
        shortAwayTeam: event.competitions[0].competitors[1].team.abbreviation,
        shortHomeTeam: event.competitions[0].competitors[0].team.abbreviation,
        situation: event.competitions[0].situation || "",
        spread: event.competitions[0]?.odds?.[0]?.details || "",
        time: event.status.type.detail,
        venue: event.competitions[0].venue.fullName,
        inProgress() {
            return `
                <div id="${this.gameId}" class="game-row scheduled">
                    <div class="team away">
                        <img src="${this.awayLogo}" class="team-logo" alt="${this.awayTeam}">
                        <div class="team-info">
                            <div class="score">${this.awayRank}</div>
                            <div class="abbr">${this.shortAwayTeam}</div>
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
                            <div class="score">${this.homeRank}</div>
                            <div class="abbr">${this.shortHomeTeam}</div>
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
                            <div class="">${this.awayRank} ${this.shortAwayTeam}</div>
                            <div class="abbr">${this.awayRecord}</div>
                        </div>
                    </div>
                    <div class="game-center">
                        <div class="inning-outs">${this.scheduleTime}</div>
                    </div>
                    <div class="team home">
                        <div class="team-info">
                            <div class="">${this.homeRank} ${this.shortHomeTeam}</div>
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
                            <div class="score">${this.awayScore}</div>
                            <div class="abbr">${this.shortAwayTeam}</div>
                        </div>
                    </div>
                    <div class="game-center">
                        <div class="inning-outs">${this.scheduleTime} </div>
                        <div class="abbr">${this.awayScore} - ${this.homeScore}</div>
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
                        <div class="inning-outs">${this.scheduleTime} </div>
                        <div class="abbr">${this.awayScore} - ${this.homeScore}</div>
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
                    <div class="team away individual-away">
                        <img src="${this.awayLogo}" class="individual-logo" alt="${this.awayTeam}">
                        <div class="individual-team-info">
                            <div class="score"></div>
                            <div class="abbr individual-details">${this.awayRank} ${this.shortAwayTeam} - ${this.awayRecord}</div>
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
                            <div class="abbr individual-details">${this.homeRank} ${this.shortHomeTeam} - ${this.homeRecord}</div>
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
                                <div class="abbr individual-details">${this.awayRank} ${this.shortAwayTeam} - ${this.awayRecord}</div>
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
                                <div class="abbr individual-details">${this.homeRank} ${this.shortHomeTeam} - ${this.homeRecord}</div>
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
                                <div class="abbr individual-details">${this.awayRank} ${this.shortAwayTeam} - ${this.awayRecord}</div>
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
                                <div class="abbr individual-details">${this.homeRank} ${this.shortHomeTeam} - ${this.homeRecord}</div>
                            </div>
                        </div>
                    </div>
                `;
            }
            if (this.gameStatus === "Half Time") {
                return `
                    <div id="${this.gameId}" class="game-row individual-game-row">
                        <div class="team away individual-away">
                            <img src="${this.awayLogo}" class="individual-logo" alt="${this.awayTeam}">
                            <div class="individual-team-info">
                                <div class="score"></div>
                                <div class="abbr individual-details">${this.awayRank} ${this.shortAwayTeam} - ${this.awayRecord}</div>
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
                                <div class="abbr individual-details">${this.homeRank} ${this.shortHomeTeam} - ${this.homeRecord}</div>
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
                                <div class="abbr individual-details">${this.awayRank} ${this.shortAwayTeam} - ${this.awayRecord}</div>
                            </div>
                        </div>
                        <div class="individual-center">
                            <div class="center-item">${this.awayTeam} at ${this.homeTeam}</div>
                            <div class="center-item"><strong>${this.scheduleTime}</strong>: ${this.awayScore} - ${this.homeScore}</div>
                            <div class="center-item"><strong>Attendance</strong>: ${this.attendance}</div>
                            <div class="center-item">${this.gameSummary}</div>
                        </div>
                        <div class="team home">
                            <img src="${this.homeLogo}" class="individual-logo" alt="${this.homeTeam}">
                            <div class="individual-team-info">
                                <div class="score"></div>
                                <div class="abbr individual-details">${this.homeRank} ${this.shortHomeTeam} - ${this.homeRecord}</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
    }
}
