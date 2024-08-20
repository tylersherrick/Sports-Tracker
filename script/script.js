const mlbURL = 'https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard';
const nflURL = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';
const nhlURL = 'https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard';
const showMLBData = document.getElementById("mlb-data");
const showNFLData = document.getElementById("nfl-data");
const showNHLData = document.getElementById("nhl-data");

const fetchTodaysMLBGames = async () => {
    try {
        const response = await fetch(mlbURL);
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
            const scheduledDate = event.status.type.detail;
            let displayText = ``;
            if (checkStatus === 'STATUS_SCHEDULED') {
                displayText += `${event.name} - ${scheduledDate}`;
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

const fetchTodaysNFLGames = async () => {
    try {
        const response = await fetch(nflURL);
        const result = await response.json();
        const events = result.events;
        showNFLData.innerHTML = `
            <h1>NFL</h1>
            <h3>Games Today: ${events.length}</h3>
        `;
        events.forEach(event => {
            const checkStatus = event.status.type.name;
            const homeTeam = event.competitions[0].competitors.find(c => c.homeAway === "home");
            const awayTeam = event.competitions[0].competitors.find(c => c.homeAway === "away");
            const homeScore = homeTeam.score;
            const awayScore = awayTeam.score;
            const scheduledDate = event.status.type.detail;
            let displayText = ``;
            if (checkStatus === 'STATUS_SCHEDULED') {
                displayText += `${event.name} - ${scheduledDate}`;
            } else if (checkStatus === 'STATUS_IN_PROGRESS') {
                displayText += `${awayTeam.team.displayName} ${awayScore} - ${homeTeam.team.displayName} ${homeScore}`;
            } else if (checkStatus === 'STATUS_FINAL') {
                displayText += `Final: ${awayTeam.team.displayName} ${awayScore} - ${homeTeam.team.displayName} ${homeScore}`;
            } 
            showNFLData.innerHTML += `<p>${displayText}</p>`;
        });
    } catch (err) {
        console.error(err);
    }
}

const fetchTodaysNHLGames = async () => {
    try {
        const response = await fetch(nhlURL);
        const result = await response.json();
        const events = result.events;
        showNHLData.innerHTML = `
            <h1>NHL</h1>
            <h3>Games Today: ${events.length}</h3>
        `;
        events.forEach(event => {
            const checkStatus = event.status.type.name;
            const homeTeam = event.competitions[0].competitors.find(c => c.homeAway === "home");
            const awayTeam = event.competitions[0].competitors.find(c => c.homeAway === "away");
            const homeScore = homeTeam.score;
            const awayScore = awayTeam.score;
            const scheduledDate = event.status.type.detail;
            let displayText = ``;
            if (checkStatus === 'STATUS_SCHEDULED') {
                displayText += `${event.name} - ${scheduledDate}`;
            } else if (checkStatus === 'STATUS_IN_PROGRESS') {
                displayText += `${awayTeam.team.displayName} ${awayScore} - ${homeTeam.team.displayName} ${homeScore}`;
            } else if (checkStatus === 'STATUS_FINAL') {
                displayText += `Final: ${awayTeam.team.displayName} ${awayScore} - ${homeTeam.team.displayName} ${homeScore}`;
            } 
            showNHLData.innerHTML += `<p>${displayText}</p>`;
            console.log(events);
        });
    } catch (err) {
        console.log(err);
    }
}

fetchTodaysMLBGames();
fetchTodaysNFLGames();
fetchTodaysNHLGames();

setInterval(fetchTodaysMLBGames, 1000);
setInterval(fetchTodaysNFLGames, 1000);
setInterval(fetchTodaysNHLGames, 1000);