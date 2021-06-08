const CORS_PROXY_URL = "https://secure-brook-72787.herokuapp.com/";

function getDeckhash(deckcode) {
    const SVPORTAL_DECKCODE_URL = "shadowverse-portal.com/api/v1/deck/import?format=json&deck_code=";

    let deckhash = fetch(CORS_PROXY_URL + SVPORTAL_DECKCODE_URL + deckcode)
    .then(response => response.json())
    .then(jsonData => jsonData.data.hash)

    return deckhash;
}

function getDecklist(hash, lang="en") {
    if(!hash) return;

    const SVPORTAL_DECKHASH_URL = "shadowverse-portal.com/api/v1/deck?format=json&lang="+lang+"&hash=";

    let decklist = fetch(CORS_PROXY_URL + SVPORTAL_DECKHASH_URL + hash)
    .then(response => response.json())
    .then(jsonData => jsonData.data)

    return decklist;
}

export {getDeckhash, getDecklist};