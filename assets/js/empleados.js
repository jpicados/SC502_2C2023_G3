fetch("../controllers/empleadoController.php")
  .then((datos) => datos.json()) // Se reciben los datos y se traducen a json
  .then((empleados) => {
    //se les coloca empleados una vez que los datos se reciben con exito
    var tablaEmpleados = document.getElementById("empleados"); //Se obtiene el id de la lista que sera manipulada

    empleados.forEach((empleado) => {
      //se recorren los datos del json

      var tr = document.createElement("tr"); //se crean los elementos de tipo tr y td que recibe e html
      var tdId = document.createElement("td");
      var tdNombre = document.createElement("td");
      var tdCorreo = document.createElement("td");
      var tdWWID = document.createElement("td");

      tdId.textContent = `${empleado.IdEmpleado}`; //Se agrega el texto de la db
      tdNombre.textContent = `${empleado.NombreEmpleado}`;
      tdCorreo.textContent = `${empleado.CorreoEmpleado}`;
      tdWWID.textContent = `${empleado.WWID}`;

      tablaEmpleados.appendChild(tr).append(tdId, tdNombre, tdCorreo, tdWWID); //se crea la tabla
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
