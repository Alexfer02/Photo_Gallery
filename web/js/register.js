"use strict";

import { authAPI } from "/js/api/auth.js";
import { sessionManager } from "/js/utils/session.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { userValidator } from "/js/validators/users.js";

function main() {
    let registerForm = document.getElementById("register-form");
    registerForm.onsubmit = handleSubmitRegister;
}

async function handleSubmitRegister(event) {
    let form = event.target;
    let formData = new FormData(form);
    event.preventDefault();

    let errors = userValidator.validateRegister(formData);
    let errorsDiv = document.getElementById("errors");
    errorsDiv.innerHTML = "";
    
    if (errors.length === 0) {
        // No hay errores, hay que enviar el formulario
        let response = await authAPI.register(formData);
        let token = response.sessionToken;
        let userData = response.user;

        sessionManager.login(token, userData);
        window.location.href = "index.html";
    } else {
        // Mostrar los errores de validación
        for (let err of errors) {
            messageRenderer.showErrorAsAlert(err);
        }
    }
}

document.addEventListener("DOMContentLoaded", main);
