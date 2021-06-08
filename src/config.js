import {getDeckhash, getDecklist} from "./svportal.js";
import {processDecklist, clearDecklist} from "./decklist.js";
import {saveConfig, getConfig, clearConfig} from "./ttv_config.js";

import "./styles.css";

function getDeck() {
    const template = document.getElementById("loading");
    let loadingSpinner = template.content.cloneNode(true);
    const decklistDiv = document.getElementById("decklist");
    decklistDiv.replaceChildren(loadingSpinner);

    const deckcode = document.getElementById("deckcode").value;

    getDeckhash(deckcode)
    .then(hash => {
        let lang = getConfig("lang", "en");

        saveConfig("hash", hash);

        return getDecklist(hash, lang);
    })
    .then(decklist => processDecklist(decklist));
}

function setLang() {
    const e = document.getElementById("lang-select");

    const langCode = e.value;
    const langText = e.options[e.selectedIndex].text;
    
    const s = document.getElementById("current-lang");
    s.textContent = langText;

    saveConfig("lang", langCode, false);
}

function clear() {
    clearDecklist();
    clearConfig("hash");
}

document.addEventListener("DOMContentLoaded", function(event) {
    const el = document.getElementById("getdeck");
    el.addEventListener("click", getDeck, false);

    const cl = document.getElementById("clear");
    cl.addEventListener("click", clear, false);

    const la = document.getElementById("set-lang");
    la.addEventListener("click", setLang, false);

    const twitch = window.Twitch.ext;
    twitch.configuration.onChanged( () => {
        if(twitch.configuration.broadcaster) {
            let jsonConfig = JSON.parse(twitch.configuration.broadcaster.content);
            let lang = "en";
            if(jsonConfig["lang"]) {
                const langs = {"en": "English", "ja": "日本語", "ko": "한국어", "zh-tw": "繁體中文", 
                                "fr": "Français", "it": "Italiano", "de": "Deutsch", "es": "Español"};

                const s = document.getElementById("current-lang");
                s.textContent = langs[jsonConfig["lang"]];

                document.querySelector('#lang-select [value="' + jsonConfig['lang'] + '"]').selected = true;
                lang = jsonConfig["lang"];
            }

            let hash = getConfig("hash", "");
            if(hash) {
                getDecklist(hash, lang)
                .then(decklist => processDecklist(decklist));
            }
        }
    });

})