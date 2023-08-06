// Standard Swal configuration
const swalConfig = {
  confirmButtonColor: "rgb(16, 77, 148)",
  cancelButtonColor: "rgb(209, 68, 68)",
  focusConfirm: false,
};

// Se crea una funcion boton que nos genera los botones de la tabla usuario para editar como para eliminar
function Boton(iconoValor, botonValor, id) {
  // Cada boton se conforma por td que es el campo donde va, por button que es el boton y la etiqueta i que es el icono que llevan
  var tdBot = document.createElement("td");
  var modificar = document.createElement("button");
  var iconoMod = document.createElement("i");
  // Se añaden atributos básicos a los botones
  iconoMod.setAttribute("class", iconoValor);
  modificar.setAttribute("class", botonValor);
  modificar.setAttribute("id", id);
  modificar.setAttribute("button", "button");
  modificar.append(iconoMod);
  tdBot.append(modificar);
  return tdBot;
}

function item(tabla, usuario) {
  // Se crean los elementos básicos de lo que lleva cada item, también se le pasa un usuario
  var tr = document.createElement("tr");
  tr.setAttribute("class", "trs");
  var tdId = document.createElement("td");
  tdId.setAttribute("name", "id");
  var tdNombre = document.createElement("td");
  var tdCorreo = document.createElement("td");
  var tdTipo = document.createElement("td");

  tdTipo.setAttribute("class", "Tipo");

  // Se crean los botones que van dentro de la tabla
  btnModificar = Boton(
    "fa-solid fa-user-pen button_icon",
    "button_edit",
    `${usuario.IdUsuario}`
  );
  btnEliminar = Boton(
    "fa-solid fa-user-minus button_icon",
    "button_delete",
    `${usuario.IdUsuario}`
  );
  tdId.textContent = `${usuario.IdUsuario}`;
  tr.setAttribute("id", `${usuario.IdUsuario}`);
  tdNombre.textContent = `${usuario.NombreUsuario}`;
  tdCorreo.textContent = `${usuario.CorreoUsuario}`;
  tdTipo.textContent = `${usuario.Tipo}`;
  tabla
    .appendChild(tr)
    .append(tdId, tdNombre, tdCorreo, tdTipo, btnModificar, btnEliminar);
  return tabla;
}

function getTabla() {
  fetch("../controllers/usuarioController.php?action=get_usuarios")
    .then((response) => response.json())
    .then((result) => {
      if (!result.success) {
        console.error("API returned an unsuccessful response:", result);
        return;
      }

      var tabla = document.getElementById("usuarios");
      result.data.forEach((usuario) => {
        item(tabla, usuario);
      });

      obtener(".button_delete");
      obtener(".button_edit");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function obtener(selector) {
  document.querySelectorAll(selector).forEach((btn) => {
    btn.addEventListener("click", function () {
      const userId = this.getAttribute("id");

      // Check if it's the delete button that was clicked
      if (selector === ".button_delete") {
        const confirmation = confirm(
          "Are you sure you want to delete this user?"
        );

        if (confirmation) {
          deleteUser(userId);
        }
      }
      // Check if it's the edit button that was clicked
      else if (selector === ".button_edit") {
        const newTipo = prompt("Please enter the new Tipo value:");

        // Basic validation, assuming Tipo is a number
        if (newTipo && !isNaN(newTipo)) {
          // Make the AJAX request to update the Tipo value
          updateTipo(userId, newTipo);
        } else {
          alert("Please enter a valid Tipo value.");
        }
      }
    });
  });
}

function updateTipo(userId, newTipo) {
  fetch("../controllers/usuarioController.php?action=editarUsuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Id: userId, Tipo: newTipo }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Update the user Tipo value in the UI/table
        const userRow = document.getElementById(userId);
        const tipoCell = userRow.querySelector(".Tipo");
        tipoCell.textContent = newTipo;

        alert("User Tipo updated successfully!");
      } else {
        alert("Error updating user Tipo: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error updating user Tipo:", error);
      alert("An error occurred. Please try again.");
    });
}

function deleteUser(userId) {
  fetch("../controllers/usuarioController.php?action=eliminar_usuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ IdUsuario: userId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Remove the user row from the UI/table
        const userRow = document.getElementById(userId);
        userRow.remove();

        alert("User deleted successfully!");
      } else {
        alert("Error deleting user: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
      alert("An error occurred. Please try again.");
    });
}

getTabla();
