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
                let hash = twitch.configuration.broadcaster.content;

                getDecklist(hash)
                .then(decklist => processDecklist(decklist, false));

            } catch (e) {
                //
            }
        } else {
            //
        }
    })

    twitch.listen("broadcast", ( (target, contentType, message) => {
        getDecklist(message)
        .then(decklist => processDecklist(decklist, false));
    }));
})