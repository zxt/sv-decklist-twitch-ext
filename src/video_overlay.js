import {getDecklist} from "./svportal.js";
import {processDecklist} from "./decklist.js";

import "./styles.css";

document.addEventListener("DOMContentLoaded", function(event) {
    const twitch = window.Twitch.ext;

    twitch.onAuthorized( auth => {
        //
    });

    twitch.configuration.onChanged( () => {
        if(twitch.configuration.broadcaster) {
            try {
                let jsonConfig = JSON.parse(twitch.configuration.broadcaster.content);
                let hash = jsonConfig["hash"];

                let lang = jsonConfig["lang"] ? jsonConfig["lang"] : "en";

                getDecklist(hash, lang)
                .then(decklist => processDecklist(decklist));

            } catch (e) {
                //
            }
        } else {
            //
        }
    })

    twitch.listen("broadcast", ( (target, contentType, message) => {
        getDecklist(message)
        .then(decklist => processDecklist(decklist));
    }));
})