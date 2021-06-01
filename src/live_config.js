import {getDeckhash, getDecklist} from "./svportal.js";
import {processDecklist} from "./decklist.js";

import "./styles.css";

function configMain() {
    const template = document.getElementById("loading");
    let loadingSpinner = template.content.cloneNode(true);
    const decklistDiv = document.getElementById("decklist");
    decklistDiv.replaceChildren(loadingSpinner);

    const deckcode = document.getElementById("deckcode").value;

    getDeckhash(deckcode)
    .then(hash => {
        let twitch = window.Twitch.ext;
        twitch.configuration.set('broadcaster', '', hash);
        twitch.send("broadcast", "application/json", hash);

        return getDecklist(hash);
    })
    .then(decklist => processDecklist(decklist, false));
}

document.addEventListener("DOMContentLoaded", function(event) {
    const el = document.getElementById("confirm");
    el.addEventListener("click", configMain, false);
})