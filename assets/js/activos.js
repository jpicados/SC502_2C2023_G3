// Fetch activos from the controller endpoint
fetch("../controllers/activoController.php")
  .then((response) => response.json())
  .then((data) => {
    // Access activos
    const activoList = document.getElementById("activo-list");

    // Create the table element
    const table = document.createElement("table");
    table.classList.add("activo-table"); // Add a CSS class to style the table if desired

    // Create the table header row
    const headerRow = document.createElement("tr");
    const headers = [
      "Serie",
      "Marca",
      "Tag",
      "PO",
      "RAM",
      "Categoria",
      "Entidad",
      "Estado",
      "Empleado",
      "Correo",
      "WWID",
    ];
    headers.forEach((header) => {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Create table rows with the data
    data.forEach((activo) => {
      const row = document.createElement("tr");
      const values = [
        activo.Serie,
        activo.Marca,
        activo.Tag,
        activo.PO,
        activo.RAM,
        activo.NombreCategoria,
        activo.NumeroEntidad,
        activo._Estado,
        activo.NombreEmpleado,
        activo.CorreoEmpleado,
        activo.WWID,
      ];
      values.forEach((value) => {
        const td = document.createElement("td");
        td.textContent = value;
        row.appendChild(td);
      });
      table.appendChild(row);
    });

    // Append the table to the activoList container
    activoList.appendChild(table);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
