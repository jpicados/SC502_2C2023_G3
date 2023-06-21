getTabla();
//Se crea una funcion boton que nos genera los botones de la tabla empleado para editar como para eliminar
function Boton (iconoValor,botonValor,id) {
  //cada boton se conforma por td que es el campo donde va, por button que es el boton y la etiqueta i que es el icono que llevan
  var tdBot= document.createElement("td");
  var modificar= document.createElement("button");
  var iconoMod=document.createElement("i");
  //se añaden atributos basicos a los botones
  iconoMod.setAttribute("class",iconoValor);
  modificar.setAttribute("class",botonValor);
  modificar.setAttribute("id",id);
  modificar.setAttribute("button","button");
  modificar.append(iconoMod);
  tdBot.append(modificar);
  return tdBot;
};
function item (tabla,empleado){
  //se crean los elementos basicos de lo que lleva cada item, tambien se le pasa un empleado
  var tr = document.createElement("tr"); 
  var tdId = document.createElement("td");
  tdId.setAttribute("name","id");
  var tdNombre = document.createElement("td");
  var tdCorreo = document.createElement("td");
  var tdWWID = document.createElement("td");
  //se crean los botones que van dentro de la tabla
  btnModificar= Boton ("fa-solid fa-user-pen button_icon","button_edit",`${empleado.IdEmpleado}`);
  btnEliminar= Boton ("fa-solid fa-user-minus button_icon","button_delete",`${empleado.IdEmpleado}`);
  tdId.textContent = `${empleado.IdEmpleado}`;
  tr.setAttribute("id",`${empleado.IdEmpleado}`);
  tdNombre.textContent = `${empleado.NombreEmpleado}`;
  tdCorreo.textContent = `${empleado.CorreoEmpleado}`;
  tdWWID.textContent = `${empleado.WWID}`;
  tabla.appendChild(tr).append(tdId, tdNombre, tdCorreo, tdWWID,btnModificar,btnEliminar);
  return tabla;
}
//Se realiza un fetch para buscar todos los elementos que seran proyectados.
function getTabla(){
  fetch("../controllers/empleadoController.php") //Busca en la direccion del controlador
  .then((datos) => datos.json()) // Se reciben los datos y se traducen a json
  .then((empleados) => {
      var tabla = document.getElementById("empleados"); //Se obtiene el id de la lista que sera manipulada
      empleados.forEach((empleado) => {
      tablaEmpleados=item(tabla,empleado);//Se crea la tabla y se retorna a ella misma para que se iguale a todos los empleados que recorrio
    });
      obtener(document.querySelectorAll(".button_delete"));
  })
  .catch((error) => {
    console.error("Error:", error);
  });
}

//se crea la funcion que envia los datos de empleado al controlador
async function enviarDatos(Nombre,Correo,WWIDe) {
  const formElement = document.createElement('form'); //Crear un nuevo elemento de formulario HTML para enviar datos
  const NombreEmpleado = document.createElement('input'); //Se crean los elemementos que se agregan al form
  const CorreoEmpleado = document.createElement('input');
  const WWID = document.createElement('input');
  // CrearElementos especificamente igual (Esta parte es la que se lee en php Atributo NAME)
  NombreEmpleado.name = 'NombreEmpleado';
  NombreEmpleado.value = Nombre;
  CorreoEmpleado.name = 'CorreoEmpleado';
  CorreoEmpleado.value = Correo;
  WWID.name = 'WWID';
  WWID.value = WWIDe;
  // Agregar el elementos al formulario
  formElement.appendChild(NombreEmpleado);
  formElement.appendChild(CorreoEmpleado);
  formElement.appendChild(WWID);
  // Crear un nuevo objeto FormData con el formulario
  const datos = new FormData(formElement);
  try {
    var respuesta = await fetch('../controllers/empleadoController.php', {
    method: 'POST',//se configura el envio tipo post
    body: datos,//se envia el archivo en tipo formulario con todos los inputs
    }); 
    var empleados = await respuesta.json();//Se obtiene la respuesta recibida por el servidor en formato json
    var tabla = document.getElementById("empleados");//Se obtiene la tabla
    respuestaEmpleado=empleados[empleados.length-1];//Se obtiene el ultimo elemento de todos los empleados para agregarse
    item(tabla,respuestaEmpleado); //Se crea un nuevo item de la tabla, este item es insertado en la tabla que le pasamos por parametro.
    obtener(document.querySelectorAll(".button_delete"));//Esta funcion se agrega justo debajo ya que se debe agregar al event listener luego de estar insertado.
  } catch (error) {
    //console.error('Error', respuesta);
  }
}

const enviarEmpleado = document.getElementById('botonRegistro');//Se obtiene el boton que acciona la ventana flotante de registrar empleado
enviarEmpleado.addEventListener('click', registroEmpleado);//Se le añade un event listener para que este reaccione al darle click

function registroEmpleado(){
  Swal.fire({ //Utilizamos Fire de la libreria Swal para las animaciones
  //Se coloca un titulo que sera mostrado en la ventana
  title: 'Registrar empleado',
  //Se coloca todo el html con sus respectivas entradas
  html: `<label for="NombreEmpleado"></label><input type="text" id="NombreEmpleado" name="NombreEmpleado" class="swal2-input" placeholder="Nombre">
  <label for="CorreoEmpleado"></label><input type="email" id="CorreoEmpleado" name="CorreoEmpleado" class="swal2-input" placeholder="Correo">
  <label for="WWID"></label><input type="number" id="WWID" name="WWID" class="swal2-input" placeholder="WWID">`,
  confirmButtonText: 'Registrar',//Se rellena el boton de registro
  confirmButtonColor: 'rgb(16, 77, 148)',//Se le pone un color acorde a la paleta
  focusConfirm: false,
  preConfirm: () => {//Se pre confirma obteniendo los datos y validando si estos se llenaron
    //Se obtiene cada elemento que se encuentra dentro de los inputs generados por "Swal"
    const NombreEmpleado = Swal.getPopup().querySelector('#NombreEmpleado').value
    const CorreoEmpleado = Swal.getPopup().querySelector('#CorreoEmpleado').value
    const WWID = Swal.getPopup().querySelector('#WWID').value
    enviarDatos(NombreEmpleado,CorreoEmpleado,WWID);
    if (!WWID || !NombreEmpleado || !CorreoEmpleado) { //Se realiza la validacion
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

function eliminarEmpleado(id){ //Se le pasa el id a eliminar por parametro este EJECUTA LA ANIMACION
  const Toast = Swal.mixin({//Se añade el mixin de la libreria Swal
  toast: true,
  position: 'top-end', //Se posiciona arriba a la derecha de la pagina
  showConfirmButton: false,
  timer: 3000, //Dura 3000ms
  timerProgressBar: true,  //Mostrar la barra de pogreso
  didOpen: (toast) => {
    eliminarId(id); //Ejecuta toda la logica de envio al servidor.
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
}) 
  Toast.fire({ 
    icon: 'info', //le pasamos que queremos icono info
    title: 'Empleado Eliminado' //mostramos por mensaje que el empleado ha sido eliminado
  })
}

async function eliminarId(id){//Este EJECUTA LA LOGICA
  const formElemento = document.createElement('form'); //Crear un nuevo elemento de formulario HTML
  const inputElemento = document.createElement('input'); //Se crea el input del formulario
  inputElemento.name = 'idEmpleado'; //Establecer atributos esenciales que lee el php
  inputElemento.value = id;
  formElemento.appendChild(inputElemento); //Agregar el elemento al formulario
  const datos = new FormData(formElemento);  //Crear un nuevo objeto FormData para el formulario
  try{ 
    var respuesta = await fetch('../controllers/empleadoController.php', { //Se busca la direccion del controlador
      method: 'POST',//se configura el envio tipo post
      body: datos,//se convierte el elemento en tipo json
      cache: "no-cache", //se especifica el cache
    }); 
    var validacion=await respuesta.json(); //Se reciben los datos tipo json
    var td = document.getElementById(validacion);
    if (td){//Si existe el elemento en la tabla lo elimina
      var tr = td.closest('tr');//closest recibe el primer elemento que esta contenido en una etiqueta, aca obtiene el primer tr que contiene td con esa id
    }
    if (tr) {
      tr.remove(); // Elimina el elemento <tr> es decir todo el elemento de la tabla
    }    
    }catch (error) {
      console.error('Error', error);
    }
  }

function obtener(botones){ //Se le pasan por parametro los botones de eliminar
  botones.forEach(button => { //For each que recorre todos los botones
  button.addEventListener("click", () => {
  id = button.getAttribute("id"); //Obtiene el atributo del boton, su id
  if (id!=null){
    eliminarEmpleado(id); //Elimina mientras el id sea diferente a nulo
  }
  });
}); 
}
  
  

  