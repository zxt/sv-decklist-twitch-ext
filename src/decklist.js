import {addClass} from "./utils.js";
import {setupTooltips} from "./tooltips.js";
import {getConfig} from "./ttv_config.js";

function processDecklist(data, includeTooltips=true) {
    if(!data) return;

    const cards = data.deck.cards;
    let qty = {};
    cards.forEach(card => qty[card.card_id] = (qty[card.card_id] | 0) + 1);

    let seen = new Set();
    const uniqueCards = cards.filter(card => {
        let k = card.card_id;
        return seen.has(k) ? false : seen.add(k);
    });

    let lang = getConfig("lang", "en");
    addClass(document.body, lang);

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
        cardNameSpan.title = card.card_name;
        cardName.appendChild(cardNameSpan);

        const cardQty = document.createElement("p");
        addClass(cardQty, "el-card-list-info-count");
        cardQty.innerHTML = "x" + qty[card.card_id];

        cardInfoDiv.appendChild(cardCost);
        cardInfoDiv.appendChild(cardRarity);
        cardInfoDiv.appendChild(cardName);
        cardInfoDiv.appendChild(cardQty);

        const cardTooltip = document.createElement("p");
        addClass(cardTooltip, "el-card-list-link");

        const cardTooltipLink = document.createElement("a");
        addClass(cardTooltipLink, "el-icon-search");
        addClass(cardTooltipLink, "is-small");
        cardTooltipLink.href = "https://shadowverse-portal.com/card/" + card.card_id + "?lang=" + lang;
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
        cardTooltipLink.dataset.cardNameSrc = "https://shadowverse-portal.com/image/card/phase2/" + lang + "/N/N_" + card.card_id + ".png";
        
        const cardSearchIcon = document.createElement("i");
        addClass(cardSearchIcon, "icon-search");
        addClass(cardSearchIcon, "is-small");

        cardTooltipLink.appendChild(cardSearchIcon);
        cardTooltip.appendChild(cardTooltipLink);

        cardInfoDiv.appendChild(cardTooltip);

        li.appendChild(bgImg);
        li.appendChild(cardInfoDiv);
        ul.appendChild(li);
    });

    const craft = data.deck.clan;
    const craftBannerImg = document.createElement("img");
    craftBannerImg.src = "https://shadowverse-portal.com/public/assets/image/common/" + lang + "/classes/" + craft + "/bg_list.png";

    const decklistDiv = document.getElementById("decklist");

    const svPortalLink = document.createElement("a");
    svPortalLink.classList.add("svPortalLink");
    svPortalLink.href = "https://shadowverse-portal.com/deck/" + decklistDiv.dataset.hash + "?lang=" + lang;
    svPortalLink.target = "_blank";
    svPortalLink.text = "See this deck in SV-Portal";
    const svPortalLink2 = svPortalLink.cloneNode(true);

    decklistDiv.replaceChildren(svPortalLink, craftBannerImg, ul, svPortalLink2);

    if(includeTooltips) {
        setupTooltips();

        // adjust the height of the page so it can fully display the decklist without getting cut off
        // the 400px addition is to account for the tooltips
        document.body.style.height = decklistDiv.clientHeight + 400 + 'px';
    }
}

function clearDecklist() {
    const decklistDiv = document.getElementById("decklist");
    decklistDiv.replaceChildren();
}

export {processDecklist, clearDecklist};