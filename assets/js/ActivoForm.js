// DOM elements

const buscarActivoForm = document.getElementById("buscarActivoForm");
const scannerInput = document.getElementById("scannerInput");

const modifyProductForm = document.getElementById("activoform");

const categorySelect = document.getElementById("categoryId");
const entidadSelect = document.getElementById("entidadId");
const estadoSelect = document.getElementById("estadoId");

const saveButton = document.getElementById("saveButton");
const newActivoButton = document.getElementById("newActivoButton");
const deleteButton = document.getElementById("deleteButton");

// Set focus on the input field when the page loads
window.addEventListener("load", () => {
  scannerInput.focus();
});

// Function to populate the modify product form with product details
function populateModifyProductForm(activo) {

  console.log(activo);

  
  const serieInput2 = document.getElementById("serie2");
  const marcaInput2 = document.getElementById("marca2");
  const tagInput2 = document.getElementById("tag2");
  const poInput2 = document.getElementById("PO2");
  const ramInput2 = document.getElementById("RAM2");
  const categoryIdInput2 = document.getElementById("categoryId2");
  //const estadoSelect = document.getElementById("estadoId");
  const wwidInput2 = document.getElementById("WWID2");
  const entity2 = document.getElementById("entity2");
  const state2 = document.getElementById("state2");
  serieInput2.textContent="Serie: "+ activo.Serie;
  //serieInput.setAttribute("readonly", true);
  marcaInput2.textContent ="Marca: "+ activo.Marca;
  entity2.textContent = "Entidad: "+activo.IdEntidad;
  state2.textContent="Estado: "+activo.IdEstado;
  tagInput2.textContent ="Tag:"+ activo.Tag;
  poInput2.textContent = "PO: "+activo.PO;
  ramInput2.textContent ="RAM: "+ activo.RAM;
  categoryIdInput2.textContent ="Category: "+ activo.IdCategoria;
  wwidInput2.textContent ="WWID:"+ activo.WWID;



  const activoIdInput = document.getElementById("activoId");
  const serieInput = document.getElementById("serie");
  const marcaInput = document.getElementById("marca");
  const tagInput = document.getElementById("tag");
  const poInput = document.getElementById("PO");
  const ramInput = document.getElementById("RAM");
  const categoryIdInput = document.getElementById("categoryId");
  //const estadoSelect = document.getElementById("estadoId");
  const wwidInput = document.getElementById("WWID");
  activoIdInput.value = activo.IdActivo;
  serieInput.value = activo.Serie;
  //serieInput.setAttribute("readonly", true);
  marcaInput.value = activo.Marca;
  tagInput.value = activo.Tag;
  poInput.value = activo.PO;
  ramInput.value = activo.RAM;
  categoryIdInput.value = activo.IdCategoria;
  estadoSelect.value = activo.IdEstado;
  wwidInput.value = activo.WWID;
  console.log("WWID", activo.WWID);

  // Fetch and populate the Categoria select options
  fetch("../controllers/categoriaController.php?action=getCategorias")
    .then((response) => response.json())
    .then((categorias) => {
      populateCategoryOptions(categorias, activo.IdCategoria);
    })
    .catch((error) => console.error("Error fetching estados:", error));
  // Fetch and populate the entidad select options
  fetch("../controllers/entidadController.php?action=getEntidades")
    .then((response) => response.json())
    .then((entidades) => {
      populateEntidadOptions(entidades, activo.IdEntidad);
    })
    .catch((error) => console.error("Error fetching entidades:", error));
  // Fetch and populate the Estado select options
  fetch("../controllers/estadoController.php?action=getEstados")
    .then((response) => response.json())
    .then((estados) => {
      populateEstadoOptions(estados, activo.IdEstado);
    })
    .catch((error) => console.error("Error fetching estados:", error));
}

function showConfirmation() {
  alert("Activo updated successfully!");
}

// Function to populate the category select options
function populateCategoryOptions(categorias, selectedCategoryId) {
  categorySelect.innerHTML = "";

  const categoryIdNumber = parseInt(selectedCategoryId);

  categorias.forEach((categoria) => {
    const option = document.createElement("option");
    option.value = categoria.IdCategoria;
    option.textContent = categoria.NombreCategoria;

    if (categoria.IdCategoria == categoryIdNumber) {
      option.selected = true; // Set the option as selected
    }

    categorySelect.appendChild(option);
  });

  // Optionally, add a default option for "Select Category" if needed
  const defaultOption = document.createElement("option");
  defaultOption.value = ""; // Use an empty value for the default option
  defaultOption.textContent = "Select Category";
  categorySelect.insertBefore(defaultOption, categorySelect.firstChild);
}

// Function to populate the entidad select options
function populateEntidadOptions(entidades, selectedEntidadId) {
  entidadSelect.innerHTML = "";

  const entidadIdNumber = parseInt(selectedEntidadId);

  entidades.forEach((entidad) => {
    const option = document.createElement("option");
    option.value = entidad.IdEntidad;
    option.textContent = entidad.NumeroEntidad;

    if (entidad.IdEntidad == entidadIdNumber) {
      option.selected = true; // Set the option as selected
    }

    entidadSelect.appendChild(option);
  });

  // Optionally, add a default option for "Select Entidad" if needed
  const defaultOption = document.createElement("option");
  defaultOption.value = ""; // Use an empty value for the default option
  defaultOption.textContent = "Select Entidad";
  entidadSelect.insertBefore(defaultOption, entidadSelect.firstChild);
}

function populateEstadoOptions(estados, selectedEstadoId) {
  estadoSelect.innerHTML = "";

  const estadoIdNumber = parseInt(selectedEstadoId);

  estados.forEach((estado) => {
    const option = document.createElement("option");
    option.value = estado.IdEstado;
    option.textContent = estado._Estado;

    if (estado.IdEstado == estadoIdNumber) {
      option.selected = true; // Set the option as selected
    }

    estadoSelect.appendChild(option);
  });

  // Optionally, add a default option for "Select Estado" if needed
  const defaultOption = document.createElement("option");
  defaultOption.value = ""; // Use an empty value for the default option
  defaultOption.textContent = "Select Estado";
  estadoSelect.insertBefore(defaultOption, estadoSelect.firstChild);
}

// Function to fetch the activo data and populate the form
function handleSearch(event) {
  event.preventDefault();

  const serie = scannerInput.value;
  fetch(
    `../controllers/activoController.php?action=buscar_activo&serie=${serie}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Data from server:", data);
      const activo = data[0]; // Assuming the data is an array with a single activo object
      console.log("Activo object:", activo);
      populateModifyProductForm(activo);
    })
    .catch((error) => console.error("Error fetching activo:", error));
}
// Function to fetch and populate the entidad select options
function fetchAndPopulateCategorias() {
  fetch("../controllers/categoriaController.php?action=getCategorias")
    .then((response) => response.json())
    .then((categorias) => {
      const activoIdInput = document.getElementById("activoId");
      const idCategoria = activoIdInput.value; // Assuming the input for categoria Id is named "activoId"

      populateCategoryOptions(categorias, idCategoria);
    })
    .catch((error) => console.error("Error fetching categorias:", error));
}

// Function to fetch and populate the entidad select options
function fetchAndPopulateEntidades() {
  fetch("../controllers/entidadController.php?action=getEntidades")
    .then((response) => response.json())
    .then((entidades) => {
      const activoIdInput = document.getElementById("activoId");
      const idEntidad = activoIdInput.value; // Assuming the input for entidad Id is named "activoId"

      populateEntidadOptions(entidades, idEntidad);
    })
    .catch((error) => console.error("Error fetching entidades:", error));
}
function fetchAndPopulateEstados() {
  fetch("../controllers/estadoController.php?action=getEstados")
    .then((response) => response.json())
    .then((estados) => {
      const activoIdInput = document.getElementById("activoId");
      const idEstado = activoIdInput.value; // Assuming the input for estado Id is named "activoId"

      populateEstadoOptions(estados, idEstado);
    })
    .catch((error) => console.error("Error fetching estados:", error));
}

//Registro de movimientos en bitacora
function registrarBitacora(serie, accion) {
  fetch("../controllers/activoController.php?action=registerBitacora", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Accion: accion,
      Serie: serie,
      IdUsuario: userId,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error registering bitacora:", error));
}

// Function to update an activo
function updateActivo(event) {
  event.preventDefault();
  const serie = document.getElementById("serie").value;
  const marca = document.getElementById("marca").value;
  const tag = document.getElementById("tag").value;
  const po = document.getElementById("PO").value;
  const ram = document.getElementById("RAM").value;
  const categoryId = parseInt(document.getElementById("categoryId").value);
  const idEntidad = parseInt(document.getElementById("entidadId").value);
  const idEstado = parseInt(document.getElementById("estadoId").value);
  const wwid = document.getElementById("WWID").value;

  const wwidValue = wwid === "" ? null : wwid;

  const activoData = {
    Serie: serie,
    Marca: marca,
    Tag: tag,
    PO: po,
    RAM: ram,
    IdCategoria: categoryId,
    IdEntidad: idEntidad,
    IdEstado: idEstado,
    WWID: wwidValue,
  };

  fetch(
    `../controllers/activoController.php?action=modificar_activo&serie=${serie}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activoData),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      showConfirmation();
      registrarBitacora(activoData.Serie, "Activo Modificado");
      scannerInput.value = "";
      scannerInput.focus();
      clearFormInputs();
    })
    .catch((error) => console.error("Error updating activo:", error));
}

function addNewActivo() {
  const serie = document.getElementById("serie").value;
  const marca = document.getElementById("marca").value;
  const tag = document.getElementById("tag").value;
  const po = document.getElementById("PO").value;
  const ram = document.getElementById("RAM").value;
  const categoryId = parseInt(document.getElementById("categoryId").value);
  const idEntidad = parseInt(document.getElementById("entidadId").value);
  const idEstado = parseInt(document.getElementById("estadoId").value);
  const wwid = document.getElementById("WWID").value;

  const wwidValue = wwid === "" ? null : wwid;

  const activoData = {
    Serie: serie,
    Marca: marca,
    Tag: tag,
    PO: po,
    RAM: ram,
    IdCategoria: categoryId,
    IdEntidad: idEntidad,
    IdEstado: idEstado,
    WWID: wwidValue,
  };

  fetch("../controllers/activoController.php?action=nuevo_activo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activoData),
  })
    .then((response) => response.json())
    .then((data) => {
      showConfirmation();
      registrarBitacora(activoData.Serie, "Activo Nuevo");
      clearFormInputs();
      scannerInput.focus();
    })
    .catch((error) => console.error("Error adding new activo:", error));
}

function deleteActivo(event) {
  event.preventDefault();
  const serie = document.getElementById("serie").value;
  fetch(
    `../controllers/activoController.php?action=EliminarActivo&serie=${serie}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      showConfirmation("Activo deleted successfully!");
      registrarBitacora(serie, "Activo Eliminado");
      clearFormInputs();
      scannerInput.value = "";
      scannerInput.focus();
    })
    .catch((error) => console.error("Error deleting activo:", error));
}

function clearFormInputs() {
  document.getElementById("serie").value = "";
  document.getElementById("marca").value = "";
  document.getElementById("tag").value = "";
  document.getElementById("PO").value = "";
  document.getElementById("RAM").value = "";
  document.getElementById("categoryId").value = "";
  document.getElementById("entidadId").value = "";
  document.getElementById("estadoId").value = "";
  document.getElementById("WWID").value = "";
  document.getElementById("serie2").textContent="Serie: ";
  document.getElementById("marca2").textContent="Marca: ";
  document.getElementById("tag2").textContent="Tag: ";
  document.getElementById("PO2").textContent="PO: ";
  document.getElementById("RAM2").textContent="RAM: ";
  document.getElementById("categoryId2").textContent="Category: ";
  //const estadoSelect = document.getElementById("estadoId");
  document.getElementById("WWID2").textContent="WWID: ";
  document.getElementById("entity2").textContent="Entidad: ";
  document.getElementById("state2").textContent="Estado: ";
}

// Add event listeners
buscarActivoForm.addEventListener("submit", handleSearch);
modifyProductForm.addEventListener("submit", updateActivo);
newActivoButton.addEventListener("click", addNewActivo);
deleteButton.addEventListener("click", deleteActivo);

// Fetch and populate the entidad select options initially
fetchAndPopulateCategorias();
fetchAndPopulateEntidades();
fetchAndPopulateEstados();
