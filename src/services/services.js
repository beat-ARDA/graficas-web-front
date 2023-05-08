async function insertScoreOnePlayer(bodyData) {

    console.log(bodyData);

    return await fetch('http://localhost:4000/api/scoreOnePlayer', {
        method: 'POST',
        body: JSON.stringify(bodyData),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.text())
        .then(data => { console.log(data); return JSON.parse(data); });
}

export { insertScoreOnePlayer }