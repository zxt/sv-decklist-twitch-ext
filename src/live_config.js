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
        let jsonConfig = JSON.parse(twitch.configuration.broadcaster.content);
        jsonConfig["hash"] = hash;
        twitch.configuration.set('broadcaster', '', JSON.stringify(jsonConfig));
        twitch.send("broadcast", "application/json", hash);

        let lang = jsonConfig["lang"] ? jsonConfig["lang"] : "en";

        return getDecklist(hash, lang);
    })
    .then(decklist => processDecklist(decklist, false));
}

document.addEventListener("DOMContentLoaded", function(event) {
    const el = document.getElementById("confirm");
    el.addEventListener("click", configMain, false);
})