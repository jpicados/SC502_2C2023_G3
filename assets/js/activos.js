// DOM elements
const activoList = document.getElementById("activo-list");

// Function to create an activo list item
function createActivoListItem(activo) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `IdActivo: ${activo.IdActivo}, 
    Serie: ${activo.Serie}, 
    Marca: ${activo.Marca}, 
    Tag: ${activo.Tag}, 
    PO: ${activo.PO}, 
    RAM ${activo.RAM}, 
    IdCategoria ${activo.IdCategoria}, Categoria: ${activo.NombreCategoria}, 
    IdEntidad: ${activo.IdEntidad}, Entidad: ${activo.NombreEntidad}, 
    IdEstado: ${activo.IdEstado}, Estado: ${activo._Estado}, 
    IdEmpleado: ${activo.IdEmpleado}, Empleado: ${activo.NombreEmpleado}, 
    Correo: ${activo.CorreoEmpleado}, WWID: ${activo.WWID}
  `;
  return listItem;
}

// Function to fetch and display the activo list
function fetchActivos() {
  fetch("../controllers/activoController.php?action=get_activos")
    .then((response) => response.json())
    .then((data) => {
      activoList.innerHTML = "";
      data.forEach((activo) => {
        const listItem = createActivoListItem(activo);
        activoList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error fetching activos:", error));
}

// Function to handle response
function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
}

// Function to handle error
function handleError(error) {
  console.error("Error:", error);
}

// Fetch and display the initial activo list
fetchActivos();
