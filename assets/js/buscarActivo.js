// DOM elements
const buscarActivoForm = document.getElementById("buscarActivoForm");
const scannerInput = document.getElementById("scannerInput");
const activoDetails = document.getElementById("activoDetails");

// Add event listener to form submission
buscarActivoForm.addEventListener("submit", handleSearch);

function handleSearch(event) {
  event.preventDefault();

  const serie = scannerInput.value;

  // Fetch the data from the controller/model using the serie value
  fetch(
    `../controllers/buscarActivoController.php?action=buscarActivo&serie=${serie}`
  )
    .then((response) => response.json())
    .then((data) => {
      // Process the data and populate the activoDetails
      populateForm(data);
    })
    .catch((error) => {
      console.error("Error searching for activo:", error);
    });
}

function populateForm(data) {
  // Clear previous form data
  activoDetails.innerHTML = "";

  // Check if any activos are found
  if (data.length === 0) {
    activoDetails.textContent = "No activo found";
    return;
  }

  // Get the first activo from the data array
  const activo = data[0];

  // Create the form container
  const formContainer = document.createElement("div");
  formContainer.classList.add("activo-form");

  // Create the form
  const form = document.createElement("form");

  // Iterate over the properties of the activo object
  for (const property in activo) {
    const label = document.createElement("label");
    label.textContent = `${property}:`;

    const input = document.createElement("input");
    input.type = "text";
    input.value = activo[property];

    // Append the label and input to the form
    form.appendChild(label);
    form.appendChild(input);
  }

  // Append the form to the form container
  formContainer.appendChild(form);

  // Append the form container to the activoDetails
  activoDetails.appendChild(formContainer);
}
