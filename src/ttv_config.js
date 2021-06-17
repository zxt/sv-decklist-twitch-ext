let twitch = window.Twitch ? window.Twitch.ext : null;
let jsonConfig = {};
if(twitch) {
    twitch.configuration.onChanged( () => {
        if(twitch.configuration.broadcaster) {
            jsonConfig = JSON.parse(twitch.configuration.broadcaster.content);
        }
    })
}

function saveConfig(setting, value, bcast=true) {
    jsonConfig[setting] = value;
    twitch.configuration.set("broadcaster", '', JSON.stringify(jsonConfig));
    if(bcast) {
        broadcast(value);
    }
}

function getConfig(setting, fallback) {
    return jsonConfig[setting] ? jsonConfig[setting] : fallback;
}

function clearConfig(setting) {
    jsonConfig[setting] = "";
    if(twitch.configuration.broadcaster) {
        twitch.configuration.set("broadcaster", '', JSON.stringify(jsonConfig));
        broadcast("");
    }
}

function broadcast(msg) {
    twitch.send("broadcast", "application/json", msg);
}

export {saveConfig, getConfig, clearConfig};