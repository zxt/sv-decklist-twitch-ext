import "./styles.css";

document.addEventListener("DOMContentLoaded", function(event) {
    const twitch = window.Twitch.ext;

    twitch.configuration.onChanged( () => {
        if(twitch.configuration.broadcaster) {
            try {
                let hash = twitch.configuration.broadcaster.content;

            } catch (e) {
                twitch.rig.log('Invalid config');
            }
        } else {
            twitch.rig.log("no broadcaster config found");
        }
    })
})