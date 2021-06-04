import {getDeckhash, getDecklist} from "./svportal.js";
import {processDecklist} from "./decklist.js";

import "./styles.css";

const twitch = window.Twitch.ext;

function configMain() {
    const template = document.getElementById("loading");
    let loadingSpinner = template.content.cloneNode(true);
    const decklistDiv = document.getElementById("decklist");
    decklistDiv.replaceChildren(loadingSpinner);

    const deckcode = document.getElementById("deckcode").value;

    let lang = "en";
    if(twitch.configuration.broadcaster) {
        const jsonConfig = JSON.parse(twitch.configuration.broadcaster.content);
        lang = jsonConfig["lang"] ? jsonConfig["lang"] : "en";
    }

    getDeckhash(deckcode)
    .then(hash => getDecklist(hash, lang))
    .then(decklist => processDecklist(decklist));
}

function setLang() {
    const e = document.getElementById("lang-select");

    const langCode = e.value;
    const langText = e.options[e.selectedIndex].text;
    
    const s = document.getElementById("current-lang");
    s.textContent = langText;

    if(twitch.configuration.broadcaster) {
        let jsonConfig = JSON.parse(twitch.configuration.broadcaster.content);
        jsonConfig["lang"] = langCode;
        twitch.configuration.set('broadcaster', '', JSON.stringify(jsonConfig));
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    const el = document.getElementById("confirm");
    el.addEventListener("click", configMain, false);

    const la = document.getElementById("set-lang");
    la.addEventListener("click", setLang, false);

    twitch.configuration.onChanged( () => {
        if(twitch.configuration.broadcaster) {
            let jsonConfig = JSON.parse(twitch.configuration.broadcaster.content);
            if(jsonConfig["lang"]) {
                const langs = {"en": "English", "ja": "日本語", "ko": "한국어", "zh-tw": "繁體中文", 
                                "fr": "Français", "it": "Italiano", "de": "Deutsch", "es": "Español"};

                const s = document.getElementById("current-lang");
                s.textContent = langs[jsonConfig["lang"]];

                document.querySelector('#lang-select [value="' + jsonConfig['lang'] + '"]').selected = true;
            }
        }
    });

})