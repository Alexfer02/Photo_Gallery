"use strict";

import { photosAPI_auto } from "/js/api/_photos.js";
import { photosRenderer } from "/js/renderers/photos.js";
import { commentsRenderer } from "/js/renderers/comments.js";
import { photoswithusersAPI } from "/js/api/photoswithusers.js";
import { commentswithusersAPI } from "/js/api/commentswithusers.js";

let urlParams = new URLSearchParams(window.location.search);
const photoId = urlParams.get("photoId");

function main() {
    loadPhoto();
    loadComments();

    let btnEdit = document.getElementById("button-edit");
    let btnDelete = document.getElementById("button-delete");

    btnEdit.onclick = handleEditPhoto;
    btnDelete.onclick = handleDeletePhoto;
}

async function handleDeletePhoto(event) {
    if (confirm("Do you really want to delete this picture?")) {
        await photosAPI_auto.delete(photoId);
        window.location.href = "index.html";
    }
} 

function handleEditPhoto(event) {
    window.location.href = "upload_photo.html?photoId=" + photoId;
}

async function loadComments() {
    let comments = await commentswithusersAPI.getByPhotoId(photoId);
    let commentsCol = document.getElementById("comments-column");

    if (comments.length > 0) {
        // Hay comentarios que mostrar
        let commentsToasts = commentsRenderer.asToastList(comments);
        commentsCol.append(commentsToasts);

        let toasts = document.querySelectorAll(".toast");
        for (let htmlToast of toasts) {
            let toastBootstrap = bootstrap.Toast.getOrCreateInstance(htmlToast);
            toastBootstrap.show();
        }
    } else {
        // No hay comentarios

        // Opcion 1
        //commentsCol.textContent = "No comments yet... 😅";

        // Opcion 2
        commentsCol.remove();
    }    
}

async function loadPhoto() {
    let photo = await photoswithusersAPI.getByPhotoId(photoId);
    let details = photosRenderer.asDetails(photo);
    let detailsCol = document.getElementById("details-column");
    detailsCol.append(details);
}

document.addEventListener("DOMContentLoaded", main);