"use strict";

import { galleryRenderer } from "/js/renderers/gallery.js";
import { photosAPI_auto } from "/js/api/_photos.js";

function main() { 
    loadGallery();
}

async function loadGallery() {
    let photos = await photosAPI_auto.getAll();
    let gallery = galleryRenderer.asCardGallery(photos, 4);
    let galleryContainer = document.querySelector("#card-gallery");
    galleryContainer.append(gallery);

    loadEventHandlers();
}

function loadEventHandlers() {
    let cardsList = document.querySelectorAll(".card");

    for (let card of cardsList) {
        card.onmouseenter = mouseEnterHandler;
        card.onmouseleave = mouseLeaveHandler;
    }
}

function mouseEnterHandler(event) {
    let card = event.target;
    card.classList.add("card-hover");
}

function mouseLeaveHandler(event) {
    let card = event.target;
    card.classList.remove("card-hover");
}



document.addEventListener("DOMContentLoaded", main);
