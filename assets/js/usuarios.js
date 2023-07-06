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

  tdNombre.setAttribute("class", "usuario"); // Colocamos los atributos usuario para obtener su valor en el edit
  tdCorreo.setAttribute("class", "usuario");

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
  tabla
    .appendChild(tr)
    .append(tdId, tdNombre, tdCorreo, btnModificar, btnEliminar);
  return tabla;
}

function getTabla() {
  fetch("../controllers/usuarioController.php?action=get_usuarios")
    .then((datos) => datos.json())
    .then((usuarios) => {
      var tabla = document.getElementById("usuarios");
      usuarios.forEach((usuario) => {
        tablausuarios = item(tabla, usuario);
      });
      obtener(".button_delete");
      obtener(".button_edit");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function enviarDatos(Nombre, Correo) {
  const formElement = document.createElement("form");
  const NombreUsario = document.createElement("input");
  const CorreoUsario = document.createElement("input");
  NombreUsario.name = "NombreUsario";
  NombreUsario.value = Nombre;
  CorreoUsario.name = "CorreoUsario";
  CorreoUsario.value = Correo;
  formElement.appendChild(Nombre);
  formElement.appendChild(Correo);
  const datos = new FormData(formElement);
  try {
    var respuesta = await fetch(
      "../controllers/usuarioController.php?action=solicitud_usuarios",
      {
        method: "POST",
        body: datos,
      }
    );
    var usuarios = await respuesta.json();
    var tabla = document.getElementById("usuarios");
    respuestaUsuario = usuarios[usuarios.length - 1];
    item(tabla, respuestaUsuario);
    obtener(".button_delete");
    obtener(".button_edit");
  } catch (error) {
    console.error("Error:", error);
  }
}

const enviarUsuario = document.getElementById("botonRegistro");
enviarUsuario.addEventListener("click", registroUsuario);

function registroUsuario() {
  Swal.fire({
    ...swalConfig, // Spread the Swal configuration
    title: "Registrar usuario",
    html: `<label for="NombreUsuario"></label><input type="text" id="NombreUsuario" name="NombreUsuario" class="swal2-input" placeholder="Nombre">
    <label for="CorreoUsuario"></label><input type="email" id="CorreoUsuario" name="CorreoUsuario" class="swal2-input" placeholder="Correo">`,
    confirmButtonText: "Registrar",
  }).then((result) => {
    if (result.isConfirmed) {
      const nombre = Swal.getPopup().querySelector("#NombreUsuario").value;
      const correo = Swal.getPopup().querySelector("#CorreoUsuario").value;
      if (nombre && correo) {
        enviarDatos(nombre, correo);
        Swal.fire({
          ...swalConfig,
          icon: "success",
          title: `${nombre} registrado con éxito.`,
        });
      } else {
        Swal.fire({
          ...swalConfig,
          icon: "error",
          title: "Error",
          text: "Por favor, complete todos los campos.",
        });
      }
    }
  });
}

function eliminarUsuario(id) {
  const Toast = Swal.mixin({
    ...swalConfig, // Spread the Swal configuration
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      eliminarId(id);
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  Toast.fire({
    icon: "info",
    title: "Usuario Eliminado",
  });
}

async function editarId(id, nombre, correo) {
  const formElemento = document.createElement("form");
  const nombreElemento = document.createElement("input");
  const correoElemento = document.createElement("input");
  const idElemento = document.createElement("input");
  idElemento.name = "editId";
  idElemento.value = id;
  nombreElemento.name = "editNombre";
  nombreElemento.value = nombre;
  correoElemento.name = "editCorreo";
  correoElemento.value = correo;
  formElemento.appendChild(nombreElemento);
  formElemento.appendChild(correoElemento);
  formElemento.appendChild(idElemento);
  const datos = new FormData(formElemento);
  try {
    var respuesta = await fetch(
      "../controllers/usuarioController.php?action=editar_usuarios",
      {
        method: "POST",
        body: datos,
        cache: "no-cache",
      }
    );
    var usuarios = await respuesta.json();
    var tbody = document.getElementById("usuarios");
    tbody.remove();
    tbody = document.createElement("tbody");
    tbody.setAttribute("id", "usuarios");
    var table = document.querySelector(".table_t");
    table.appendChild(tbody);
    getTabla();
  } catch (error) {
    console.error("Error", error);
  }
}

async function eliminarId(id) {
  const formElemento = document.createElement("form");
  const inputElemento = document.createElement("input");
  inputElemento.name = "idUsuario";
  inputElemento.value = id;
  formElemento.appendChild(inputElemento);
  const datos = new FormData(formElemento);
  try {
    var respuesta = await fetch(
      "../controllers/usuarioController.php?action=eliminar_usuario",
      {
        method: "POST",
        body: datos,
        cache: "no-cache",
      }
    );
    if (respuesta.ok) {
      var response = await respuesta.json();
      var message = response.message;
      if (message === "Usuario eliminado con éxito") {
        var tr = document.getElementById(id);
        if (tr) {
          tr.remove();
        }
        Swal.fire({
          ...swalConfig,
          icon: "info",
          title: message,
        });
      }
    } else {
      throw new Error("Error en la respuesta de eliminar usuario");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function editarUsuario(id, nombre, correo) {
  const { value: formValues } = await Swal.fire({
    ...swalConfig, // Spread the Swal configuration
    title: "Editando a " + nombre,
    html: `<label for="editNombre"></label><input type="text" id="editNombre" class="swal2-input" placeholder="Nombre" value="${nombre}">
         <label for="editCorreo"></label><input type="email" id="editCorreo" class="swal2-input" placeholder="Correo" value="${correo}">`,
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Guardar cambios",
    preConfirm: () => {
      const editNombre = Swal.getPopup().querySelector("#editNombre").value;
      const editCorreo = Swal.getPopup().querySelector("#editCorreo").value;

      return { editNombre, editCorreo };
    },
  });

  if (formValues) {
    try {
      const { editNombre, editCorreo } = formValues;
      const datos = new FormData();
      datos.append("editId", id);
      datos.append("editNombre", editNombre);
      datos.append("editCorreo", editCorreo);

      const respuesta = await fetch(
        "../controllers/usuarioController.php?action=editar_usuarios",
        {
          method: "POST",
          body: datos,
          cache: "no-cache",
        }
      );

      if (respuesta.ok) {
        const usuario = await respuesta.json();
        const tr = document.getElementById(id);
        if (tr) {
          const tdNombre = tr.querySelector(".usuario");
          const tdCorreo = tdNombre.nextElementSibling;
          tdNombre.textContent = usuario.NombreUsuario;
          tdCorreo.textContent = usuario.CorreoUsuario;
        }
        Swal.fire({
          ...swalConfig,
          icon: "success",
          title: "Usuario editado con éxito.",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          location.reload();
        });
      } else {
        throw new Error("Error en la respuesta de editar usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        ...swalConfig,
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error al editar el usuario. Por favor, intenta nuevamente.",
      });
    }
  }
}

function obtener(tipo) {
  var botones = document.querySelectorAll(tipo);
  botones.forEach((button) => {
    button.addEventListener("click", () => {
      id = button.getAttribute("id");
      if (id != null && tipo == ".button_delete") {
        eliminarUsuario(id);
      } else if (id != null && tipo == ".button_edit") {
        var nombre, correo;
        var usuarios = document.querySelectorAll(".trs");
        usuarios.forEach((usuarios) => {
          if (usuarios.getAttribute("id") == id) {
            nombre = usuarios.getElementsByClassName("usuario")[0].textContent;
            correo = usuarios.getElementsByClassName("usuario")[1].textContent;
          }
        });
        editarUsuario(id, nombre, correo);
      }
    });
  });
}

getTabla();
