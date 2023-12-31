// Función para enviar datos y realizar la animación
async function sendDataAndAnimate(hideForm, showForm, form) {
  // Realiza la animación o transición aquí (puedes agregar clases CSS dinámicamente)
  hideForm.classList.add("hide");
  showForm.classList.remove("hide");

  // Simula un retraso (puedes ajustar el tiempo según tus necesidades)
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Envía el formulario después de la animación
  form.submit();
}

document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.getElementById("registerForm");
  const formRegister = document.querySelector(".register");
  const formLogin = document.querySelector(".login");

  // Agrega este bloque de código para manejar el envío del formulario de registro
  registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      try {
          // Envía el formulario y maneja la respuesta del servidor
          await sendDataAndAnimate(formRegister, formLogin, registerForm);
      } catch (error) {
          console.error('Error al enviar datos:', error);
          // Maneja el error aquí (puedes mostrar un mensaje de error al usuario)
      }
  });

  // Agrega este evento al formulario de inicio de sesión
  const loginForm = document.querySelector(".login form");
  loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      try {
          // Envía el formulario y maneja la respuesta del servidor
          await sendDataAndAnimate(formLogin, formRegister, loginForm);
      } catch (error) {
          console.error('Error al enviar datos:', error);
          // Maneja el error aquí (puedes mostrar un mensaje de error al usuario)
      }
  });

  // Agrega este bloque de código para la animación al hacer clic en los botones
  const btnSignIn = document.getElementById("sign-in");
  const btnSignUp = document.getElementById("sign-up");

  btnSignIn.addEventListener("click", function () {
      // Oculta el formulario de registro y muestra el formulario de inicio de sesión con una animación
      formLogin.classList.add("hide");
      formRegister.classList.remove("hide");
  });

  btnSignUp.addEventListener("click", function () {
      // Oculta el formulario de inicio de sesión y muestra el formulario de registro con una animación
      formRegister.classList.add("hide");
      formLogin.classList.remove("hide");
  });
});
