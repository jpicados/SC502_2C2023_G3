let userId;

// Function to perform the logout operation
async function logoutUsuario() {
  try {
    const respuesta = await fetch(
      "../controllers/loginController.php?action=logout_usuario",
      {
        method: "POST",
      }
    );

    if (respuesta.ok) {
      const response = await respuesta.json();
      if (response.message === "Logout correcto") {
        window.location.href = "Login.html";
      }
    } else {
      throw new Error("Error in logout request");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function checkUserSession() {
  try {
    const response = await fetch(
      "../controllers/loginController.php?action=get_session_data"
    );
    const data = await response.json();

    if (data.isLoggedIn) {
      // Store the userId for later use
      userId = data.userId;
      userTipo = data.userTipo; // Store the userTipo for later use
      return data;
    } else {
      window.location.replace("login.html");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

// Function to render the navigation bar
async function renderNavbar() {
  // Get user session data
  const userData = await checkUserSession();

  let userDisplay = "";
  if (userData) {
    userDisplay = `Perfil: ${userData.userName}`;
  }

  const navbarItems = [
    { name: "Inicio", link: "index.html" },
    { name: "Activos", link: "Activos.html" },
    { name: "Administrar Activos", link: "ActivoForm.html" },
    { name: "Movimientos", link: "bitacora.html" },
    { name: "Empleados", link: "empleados.html" },
    // Solo se muestra si el tipo de usuario es 2
    ...(userData.userTipo == 2
      ? [{ name: "Usuarios", link: "usuarios.html" }]
      : []),
    { name: "Cerrar Sesion", link: "login.html", id: "logout-link" },
    { name: userDisplay, link: "#", id: "user-display", class: "user-data" },
  ];

  // Generate the HTML for the navbar
  const navbarHTML = `
      <nav class="navigation">
          <ul>
              ${navbarItems
                .map(
                  (item) =>
                    `<li><a href="${item.link}" ${
                      item.id ? 'id="' + item.id + '"' : ""
                    }>${item.name}</a></li>`
                )
                .join("")}
          </ul>
      </nav>
  `;

  // Insert the navbar HTML into the header element
  const header = document.querySelector("header");
  header.innerHTML += navbarHTML;

  // Add event listener for logout
  const logoutLink = document.querySelector("#logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", function (event) {
      event.preventDefault();
      logoutUsuario();
    });
  }
}

// Call the function to render the navbar
renderNavbar();
