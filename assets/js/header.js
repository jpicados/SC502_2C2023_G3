let userId;
var primerInicio=0;
// Función para realizar la operación de cierre de sesión
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
      // Almacena el userId para usarlo más tarde
      userId = data.userId;
      userTipo = data.userTipo; // Almacena el userTipo para usarlo más tarde
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

// Función para renderizar la barra de navegación
async function renderNavbar() {
  // Obtener datos de la sesión del usuario
  const userData = await checkUserSession();

  let userDisplay = "";
  if (userData) {
    userDisplay = `Perfil: ${userData.userName}`;
  }

  let navbarItems = [];

  if (userData.userTipo === 1) {
    navbarItems = [
      { name: "Inicio", link: "index.html" },
      { name: "Cerrar Sesion", link: "login.html", id: "logout-link" },
      { name: userDisplay, link: "#", id: "user-display", class: "user-data" },
    ];
  } else if (userData.userTipo === 2) {
    navbarItems = [
      { name: "Inicio", link: "index.html" },
      { name: "Activos", link: "Activos.html" },
      { name: "Administrar Activos", link: "ActivoForm.html" },
      { name: "Movimientos", link: "bitacora.html" },
      { name: "Empleados", link: "empleados.html" },
      { name: "Cerrar Sesion", link: "login.html", id: "logout-link" },
      { name: userDisplay, link: "#", id: "user-display", class: "user-data" },
    ];
  } else if (userData.userTipo === 3) {
    navbarItems = [
      { name: "Inicio", link: "index.html" },
      { name: "Activos", link: "Activos.html" },
      { name: "Administrar Activos", link: "ActivoForm.html" },
      { name: "Movimientos", link: "bitacora.html" },
      { name: "Empleados", link: "empleados.html" },
      { name: "Usuarios", link: "usuarios.html" },
      { name: "Cerrar Sesion", link: "login.html", id: "logout-link" },
      { name: userDisplay, link: "#", id: "user-display", class: "user-data" },
    ];
  }

  // Generar el HTML para la barra de navegación
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

  // Insertar el HTML de la barra de navegación en el elemento encabezado
  const header = document.querySelector("header");
  header.innerHTML += navbarHTML;

  // Agrega event listener para el logout
  const logoutLink = document.querySelector("#logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", function (event) {
      event.preventDefault();
      logoutUsuario();
    });
  }
}

// Llamar a la función para renderizar la barra de navegación
renderNavbar();
