// buscando activo desde el server.php
fetch("server.php")
  .then((response) => response.json())
  .then((data) => {
    // accediendo a activo
    const activoList = document.getElementById("activo-list");
    data.forEach((activo) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Id: ${activo.IdActivo}, Serie: ${activo.Serie}, Marca: ${activo.Marca}`;
      activoList.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

  fetch("empleadoController.php")
  .then((response) => response.json())
  .then((data) => {
    // accediendo a activo
    const empleadoList = document.getElementById("empleados");
    data.forEach((empleado) => {
      const listItem = document.createElement("li");
      console.log(empleado.IdEmpleado)
      listItem.textContent = `Id: ${empleado.IdEmpleado}, NombreEmpleado: ${empleado.NombreEmpleado}, Correo: ${empleado.CorreoEmpleado}, WWID: ${empleado.WWID}`;
      empleadoList.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

