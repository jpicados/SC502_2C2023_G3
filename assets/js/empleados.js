fetch("../controllers/empleadoController.php")
  .then((datos) => datos.json()) // Se reciben los datos y se traducen a json
  .then((empleados) => {
    //se les coloca empleados una vez que los datos se reciben con exito
    var tablaEmpleados = document.getElementById("empleados"); //Se obtiene el id de la lista que sera manipulada
    function Boton (iconoValor,botonValor) {
      var tdBot= document.createElement("td");
      var modificar= document.createElement("button");
      var iconoMod=document.createElement("i");
      iconoMod.setAttribute("class",iconoValor);
      modificar.setAttribute("class",botonValor);
      modificar.setAttribute("button","button");
      modificar.append(iconoMod);
      tdBot.append(modificar);
      return tdBot;
  };
    empleados.forEach((empleado) => {
      //se recorren los datos del json
      var tr = document.createElement("tr"); //se crean los elementos de tipo tr y td que recibe e html
      var tdId = document.createElement("td");
      var tdNombre = document.createElement("td");
      var tdCorreo = document.createElement("td");
      var tdWWID = document.createElement("td");
      
      btnModificar= Boton ("fa-solid fa-user-pen button_icon","button_edit");
      btnEliminar= Boton ("fa-solid fa-user-minus button_icon","button_delete");
      tdId.textContent = `${empleado.IdEmpleado}`; //Se agrega el texto de la db
      tdNombre.textContent = `${empleado.NombreEmpleado}`;
      tdCorreo.textContent = `${empleado.CorreoEmpleado}`;
      tdWWID.textContent = `${empleado.WWID}`;
      tablaEmpleados.appendChild(tr).append(tdId, tdNombre, tdCorreo, tdWWID,btnModificar,btnEliminar); //se crea la tabla

    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

  const enviarEmpleado= document.getElementById('empleadoForm');
  enviarEmpleado.addEventListener('submit',enviarDatos);
  function enviarDatos(evento){
    evento.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const wwid = document.getElementById('wwid').value;
    const empleado = {
      nombre: nombre,
      correo: correo,
      wwid: wwid};
      fetch('../controllers/empleadoController.php', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(empleado), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
  }