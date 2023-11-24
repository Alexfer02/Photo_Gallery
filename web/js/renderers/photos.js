"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";

const photosRenderer = {
    asCard: function (photo) {
        let html = `<div class="card">
                    <a href="view_photo.html?photoId=${photo.photoId}">
                        <div class="ratio ratio-1x1">
                            <img src="${photo.url}" class="card-img-top photo-image" alt="${photo.description}">
                        </div>
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${photo.title}</h5>
                        <p class="card-text">${photo.description}</p>
                    </div>
                </div>`;
        
        let card = parseHTML(html);
        return card;
    },

    asDetails: function (photo) {
        let html = `<div>
            <h2>${photo.title}</h2>
            <h4>${photo.description}</h4>

            <p>
                Uploaded by <a href="profile.html">
                    @${photo.username}
                    <img src="${photo.avatarUrl || 'images/avatar.png'}"
                        alt="Profile picture" class="profile-picture rounded-circle">
                </a> on ${photo.date}
            </p>

            <img src="${photo.url}" alt="${photo.description}" class="img-fluid">
        </div>`;
        let details = parseHTML(html);
        return details;
    }
};

export { photosRenderer };