"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";

const commentsRenderer = {

    asToast: function (comment) {
        let html = `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
                        <div class="toast-header">
                            <strong class="me-auto">
                                <a href="profile.html?userId=${comment.userId}">
                                    @${comment.username}
                                    <img src="${comment.avatarUrl}"
                                        alt="Profile picture" class="profile-picture rounded-circle">
                                </a>
                            </strong>
                            <small>${comment.date}</small>
                        </div>
                        <div class="toast-body">
                            ${comment.text}
                        </div>
                    </div>`;
        let toast = parseHTML(html);
        return toast;
    },

    asToastList: function (commentsList) {
        let html = `<div class="toast-container sticky-top"></div>`;
        let toastContainer = parseHTML(html);

        for (let comment of commentsList) {
            let toast = this.asToast(comment);
            toastContainer.append(toast);
        }

        return toastContainer;
    }
};

export { commentsRenderer };