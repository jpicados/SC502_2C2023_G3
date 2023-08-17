// Configuración estándar de SweetAlert
const swalConfig = {
  confirmButtonColor: "rgb(16, 77, 148)",
  cancelButtonColor: "rgb(209, 68, 68)",
  
};

// Se crea una funcion boton que nos genera los botones de la tabla empleado para editar como para eliminar
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

function item(tabla, empleado) {
  // Se crean los elementos básicos de lo que lleva cada item, también se le pasa un empleado
  var tr = document.createElement("tr");
  tr.setAttribute("class", "trs");
  var tdId = document.createElement("td");
  tdId.setAttribute("name", "id");
  var tdNombre = document.createElement("td");
  var tdCorreo = document.createElement("td");
  //var tdWWID = document.createElement("td");
  tdNombre.setAttribute("class", "empleado"); // Colocamos los atributos empleado para obtener su valor en el edit
  tdCorreo.setAttribute("class", "empleado");
  tdId.setAttribute("class", "empleado");

  // Se crean los botones que van dentro de la tabla
  btnModificar = Boton(
    "fa-solid fa-user-pen button_icon",
    "button_edit",
    `${empleado.WWID}`
  );
  btnEliminar = Boton(
    "fa-solid fa-user-minus button_icon",
    "button_delete",
    `${empleado.WWID}`
  );
  tdId.textContent = `${empleado.WWID}`;
  tr.setAttribute("id", `${empleado.WWID}`);
  tdNombre.textContent = `${empleado.NombreEmpleado}`;
  tdCorreo.textContent = `${empleado.CorreoEmpleado}`;
  //tdWWID.textContent = `${empleado.WWID}`;
  tabla
    .appendChild(tr)
    .append(tdId, tdNombre, tdCorreo, btnModificar, btnEliminar);
  return tabla;
}

function getTabla() {
  fetch("../controllers/empleadoController.php?action=get_empleados")
    .then((datos) => datos.json())
    .then((empleados) => {
      
      var tabla = document.getElementById("empleados");
      empleados.forEach((empleado) => {
        tablaEmpleados = item(tabla, empleado);
      });
      obtener(".button_delete");
      obtener(".button_edit");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function enviarDatos(Nombre, Correo, WWIDe) {
  const formElement = document.createElement("form");
  const NombreEmpleado = document.createElement("input");
  const CorreoEmpleado = document.createElement("input");
  const WWID = document.createElement("input");
  NombreEmpleado.name = "NombreEmpleado";
  NombreEmpleado.value = Nombre;
  CorreoEmpleado.name = "CorreoEmpleado";
  CorreoEmpleado.value = Correo;
  WWID.name = "WWID";
  WWID.value = WWIDe;
  formElement.appendChild(NombreEmpleado);
  formElement.appendChild(CorreoEmpleado);
  formElement.appendChild(WWID);
  const datos = new FormData(formElement);
  try {
    var respuesta = await fetch(
      "../controllers/empleadoController.php?action=solicitud_empleados",
      {
        method: "POST",
        body: datos,
      }
    );
    var empleados = await respuesta.json();
    console.log(empleados);
    var tabla = document.getElementById("empleados");
    tabla.remove();
    tabla = document.createElement("tbody");
    tabla.setAttribute("id", "empleados");
    var table = document.querySelector(".table_t");
    table.appendChild(tabla);
    getTabla();
  } catch (error) {
    console.error("Error:", error);
  }
}

const enviarEmpleado = document.getElementById("botonRegistro");
enviarEmpleado.addEventListener("click", registroEmpleado);

function registroEmpleado() {
  Swal.fire({
    ...swalConfig, // Extender la configuración de SweetAlert
    title: "Registrar empleado",
    html: `<label for="NombreEmpleado"></label><input type="text" id="NombreEmpleado" name="NombreEmpleado" class="swal2-input" placeholder="Nombre">
  <label for="CorreoEmpleado"></label><input type="email" id="CorreoEmpleado" name="CorreoEmpleado" class="swal2-input" placeholder="Correo">
  <label for="WWID"></label><input type="number" id="WWID" name="WWID" class="swal2-input" placeholder="WWID">`,
    confirmButtonText: "Registrar",
  }).then((result) => {
    if (result.isConfirmed) {
      const nombre = Swal.getPopup().querySelector("#NombreEmpleado").value;
      const correo = Swal.getPopup().querySelector("#CorreoEmpleado").value;
      const wwid = Swal.getPopup().querySelector("#WWID").value;
      if (nombre && correo && wwid) {
        console.log(nombre)
        console.log(correo)
        console.log(wwid)
        enviarDatos(nombre, correo, wwid);
        
        
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

function eliminarEmpleado(id) {
  const Toast = Swal.mixin({
    ...swalConfig, // Extender la configuración de SweetAlert
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
    icon: "error",
    title: "¡Este empleado tiene uno o más activos asignados!",
  });
}

async function editarId(id, nombre, correo, wwid) {
  const formElemento = document.createElement("form");
  const nombreElemento = document.createElement("input");
  const correoElemento = document.createElement("input");
  const wwidElemento = document.createElement("input");
  const idElemento = document.createElement("input");
  idElemento.name = "editId";
  idElemento.value = wwid;
  nombreElemento.name = "editNombre";
  nombreElemento.value = nombre;
  correoElemento.name = "editCorreo";
  correoElemento.value = correo;
  wwidElemento.name = "editWwid";
  wwidElemento.value = wwid;
  formElemento.appendChild(nombreElemento);
  formElemento.appendChild(correoElemento);
  formElemento.appendChild(wwidElemento);
  formElemento.appendChild(idElemento);
  const datos = new FormData(formElemento);
  try {
    var respuesta = await fetch(
      "../controllers/empleadoController.php?action=editar_empleados",
      {
        method: "POST",
        body: datos,
        cache: "no-cache",
      }
    );
    var empleados = await respuesta.json();
    var tbody = document.getElementById("empleados");
    tbody.remove();
    tbody = document.createElement("tbody");
    tbody.setAttribute("id", "empleados");
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
  inputElemento.name = "idEmpleado";
  inputElemento.value = id;
  console.log(id);
  formElemento.appendChild(inputElemento);
  const datos = new FormData(formElemento);
  try {
    var respuesta = await fetch(
      "../controllers/empleadoController.php?action=eliminar_empleado",
      {
        method: "POST",
        body: datos,
        cache: "no-cache",
      }
    );
    if (respuesta.ok) {
      var response = await respuesta.json();
      var message = response.message;
      if (message === "Empleado eliminado con éxito") {
        var tr = document.getElementById(id);
        if (tr) {
          tr.remove();
        }
        Swal.fire({
          ...swalConfig,
          icon: "success",
          title: message,
        });
      }
    } else {
      throw new Error("Error en la respuesta de eliminar empleado");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function editarEmpleado(id, nombre, correo, wwid) {
  const { value: formValues } = await Swal.fire({
    ...swalConfig, // Extender la configuración de SweetAlert
    title: "Editando a " + correo,
    html: `<label for="editNombre"></label><input type="text" id="editNombre" class="swal2-input" placeholder="WWID" value="${nombre}" readonly>
       <label for="editCorreo"></label><input type="email" id="editCorreo" class="swal2-input" placeholder="Nombre" value="${correo}">
       <label for="editWwid"></label><input type="text" id="editWwid" class="swal2-input" placeholder="Correo" value="${wwid}">`,
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Guardar cambios",
    preConfirm: () => {
      const editNombre = Swal.getPopup().querySelector("#editNombre").value;
      const editCorreo = Swal.getPopup().querySelector("#editCorreo").value;
      const editWwid = Swal.getPopup().querySelector("#editWwid").value;
      return { editNombre, editCorreo, editWwid };
    },
  });

  if (formValues) {
    try {
      const { editNombre, editCorreo, editWwid } = formValues;
      const datos = new FormData();
      datos.append("editId", editNombre);
      datos.append("editNombre", editCorreo);
      datos.append("editCorreo", editWwid);
      datos.append("editWwid", editNombre);
      console.log(editNombre);
      console.log(editCorreo);
      console.log(editWwid+'so');
    




      const respuesta = await fetch(
        "../controllers/empleadoController.php?action=editar_empleados",
        {
          method: "POST",
          body: datos,
          cache: "no-cache",
        }
      );

      if (respuesta.ok) {
        const empleado = await respuesta.json();
        var tabla = document.getElementById("empleados");
        tabla.remove();
        tabla = document.createElement("tbody");
        tabla.setAttribute("id", "empleados");
        var table = document.querySelector(".table_t");
        table.appendChild(tabla);
        getTabla();


        Swal.fire({
          ...swalConfig,
          icon: "success",
          title: "Empleado editado con éxito.",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          
        });
      } else {
        throw new Error("Error en la respuesta de editar empleado");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        ...swalConfig,
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error al editar el empleado. Por favor, intenta nuevamente.",
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
        eliminarEmpleado(id);
      } else if (id != null && tipo == ".button_edit") {
        var nombre, correo, wwid;
        var empleados = document.querySelectorAll(".trs");
        empleados.forEach((empleados) => {
          if (empleados.getAttribute("id") == id) {
            nombre =
              empleados.getElementsByClassName("empleado")[0].textContent;
              console.log(nombre);
            correo =
              empleados.getElementsByClassName("empleado")[1].textContent;
           
              wwid = empleados.getElementsByClassName("empleado")[2].textContent;
              console.log(correo);
              console.log(wwid);
            }
        });
        editarEmpleado(wwid, nombre, correo, wwid);
      }
    });
  });
}

getTabla();
