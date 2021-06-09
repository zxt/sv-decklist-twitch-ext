import {getDeckhash, getDecklist} from "./svportal.js";
import {processDecklist} from "./decklist.js";
import {saveConfig, getConfig} from "./ttv_config.js";

import "./styles.css";

function getDeck() {
    const template = document.getElementById("loading");
    let loadingSpinner = template.content.cloneNode(true);
    const decklistDiv = document.getElementById("decklist");
    decklistDiv.replaceChildren(loadingSpinner);

    const deckcode = document.getElementById("deckcode").value;
    const dcError = document.getElementById("deckcode-error");

    getDeckhash(deckcode)
    .then(hash => {
        let lang = getConfig("lang", "en");

        saveConfig("hash", hash);

        decklistDiv.dataset.hash = hash;
        dcError.textContent = "";

        return getDecklist(hash, lang);
    }, errorMsg => {
        dcError.textContent = errorMsg;
        decklistDiv.replaceChildren();
    })
    .then(decklist => processDecklist(decklist, false));
}

document.addEventListener("DOMContentLoaded", function(event) {
    const el = document.getElementById("getdeck");
    el.addEventListener("click", getDeck, false);
})