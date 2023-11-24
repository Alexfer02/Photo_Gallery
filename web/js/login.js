"use strict";

import { authAPI } from "/js/api/auth.js";
import { sessionManager } from "/js/utils/session.js";
import { userValidator } from "/js/validators/users.js";
import { messageRenderer } from "/js/renderers/messages.js";

function main() {
    let loginForm = document.getElementById("form-login");
    loginForm.onsubmit = handleLoginSubmit;
}

async function handleLoginSubmit(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    let errorsDiv = document.getElementById("errors");
    errorsDiv.innerHTML = "";

    let errors = userValidator.validateLogin(formData);

    if (errors.length === 0) {
        // Send the form

        try {
            let response = await authAPI.login(formData);

            let token = response.sessionToken;
            let userData = response.user;

            sessionManager.login(token, userData);
            window.location.href = "index.html";
        } catch (err) {
            let errorMessage = err.response.data.message;
            messageRenderer.showErrorAsAlert(errorMessage);
        }

    } else {
        for (let err of errors) {
            messageRenderer.showErrorAsAlert(err);
        }
    }
}

document.addEventListener("DOMContentLoaded", main);