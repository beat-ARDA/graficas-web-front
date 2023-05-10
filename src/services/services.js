import { scoreOnePlayerPath, scoreTwoPlayerPath } from "./routes";

async function insertScoreOnePlayer(bodyData) {
    return await fetch(scoreOnePlayerPath, {
        method: 'POST',
        body: JSON.stringify(bodyData),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.text())
        .then(data => { console.log(data); return JSON.parse(data); });
}

async function getScoreOnePlayer() {
    return await fetch(scoreOnePlayerPath)
        .then(response => response.json())
        .then(data => { return data })
        .catch(error => console.log('Error:', error));

}

async function insertScoreTwoPlayer(bodyData) {
    return await fetch(scoreTwoPlayerPath, {
        method: 'POST',
        body: JSON.stringify(bodyData),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.text())
        .then(data => { console.log(data); return JSON.parse(data); });
}

async function getScoreTwoPlayer() {
    return await fetch(scoreTwoPlayerPath)
        .then(response => response.json())
        .then(data => { return data })
        .catch(error => console.log('Error:', error));

}

export { insertScoreOnePlayer, getScoreOnePlayer, insertScoreTwoPlayer, getScoreTwoPlayer }