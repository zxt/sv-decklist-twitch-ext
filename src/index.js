import {addClass} from "./utils.js";
import tippy, {delegate} from "tippy.js";
import "tippy.js/dist/tippy.css";
import "./styles.css";

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

            const dataCardName = reference.getAttribute("data-card-name");
            const tooltipCardName = tooltip.querySelector(".bl-tooltip-card-name");
            tooltipCardName.textContent = dataCardName;

            const dataCardTribeName = reference.getAttribute("data-card-tribe-name");
            const tooltipCardTribeName = tooltip.querySelector("span[data-card-tribe-name]");
            tooltipCardTribeName.textContent = dataCardTribeName;

            const dataCardCharType = reference.getAttribute("data-card-char-type");

            if(dataCardCharType != 1) {
                const tooltipFollowerStatsDivs = tooltip.querySelectorAll(".follower-stats");
                tooltipFollowerStatsDivs.forEach( div => addClass(div, "is-hidden"));
            }

            const dataCardAtk = reference.getAttribute("data-card-atk");
            const tooltipCardAtk = tooltip.querySelector("span[data-card-atk]");
            tooltipCardAtk.textContent = dataCardAtk;

            const dataCardLife = reference.getAttribute("data-card-life");
            const tooltipCardLife = tooltip.querySelector("span[data-card-life]");
            tooltipCardLife.textContent = dataCardLife;

            const dataCardEvoAtk = reference.getAttribute("data-card-evo-atk");
            const tooltipCardEvoAtk = tooltip.querySelector("span[data-card-evo-atk]");
            tooltipCardEvoAtk.textContent = dataCardEvoAtk;

            const dataCardEvoLife = reference.getAttribute("data-card-evo-life");
            const tooltipCardEvoLife = tooltip.querySelector("span[data-card-evo-life]");
            tooltipCardEvoLife.textContent = dataCardEvoLife;

            const dataCardSkillDisc = reference.getAttribute("data-card-skill-disc");
            const tooltipCardSkillDisc = tooltip.querySelector("p[data-card-skill-disc]");
            tooltipCardSkillDisc.innerHTML = dataCardSkillDisc;

            const dataCardEvoSkillDisc = reference.getAttribute("data-card-evo-skill-disc");
            const tooltipCardEvoSkillDisc = tooltip.querySelector("p[data-card-evo-skill-disc]");
            tooltipCardEvoSkillDisc.innerHTML = dataCardEvoSkillDisc;

            const dataCardSrc = reference.getAttribute("data-card-src");
            const tooltipCardSrc = tooltip.querySelector("img[data-card-src]");
            tooltipCardSrc.src = dataCardSrc;

            const dataCardNameSrc = reference.getAttribute("data-card-name-src");
            const tooltipCardNameSrc = tooltip.querySelector("img[data-card-name-src]");
            tooltipCardNameSrc.src = dataCardNameSrc;

            return tooltip;
        }
    })
}

function processDecklist(data) {
    const cards = data.deck.cards;
    let qty = {};
    cards.forEach(card => qty[card.card_id] = (qty[card.card_id] | 0) + 1);

    let seen = new Set();
    const uniqueCards = cards.filter(card => {
        let k = card.card_id;
        return seen.has(k) ? false : seen.add(k);
    });

    addClass(document.body, "en");

    const ul = document.createElement("ul");
    uniqueCards.forEach(card => {
        const li = document.createElement("li");
        addClass(li, "el-card-list");

        const bgImg = document.createElement("img");
        addClass(bgImg, "el-card-list-image");
        bgImg.src = "https://shadowverse-portal.com/image/card/phase2/common/L/L_" + card.card_id + ".jpg";

        const cardInfoDiv = document.createElement("div");
        addClass(cardInfoDiv, "el-card-list-info");

        const cardCost = document.createElement("p");
        addClass(cardCost, "el-card-list-cost");
        const cardCostIcon = document.createElement("i");
        addClass(cardCostIcon, "icon-cost");
        addClass(cardCostIcon, "is-small");
        addClass(cardCostIcon, "is-cost-" + card.cost);
        cardCostIcon.innerHTML = card.cost;
        cardCost.appendChild(cardCostIcon);

        const cardRarity = document.createElement("p");
        addClass(cardRarity, "el-card-list-rarity");
        const cardRarityIcon = document.createElement("i");
        addClass(cardRarityIcon, "icon-rarity");
        addClass(cardRarityIcon, "is-rarity-" + card.rarity);
        cardRarity.appendChild(cardRarityIcon);

        const cardName = document.createElement("p");
        addClass(cardName, "el-card-list-info-name");
        const cardNameSpan = document.createElement("span");
        addClass(cardNameSpan, "el-card-list-info-name-text");
        cardNameSpan.innerHTML = card.card_name;
        cardName.appendChild(cardNameSpan);

        const cardQty = document.createElement("p");
        addClass(cardQty, "el-card-list-info-count");
        cardQty.innerHTML = "x" + qty[card.card_id];

        const cardTooltip = document.createElement("p");
        addClass(cardTooltip, "el-card-list-link");

        const cardTooltipLink = document.createElement("a");
        addClass(cardTooltipLink, "el-icon-search");
        addClass(cardTooltipLink, "is-small");
        cardTooltipLink.href = "https://shadowverse-portal.com/card/" + card.card_id;
        cardTooltipLink.target = "_blank";
        cardTooltipLink.dataset.cardTribeName = card.tribe_name;
        cardTooltipLink.dataset.cardAtk = card.atk;
        cardTooltipLink.dataset.cardEvoAtk = card.evo_atk;
        cardTooltipLink.dataset.cardLife = card.life;
        cardTooltipLink.dataset.cardEvoLife = card.evo_life;
        cardTooltipLink.dataset.cardName = card.card_name;
        cardTooltipLink.dataset.cardSkillDisc = card.skill_disc;
        cardTooltipLink.dataset.cardEvoSkillDisc = card.evo_skill_disc;
        cardTooltipLink.dataset.cardCharType = card.char_type;
        cardTooltipLink.dataset.cardSrc = "https://shadowverse-portal.com/image/card/phase2/common/C/C_" + card.card_id + ".png";
        cardTooltipLink.dataset.cardNameSrc = "https://shadowverse-portal.com/image/card/phase2/en/N/N_" + card.card_id + ".png";
        
        const cardSearchIcon = document.createElement("i");
        addClass(cardSearchIcon, "icon-search");
        addClass(cardSearchIcon, "is-small");

        cardTooltipLink.appendChild(cardSearchIcon);
        cardTooltip.appendChild(cardTooltipLink);

        cardInfoDiv.appendChild(cardCost);
        cardInfoDiv.appendChild(cardRarity);
        cardInfoDiv.appendChild(cardName);
        cardInfoDiv.appendChild(cardQty);
        cardInfoDiv.appendChild(cardTooltip);

        li.appendChild(bgImg);
        li.appendChild(cardInfoDiv);
        ul.appendChild(li);
    });

    const craft = data.deck.clan;
    const craftBannerImg = document.createElement("img");
    craftBannerImg.src = "https://shadowverse-portal.com/public/assets/image/common/en/classes/" + craft + "/bg_list.png";

    const decklistDiv = document.getElementById("decklist");
    decklistDiv.replaceChildren(craftBannerImg, ul);

    setupTooltips();
}

function getDecklist() {
    const deckcode = document.getElementById("deckcode").value;

    fetch("./test.json")
    .then(response => response.json())
    .then(jsonData => processDecklist(jsonData.data));
}

document.addEventListener("DOMContentLoaded", function(event) {
    const el = document.getElementById("confirm");
    el.addEventListener("click", getDecklist, false);
})