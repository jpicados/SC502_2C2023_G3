// Configuración estándar de SweetAlert
const swalConfig = {
  confirmButtonColor: "rgb(16, 77, 148)",
  cancelButtonColor: "rgb(209, 68, 68)",
  focusConfirm: false,
};
// Se crea una funcion boton que nos genera los botones de la tabla bitacora para editar como para eliminar
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

function item(tabla, bitacora) {
  // Se crean los elementos básicos de lo que lleva cada item, también se le pasa un bitacora
  var tr = document.createElement("tr");
  tr.setAttribute("class", "trs");
  var tdId = document.createElement("td");
  tdId.setAttribute("name", "id");
  var tdFecha = document.createElement("td");
  var tdAccion = document.createElement("td");
  var tdSerie = document.createElement("td");
  var tdNombreUsuario = document.createElement("td");

  tdFecha.setAttribute("class", "bitacora");
  tdAccion.setAttribute("class", "bitacora");
  tdSerie.setAttribute("class", "bitacora");

  // Se crean los botones que van dentro de la tabla
  btnModificar = Boton(
    "fa-solid fa-user-pen button_icon",
    "button_edit",
    `${bitacora.IdBitacora}`
  );
  btnEliminar = Boton(
    "fa-solid fa-user-minus button_icon",
    "button_delete",
    `${bitacora.IdBitacora}`
  );
  tdId.textContent = `${bitacora.IdBitacora}`;
  tr.setAttribute("id", `${bitacora.IdBitacora}`);
  tdFecha.textContent = `${bitacora.Fecha}`;
  tdAccion.textContent = `${bitacora.Accion}`;
  tdSerie.textContent = `${bitacora.Serie}`;
  tdNombreUsuario.textContent = `${bitacora.NombreUsuario}`;
  tabla
    .appendChild(tr)
    .append(tdId, tdFecha, tdAccion, tdSerie, tdNombreUsuario);
  return tabla;
}
async function getTabla(recibirFuncion,bitacoraFiltrada) {

  let movimientos=[];
  await fetch("../controllers/activoController.php?action=listarbitacora")
    .then((datos) => datos.json())
    .then((bitacoras) => {
      var tabla = document.getElementById("bitacoras");
      bitacoras.forEach((bitacora) => {

        if (recibirFuncion!=true){
          tablabitacora = item(tabla, bitacora);
        }
       var bitacora={
        IdBitacora:bitacora.IdBitacora,
        Fecha:bitacora.Fecha,
        Accion:bitacora.Accion,
        Serie:bitacora.Serie,
        NombreUsuario:bitacora.NombreUsuario
       }
       movimientos.push(bitacora);

      });
      
      if (recibirFuncion==true && bitacoraFiltrada!=null){
        console.log(bitacoraFiltrada);
        
        bitacoraFiltrada.forEach(element => {
          tablabitacora = item(tabla, element);
        });
      }

    })
    .catch((error) => {
      console.error("Error:", error);
    });
    return movimientos;
}



document.querySelector('.buscador').addEventListener('input', async (e) => {
  let busqueda = e.target.value.toLowerCase();


  

  var bitacora= await getTabla(true);
  
  console.log(busqueda);
  
  let bitacoraFiltrada = bitacora.filter(bitacora => bitacora.NombreUsuario.toLowerCase().includes(busqueda));
  

  

  var tbody = document.getElementById("bitacoras");
  tbody.remove();
  tbody = document.createElement("tbody");
  tbody.setAttribute("id", "bitacoras");
  var table = document.querySelector(".table_t");
  table.appendChild(tbody);

  getTabla(true,bitacoraFiltrada);


if (busqueda==""){
  

}

  
});


getTabla();
