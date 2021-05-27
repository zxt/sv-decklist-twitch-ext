import {getDeckhash, getDecklist} from "./svportal.js";
import {processDecklist} from "./decklist.js";

import "./styles.css";

function configMain() {
    const deckcode = document.getElementById("deckcode").value;

    getDeckhash(deckcode)
    .then(hash => getDecklist(hash))
    .then(decklist => processDecklist(decklist));
}

document.addEventListener("DOMContentLoaded", function(event) {
    const el = document.getElementById("confirm");
    el.addEventListener("click", configMain, false);
})