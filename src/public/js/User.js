// Función para manejar la animación entre formularios
async function animateForms(hideForm, showForm) {
    hideForm.classList.add("hide");
    showForm.classList.remove("hide");
    await new Promise(resolve => setTimeout(resolve, 1000));
}

document.addEventListener('DOMContentLoaded', function () {
    const formRegister = document.querySelector(".register");
    const formLogin = document.querySelector(".login");

    const btnSignIn = document.getElementById("sign-in");
    const btnSignUp = document.getElementById("sign-up");

    btnSignIn.addEventListener("click", function () {
        animateForms(formLogin, formRegister);
    });

    btnSignUp.addEventListener("click", function () {
        animateForms(formRegister, formLogin);
    });

    const nameInput = document.getElementById("name");
    const nameError = document.getElementById("name-error");

    nameInput.addEventListener("input", function () {
        nameError.textContent = nameInput.value.length < 8 ? "*El nombre de usuario debe tener al menos 8 caracteres." : "";
    });

    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");

    emailInput.addEventListener("input", function () {
        emailError.textContent = checkEmailValidity(emailInput) ? "" : "*El correo no es válido.";
    });

    const password = document.getElementById("password");
    const passwordError = document.getElementById("password-error");

    password.addEventListener("input", function () {
        passwordError.textContent = checkPasswordLength(password) ? "" : "*La contraseña debe tener al menos 8 caracteres y menos de 20 caracteres.";
    });

    function checkEmailValidity(input) {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(input.value);
    }

    function checkPasswordLength(input) {
        const length = input.value.length;
        return length >= 8 && length <= 20;
    }

    function showLengthError(input, min, max, fieldName) {
        const formControl = input.parentElement;
        formControl.classList.add("error");
        const small = formControl.querySelector('small');
        small.innerText = `*${fieldName} debe tener entre ${min} y ${max} caracteres.`;
    }

    function clearLengthError(input) {
        const formControl = input.parentElement;
        formControl.classList.remove("error");
        const small = formControl.querySelector('small');
        small.innerText = '';
    }

    function showSuccess(input) {
        const formControl = input.parentElement;
        formControl.classList.add("success");
        const small = formControl.querySelector('small');
        small.innerText = '';
    }

    function checkLength(input, min, max, fieldName) {
        const inputValue = input.value.trim();
        if (inputValue.length < min || inputValue.length > max) {
            showLengthError(input, min, max, fieldName);
            return false;
        } else {
            clearLengthError(input);
            showSuccess(input);
            return true;
        }
    }

    const registerForm = document.getElementById("registerForm");
    const loginForm = document.querySelector(".login form");

    registerForm.querySelector('#email').addEventListener("input", function () {
        emailError.textContent = checkEmailValidity(this) ? "" : "El correo no es válido.";
    });

    registerForm.querySelector('#name').addEventListener("input", function () {
        checkLength(this, 8, 20, 'Nombre de usuario');
    });

    registerForm.querySelector('#password').addEventListener("input", function () {
        passwordError.textContent = checkPasswordLength(this) ? "" : "La contraseña debe tener al menos 8 caracteres.        ";
    });

    function checkRequiredRegister() {
        let isRequired = false;

        ['name', 'email', 'password', 'cedula'].forEach(fieldName => {
            const input = registerForm.querySelector(`#${fieldName}`);
            if (input.value.trim() === '') {
                showLengthError(input, 8, 20, fieldName);
                isRequired = true;
            } else {
                clearLengthError(input);
            }
        });

        return isRequired;
    }

    registerForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        if (!checkRequiredRegister()) {
            await animateForms(formRegister, formLogin);
            registerForm.submit();
        }
    });

    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        await animateForms(formLogin, formRegister);
        loginForm.submit();
    });
});




