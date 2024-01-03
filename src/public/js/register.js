document.addEventListener('DOMContentLoaded', function () {

    // Mensajes para email, password y name
    const emailErrorMessage = "El correo electrónico no es válido.";
    const passwordErrorMessage = "La contraseña debe tener al menos 8 caracteres.";
    const nameErrorMessage = "El nombre debe tener entre 8 y 20 caracteres.";

    // Funciones de validación
    function checkLength(input, minLength, maxLength, fieldName) {
        const errorMessage = input.value.length < minLength || input.value.length > maxLength
            ? `* ${fieldName} debe tener entre ${minLength} y ${maxLength} caracteres.` : "";
        document.getElementById(`${input.id}-error`).textContent = errorMessage;
    }

    function checkPasswordLength(input) {
        return input.value.length >= 8;
    }

    function checkEmailValidity(input) {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(input.value);
    }

    // Función para manejar la animación entre formularios y mostrar mensajes de error
    async function animateForms(hideForm, showForm, errorMessage = "") {
        const errorContainer = document.querySelector('.flash-container');
        errorContainer.style.display = 'none';

        hideForm.classList.add("hide");
        showForm.classList.remove("hide");

        const errorMessageElement = document.querySelector('.flash-message');
        errorMessageElement.innerHTML = errorMessage;
        errorContainer.style.display = 'block';

        await new Promise(resolve => setTimeout(resolve, 1000));

        errorContainer.style.animation = 'slideUp 0.5s ease-in-out';
        setTimeout(() => {
            errorContainer.style.display = 'none';
            errorContainer.style.animation = '';
        }, 500);
    }

    // Obtener elementos del DOM
    const formRegister = document.querySelector('.register');
    const formLogin = document.querySelector('.login');

    const btnSignUp = document.getElementById('sign-in');
    const btnSignIn = document.getElementById('sign-up');

    btnSignIn.addEventListener('click', function () {
        animateForms(formLogin, formRegister, '* Mensaje de error para iniciar sesión');
    });

    btnSignUp.addEventListener('click', function () {
        animateForms(formRegister, formLogin, '* Mensaje de error para registrarse');
    });

    const registerForm = document.getElementById("registerForm");
    const loginForm = document.querySelector(".login form");

    const emailInput = registerForm.querySelector('#email');
    const emailError = document.getElementById("email-error");

    emailInput.addEventListener("input", function () {
        const errorMessage = checkEmailValidity(this) ? "" : emailErrorMessage;
        emailError.textContent = errorMessage;
    });

    const nameInput = registerForm.querySelector('#name');
    const nameError = document.getElementById("name-error");

    nameInput.addEventListener("input", function () {
        checkLength(this, 8, 20, 'Nombre de usuario');
        // Puedes agregar mensajes de error específicos aquí si es necesario
    });

    const passwordInput = registerForm.querySelector('#password');
    const passwordError = document.getElementById("password-error");

    passwordInput.addEventListener("input", function () {
        const errorMessage = checkPasswordLength(this) ? "" : passwordErrorMessage;
        passwordError.textContent = errorMessage;
    });

    // Resto del código para la validación de formularios...

    // Resto del código para mostrar mensajes de error en tiempo real...

    // Resto del código para la animación de mensajes de error...

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

    function showLengthError(input, minLength, maxLength, fieldName) {
        const errorMessage = `${fieldName === 'name' ? nameErrorMessage : ''} 
                             ${fieldName === 'email' ? emailErrorMessage : ''} 
                             ${fieldName === 'password' ? passwordErrorMessage : ''}`;
        document.getElementById(`${input.id}-error`).textContent = errorMessage;
    }

    function clearLengthError(input) {
        document.getElementById(`${input.id}-error`).textContent = "";
    }

});
