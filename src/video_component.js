import {getDecklist} from "./svportal.js";
import {processDecklist} from "./decklist.js";
import {getConfig} from "./ttv_config.js";

import "./styles.css";

document.addEventListener("DOMContentLoaded", function(event) {
    const twitch = window.Twitch.ext;

    twitch.onAuthorized( auth => {
        //
    });

    twitch.configuration.onChanged( () => {
        if(twitch.configuration.broadcaster) {
            try {
                let hash = getConfig("hash", "");
                let lang = getConfig("lang", "en");

                getDecklist(hash, lang)
                .then(decklist => processDecklist(decklist, false));

            } catch (e) {
                //
            }
        } else {
            //
        }
    })

    twitch.listen("broadcast", ( (target, contentType, message) => {
        let lang = getConfig("lang", "en");

        getDecklist(message, lang)
        .then(decklist => processDecklist(decklist, false));
    }));
})