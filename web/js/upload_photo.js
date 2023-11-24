"use strict";

import { photosAPI_auto } from "/js/api/_photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let currentPhoto = null;

function main() {
    if (photoId !== null) {
        loadPhotoData();
    }

    let photoForm = document.getElementById("form-photo-upload");
    photoForm.onsubmit = handlePhotoSubmit;

    let urlInput = document.getElementById("input-url");
    urlInput.onchange = handleURLchange;
}

function handleURLchange(event) {
    let url = event.target.value;
    let photoPreview = document.getElementById("photo-preview");
    photoPreview.src = url;
}

async function loadPhotoData() {
    // Editing a photo
    let pageTitle = document.getElementById("page-title");
    pageTitle.textContent = "Editing a photo";

    currentPhoto = await photosAPI_auto.getById(photoId);

    let urlInput = document.getElementById("input-url");
    let titleInput = document.getElementById("input-title");
    let descrInput = document.getElementById("input-description");
    let visibInput = document.getElementById("input-visibility");
    let userIdInput = document.getElementById("input-userId");
    let photoPreview = document.getElementById("photo-preview");

    urlInput.value = currentPhoto.url;
    titleInput.value = currentPhoto.title;
    descrInput.value = currentPhoto.description;
    visibInput.value = currentPhoto.visibility;
    userIdInput.value = currentPhoto.userId;
    photoPreview.src = currentPhoto.url;
}

async function handlePhotoSubmit(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);
    
    // Validar el formulario
    
    try {
        if (currentPhoto === null) {
            // Creating a new photo
            formData.append("userId", sessionManager.getLoggedId());
            let resp = await photosAPI_auto.create(formData);
            photoId = resp.lastId;
        } else {
            // Editing a photo
            formData.append("userId", currentPhoto.userId);
            await photosAPI_auto.update(formData, photoId);
        }

        window.location.href = "view_photo.html?photoId=" + photoId;
    } catch (err) {
        let errorMessage = err.response.data.message;
        messageRenderer.showErrorAsAlert(errorMessage);
    }
}

document.addEventListener("DOMContentLoaded", main);