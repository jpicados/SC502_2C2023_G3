
//Se crea una funcion boton que nos genera los botones de la tabla empleado para editar como para eliminar
function Boton (iconoValor,botonValor) {
  //cada boton se conforma por td que es el campo donde va, por button que es el boton y la etiqueta i que es el icono que llevan
  var tdBot= document.createElement("td");
  var modificar= document.createElement("button");
  var iconoMod=document.createElement("i");
  //se añaden atributos basicos a los botones
  iconoMod.setAttribute("class",iconoValor);
  modificar.setAttribute("class",botonValor);
  modificar.setAttribute("button","button");
  modificar.append(iconoMod);
  tdBot.append(modificar);
  return tdBot;
};
function item (tabla,empleado){
  //se crean los elementos basicos de lo que lleva cada item, tambien se le pasa un empleado
  var tr = document.createElement("tr"); 
  var tdId = document.createElement("td");
  var tdNombre = document.createElement("td");
  var tdCorreo = document.createElement("td");
  var tdWWID = document.createElement("td");
  //se crean los botones que van dentro de la tabla
  btnModificar= Boton ("fa-solid fa-user-pen button_icon","button_edit");
  btnEliminar= Boton ("fa-solid fa-user-minus button_icon","button_delete");
  tdId.textContent = `${empleado.IdEmpleado}`;
  tdNombre.textContent = `${empleado.NombreEmpleado}`;
  tdCorreo.textContent = `${empleado.CorreoEmpleado}`;
  tdWWID.textContent = `${empleado.WWID}`;
  tabla.appendChild(tr).append(tdId, tdNombre, tdCorreo, tdWWID,btnModificar,btnEliminar);
  return tabla;
}
fetch("../controllers/empleadoController.php")//Busca los datos en el Json
  .then((datos) => datos.json()) // Se reciben los datos y se traducen a json
  .then((empleados) => {
      var tabla = document.getElementById("empleados"); //Se obtiene el id de la lista que sera manipulada
      empleados.forEach((empleado) => {
      //se crea la tabla y se retorna a ella misma para que se iguale a todos los empleados que recorrio
      tablaEmpleados=item(tabla,empleado);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

  //se crea la funcion que envia los datos de empleado al controlador
  async function enviarDatos(NombreEmpleado,CorreoEmpleado,WWID) {
    var empleado = {
      NombreEmpleado: NombreEmpleado,
      CorreoEmpleado: CorreoEmpleado,
      WWID: WWID
    };
    try {
    
    var response = await fetch('../controllers/empleadoController.php', {
      method: 'POST',//se configura el envio tipo post
      body: JSON.stringify(empleado),//se convierte el elemento en tipo json
      cache: "no-cache", //se especifica el cache
      credentials: "same-origin",
      headers: {
        'Content-Type': 'application/json'
        } 
      }); 
      //Se obtiene la respuesta recibida por el servidor
      var empleados = await response.json();
      var tabla = document.getElementById("empleados");
      //Se obtiene el ultimo elemento de todos los empleados para agregarse
      respuestaEmpleado=empleados[empleados.length-1];
      item(tabla,respuestaEmpleado);
    } catch (error) {
      console.error('Error', error);

    }
  }
  //Se obtiene el boton que acciona la ventana flotante de registrar empleado
  const enviarEmpleado = document.getElementById('botonRegistro');
  enviarEmpleado.addEventListener('submit', registroEmpleado);

  function registroEmpleado(){
    Swal.fire({
      //Se coloca un titulo que sera mostrado en la ventana
      title: 'Registrar empleado',
      //Se coloca todo el html con sus respectivas entradas
      html: `<input type="text" id="NombreEmpleado" class="swal2-input" placeholder="Nombre">
      <input type="email" id="CorreoEmpleado" class="swal2-input" placeholder="Correo">
      <input type="number" id="WWID" class="swal2-input" name="WWID" placeholder="WWID">
      `,
      confirmButtonText: 'Registrar',//Se rellena el boton de registro
      confirmButtonColor: 'rgb(16, 77, 148)',//Se le pone un color acorde a la paleta
      focusConfirm: false,
      preConfirm: () => {//Se pre confirma obteniendo los datos y validando si estos se llenaron
        //Se obtiene cada elemento que se encuentra dentro de los inputs generados por "Swal"
        const NombreEmpleado = Swal.getPopup().querySelector('#NombreEmpleado').value
        const CorreoEmpleado = Swal.getPopup().querySelector('#CorreoEmpleado').value
        const WWID = Swal.getPopup().querySelector('#WWID').value
        enviarDatos(NombreEmpleado,CorreoEmpleado,WWID);
        //Se realiza la validacion
        if (!WWID || !NombreEmpleado || !CorreoEmpleado) {
          Swal.showValidationMessage(`Ingrese todos los datos`)
        }
        return {NombreEmpleado: NombreEmpleado}
      }
    }).then((result) => {
      
      Swal.fire({
        confirmButtonColor: 'rgb(16, 77, 148)',
        title: result.value.NombreEmpleado+" registrado con exito."
      }) 
    })
  }
  
  