const $btnSignIn = document.querySelector(".sign-in-btn"),
  $btnSignUp = document.querySelector(".sign-up-btn"),
  $signUp = document.querySelector(".sign-up"),
  $signIn = document.querySelector(".sign-in");

document.addEventListener("click", (e) => {
  if (e.target === $btnSignIn || e.target === $btnSignUp) {
    $signIn.classList.toggle("active");
    $signUp.classList.toggle("active");
  }
});

async function registrarUsuario() {
  let nombre = document.getElementById("nombreInput").value; // Make sure to add the right ID to the input in HTML
  let correo = document.getElementById("correoInput").value; // Same here
  let contrasenna = document.getElementById("contrasennaInput").value; // And here

  // Perform some basic validation
  if (!nombre || !correo || !contrasenna) {
    alert("Please fill in all the fields.");
    return;
  }

  // Send the data to the server
  try {
    const response = await fetch(
      "../controllers/usuarioController.php?action=registrar_usuario",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          NombreUsuario: nombre,
          CorreoUsuario: correo,
          Contrasenna: contrasenna,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Usuario Registrado");

      // Toggle to the sign-in view
      $signUp.classList.toggle("active");
      $signIn.classList.toggle("active");
    } else {
      alert("Error registering user: " + data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while registering the user.");
  }
}

async function loginUsuario() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = {
    CorreoUsuario: email,
    Contrasenna: password,
  };

  try {
    const respuesta = await fetch(
      "../controllers/loginController.php?action=login_usuario",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (respuesta.ok) {
      const response = await respuesta.json();
      if (response.message === "Login correcto") {
        // si da correcto se redirecciona a index.html
        window.location.href = "index.html";
      } else {
        Swal.fire({
          ...swalConfig,
          icon: "error",
          title: "Error",
          text: "Invalid credentials. Please try again.",
        });
      }
    } else {
      throw new Error("Error in login request");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

document.getElementById("signInButton").addEventListener("click", loginUsuario);
document
  .getElementById("botonRegistro")
  .addEventListener("click", registrarUsuario);
