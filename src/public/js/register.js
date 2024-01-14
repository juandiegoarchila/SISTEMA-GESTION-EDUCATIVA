// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {

    // Mensajes de error predefinidos
    const emailErrorMessage = "El correo no es válido.";
    const passwordErrorMessage = "La contraseña debe tener al menos 8 caracteres.";
    const nameErrorMessage = "El nombre de usuario debe tener al menos 8 caracteres.";

    // Función para manejar la animación entre formularios y mostrar mensajes de error
    async function animateForms(hideForm, showForm, errorMessage = "") {
        const errorContainer = document.querySelector('.flash-container');
        errorContainer.style.display = 'none';

        hideForm.classList.add("hide");
        showForm.classList.remove("hide");

        const errorMessageElement = document.querySelector('.flash-message');
        errorMessageElement.textContent = errorMessage;
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

    // Event listeners para cambiar entre formularios
    btnSignIn.addEventListener('click', () => animateForms(formLogin, formRegister, nameErrorMessage));
    btnSignUp.addEventListener('click', () => animateForms(formRegister, formLogin, emailErrorMessage));

    // Event listener para validar campos antes de enviar el formulario
    const nameInput = document.getElementById("name");
    const nameError = document.getElementById("name-error");

    nameInput.addEventListener("input", function () {
        nameError.textContent = nameInput.value.length < 8 ? "El nombre de usuario debe tener al menos 8 caracteres." : "";
    });

    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");

    emailInput.addEventListener("input", function () {
        emailError.textContent = checkEmailValidity(emailInput) ? "" : `${emailErrorMessage}`;
    });

    const password = document.getElementById("password");
    const passwordError = document.getElementById("password-error");

    password.addEventListener("input", function () {
        passwordError.textContent = checkPasswordLength(password) ? "" : `${passwordErrorMessage}`;
    });


    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        if (!checkRequiredRegister()) {
            await animateForms(formRegister, formLogin);
            registerForm.submit();
        }
    });


    // Función para verificar la validez del correo electrónico
    function checkEmailValidity(input) {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(input.value);
    }

    // Función para verificar la longitud de la contraseña
    function checkPasswordLength(input) {
        const length = input.value.length;
        return length >= 8 && length <= 20;
    }

    // Función para verificar campos requeridos en el formulario de registro
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

    // Función para mostrar mensajes de error de longitud
    function showLengthError(input, min, max, fieldName) {
        const errorMessage = `${fieldName === 'name' ? nameErrorMessage : ''} 
                             ${fieldName === 'email' ? emailErrorMessage : ''} 
                             ${fieldName === 'password' ? passwordErrorMessage : ''}`;
        document.getElementById(`${input.id}-error`).textContent = errorMessage.trim(); 
    }

    // Función para borrar mensajes de error de longitud
    function clearLengthError(input) {
        document.getElementById(`${input.id}-error`).textContent = "";
    }

});
