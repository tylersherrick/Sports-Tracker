const baseballURL = 'https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard';
const showMLBData = document.getElementById("mlb-data");
const showNFLData = document.getElementById("nfl-data");

const fetchTodaysMLBGames = async () => {
    try {
        const response = await fetch(baseballURL);
        const result = await response.json();
        const events = result.events;
        showMLBData.innerHTML = `
            <h1>MLB</h1>
            <h3>Games Today: ${events.length}</h3>
        `;
        events.forEach(event => {
            const checkStatus = event.status.type.name;
            const inning = event.status.type.detail;
            const homeTeam = event.competitions[0].competitors.find(c => c.homeAway === "home");
            const awayTeam = event.competitions[0].competitors.find(c => c.homeAway === "away");
            const homeScore = homeTeam.score;
            const awayScore = awayTeam.score;
            let displayText = ``;
            if (checkStatus === 'STATUS_SCHEDULED') {
                const gameDate = new Date(event.date);
                const options = {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                    timeZoneName: 'short' 
                };
                const localTime = new Intl.DateTimeFormat('en-US', options).format(gameDate);
                displayText += `${localTime} - ${event.name}`;
            } else if (checkStatus === 'STATUS_IN_PROGRESS') {
                displayText += `${awayTeam.team.displayName} ${awayScore} - ${homeTeam.team.displayName} ${homeScore} (${inning})`;
            } else if (checkStatus === 'STATUS_FINAL') {
                displayText += `Final: ${awayTeam.team.displayName} ${awayScore} - ${homeTeam.team.displayName} ${homeScore}`;
            }
            showMLBData.innerHTML += `<p>${displayText}</p>`;
        });
    } catch (err) {
        console.error(err);
    }
}

const fetchTodaysNFLGames = () => {
    showNFLData.innerHTML = `<h1>NFL</h1>`
}


fetchTodaysMLBGames();
fetchTodaysNFLGames();

setInterval(fetchTodaysMLBGames, 6000);
