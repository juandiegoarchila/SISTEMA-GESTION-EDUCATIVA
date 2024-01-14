// Función para manejar la animación entre formularios
async function animateForms(hideForm, showForm) {
    // Oculta el formulario actual
    hideForm.classList.add("hide");
    // Muestra el formulario deseado
    showForm.classList.remove("hide");
    // Espera 1 segundo antes de continuar
    await new Promise(resolve => setTimeout(resolve, 1000));
}

// Evento que se ejecuta cuando el DOM ha sido completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Obtener elementos del DOM para los formularios y botones
    const formRegister = document.querySelector(".register");
    const formLogin = document.querySelector(".login");
    const btnSignIn = document.getElementById("sign-in");
    const btnSignUp = document.getElementById("sign-up");

    // Event listeners para cambiar entre formularios al hacer clic en los botones correspondientes
    btnSignIn.addEventListener("click", function () {
        animateForms(formLogin, formRegister);
    });

    btnSignUp.addEventListener("click", function () {
        animateForms(formRegister, formLogin);
    });

    // Obtener elementos del DOM para la validación de campos del formulario de registro
    const nameInput = document.getElementById("name");
    const nameError = document.getElementById("name-error");
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    const password = document.getElementById("password");
    const passwordError = document.getElementById("password-error");

    // Event listeners para validar campos mientras se escribe
    nameInput.addEventListener("input", function () {
        nameError.textContent = nameInput.value.length < 8 ? "El nombre de usuario debe tener al menos 8 caracteres." : "";
    });

    emailInput.addEventListener("input", function () {
        emailError.textContent = checkEmailValidity(emailInput) ? "" : "El correo no es válido.";
    });

    password.addEventListener("input", function () {
        passwordError.textContent = checkPasswordLength(password) ? "" : "La contraseña debe tener al menos 8 caracteres y menos de 20 caracteres.";
    });

    // Funciones de validación de campos
    function checkEmailValidity(input) {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(input.value);
    }

    function checkPasswordLength(input) {
        const length = input.value.length;
        return length >= 8 && length <= 20;
    }

    // Funciones para mostrar y limpiar mensajes de error y éxito
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

    // Obtener el formulario de registro y el formulario de inicio de sesión
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.querySelector(".login form");

    // Event listeners adicionales para la validación de campos del formulario de registro
    registerForm.querySelector('#email').addEventListener("input", function () {
        emailError.textContent = checkEmailValidity(this) ? "" : "El correo no es válido.";
    });

    registerForm.querySelector('#name').addEventListener("input", function () {
        checkLength(this, 8, 20, 'Nombre de usuario');
    });

    registerForm.querySelector('#password').addEventListener("input", function () {
        passwordError.textContent = checkPasswordLength(this) ? "" : "La contraseña debe tener al menos 8 caracteres.";
    });

    // Función para verificar si hay campos requeridos vacíos en el formulario de registro
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

    // Event listener para el envío del formulario de registro
    registerForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        // Verifica si hay campos requeridos vacíos antes de animar al formulario de inicio de sesión y enviar el formulario de registro
        if (!checkRequiredRegister()) {
            await animateForms(formRegister, formLogin);
            registerForm.submit();
        }
    });

    // Event listener para el envío del formulario de inicio de sesión
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        // Animar al formulario de registro antes de enviar el formulario de inicio de sesión
        await animateForms(formLogin, formRegister);
        loginForm.submit();
    });
});
