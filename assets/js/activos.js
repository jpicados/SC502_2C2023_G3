// Configuración estándar de SweetAlert
const swalConfig = {
  confirmButtonColor: "rgb(16, 77, 148)",
  cancelButtonColor: "rgb(209, 68, 68)",
  focusConfirm: false,
};
// Se crea una funcion boton que nos genera los botones de la tabla activo para editar como para eliminar
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

function item(tabla, activo) {
  // Se crean los elementos básicos de lo que lleva cada item, también se le pasa un activo
  var tr = document.createElement("tr");
  tr.setAttribute("class", "trs");
  var tdId = document.createElement("td");
  tdId.setAttribute("name", "id");
  var tdSerie = document.createElement("td");
  var tdMarca = document.createElement("td");
  var tdTag = document.createElement("td");
  var tdPO = document.createElement("td");
  var tdRAM = document.createElement("td");
  var tdCategoria = document.createElement("td");
  var tdEntidad = document.createElement("td");
  var tdEstado = document.createElement("td");
  var tdEmpleado = document.createElement("td");

  tdSerie.setAttribute("class", "activo"); // Colocamos los atributos activo para obtener su valor en el edit
  tdMarca.setAttribute("class", "activo");
  tdTag.setAttribute("class", "activo");

  // Se crean los botones que van dentro de la tabla
  btnModificar = Boton(
    "fa-solid fa-user-pen button_icon",
    "button_edit",
    `${activo.IdActivo}`
  );
  btnEliminar = Boton(
    "fa-solid fa-user-minus button_icon",
    "button_delete",
    `${activo.IdActivo}`
  );
  tdId.textContent = `${activo.IdActivo}`;
  tr.setAttribute("id", `${activo.IdActivo}`);
  tdSerie.textContent = `${activo.Serie}`;
  tdMarca.textContent = `${activo.Marca}`;
  tdTag.textContent = `${activo.Tag}`;
  tdPO.textContent = `${activo.PO}`;
  tdRAM.textContent = `${activo.RAM}`;
  tdCategoria.textContent = `${activo.NombreCategoria}`;
  tdEntidad.textContent = `${activo.NumeroEntidad}`;
  tdEstado.textContent = `${activo._Estado}`;
  tdEmpleado.textContent = `${activo.NombreEmpleado}`;
  tabla
    .appendChild(tr)
    .append(
      tdId,
      tdSerie,
      tdMarca,
      tdTag,
      tdPO,
      tdRAM,
      tdCategoria,
      tdEntidad,
      tdEstado,
      tdEmpleado
    );
  return tabla;
}
function getTabla() {
  fetch("../controllers/activoController.php?action=getActivos")
    .then((datos) => datos.json())
    .then((activos) => {
      var tabla = document.getElementById("activos");
      activos.forEach((activo) => {
        tablaActivos = item(tabla, activo);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

getTabla();
