"use strict";

import { sessionManager } from "/js/utils/session.js";

function main() {
    showLoggedUsername();
    addLogoutHandler();
    hideElements();
}

function hideElements() {
    let loginLink = document.getElementById("header-login");
    let registerLink = document.getElementById("header-register");
    let uploadLink = document.getElementById("header-upload");
    let logoutLink = document.getElementById("header-logout");

    if (sessionManager.isLogged()) {
        loginLink.style.display = "none";
        registerLink.style.display = "none";
    } else {
        uploadLink.style.display = "none";
        logoutLink.style.display = "none";
    }
}

function addLogoutHandler() {
    let logoutLink = document.getElementById("header-logout");
    logoutLink.onclick = function () {
        sessionManager.logout();
        window.location.href = "index.html";
    };
}

function showLoggedUsername() {
    let headerElement = document.getElementById("header-username");
    let text = "Guest";

    if (sessionManager.isLogged()) {
        let userData = sessionManager.getLoggedUser();
        let username = userData.username;
        text = "Hi, @" + username;
    }

    headerElement.textContent = text;    
}

document.addEventListener("DOMContentLoaded", main);