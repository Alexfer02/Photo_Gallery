"use strict";

const userValidator = {

    validateLogin: function (formData) {
        let errors = [];

        let username = formData.get("username");
        let password = formData.get("password");

        if (username.length <= 1) {
            errors.push("The username must have more than 1 character");
        }

        if (password.length <= 1) {
            errors.push("The password must have more than 1 character");
        }

        return errors;
    },

    validateRegister: function (formData) {
        let errors = [];

        // Inputs del usuario
        let firstName = formData.get("firstName");
        let lastName = formData.get("lastName");
        let username = formData.get("username");
        let password = formData.get("password");
        let password2 = formData.get("password2");

        if (firstName.length <= 1) {
            errors.push("The first name must have more than 1 character");
        }

        if (lastName.length <= 1) {
            errors.push("The last name must have more than 1 character");
        }

        if (username.length < 3) {
            errors.push("The username must be at least 3 characters");
        }

        if (password !== password2) {
            errors.push("The passwords must match");
        }

        if (password.toLowerCase().includes(username.toLowerCase())) {
            errors.push("The password cannot contain the username");
        }

        return errors;
    },

};

export { userValidator };