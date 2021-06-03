import {addClass} from "./utils.js";
import {delegate} from "tippy.js";
import "tippy.js/dist/tippy.css";

function setupTooltips() {
    delegate("#decklist", {
        target: "a",
        arrow: false,
        placement: "auto",
        content(reference) {
            // with event delegation, all the code below executes
            // on the parent first, which is not wanted
            if(reference.id == "decklist") {
                return;
            }

            const template = document.getElementById("tooltip");
            let tooltip = template.content.cloneNode(true);

            function setupFragment(attr, query, prop="textContent") {
                const dataAttr = reference.getAttribute(attr);
                const tooltipElem = tooltip.querySelector(query);
                tooltipElem[prop] = dataAttr;
            };

            const dataCardCharType = reference.getAttribute("data-card-char-type");
            if(dataCardCharType != 1) {
                const tooltipFollowerStatsDivs = tooltip.querySelectorAll(".follower-stats");
                tooltipFollowerStatsDivs.forEach( div => addClass(div, "is-hidden"));
            }

            setupFragment("data-card-name", ".bl-tooltip-card-name");
            setupFragment("data-card-tribe-name", "span[data-card-tribe-name]");
            setupFragment("data-card-atk", "span[data-card-atk]");
            setupFragment("data-card-life", "span[data-card-life]");
            setupFragment("data-card-evo-atk", "span[data-card-evo-atk]");
            setupFragment("data-card-evo-life", "span[data-card-evo-life]");
            setupFragment("data-card-skill-disc", "p[data-card-skill-disc]", "innerHTML");
            setupFragment("data-card-evo-skill-disc", "p[data-card-evo-skill-disc]", "innerHTML");
            setupFragment("data-card-src", "img[data-card-src]", "src");
            setupFragment("data-card-name-src", "img[data-card-name-src]", "src");

            const tooltipContainer = document.createElement("div");
            addClass(tooltipContainer, "tooltip-container");
            tooltipContainer.appendChild(tooltip);

            return tooltipContainer;
        }
    })
}

export {setupTooltips};