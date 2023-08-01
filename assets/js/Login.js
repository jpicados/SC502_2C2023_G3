const $btnSignIn = document.querySelector(".sign-in-btn"),
    $btnSignUp = document.querySelector(".sign-up-btn"),
    $signUp = document.querySelector(".sign-up"),
    $signIn = document.querySelector(".sign-in");

document.addEventListener("click", e => {
    if (e.target === $btnSignIn || e.target === $btnSignUp) {
        $signIn.classList.toggle("active");
        $signUp.classList.toggle("active")
    }


    // ESTO ES PARA EL SESSION

    const loginButton = document.querySelector(".sign-in-btn");
    loginButton.addEventListener("click", () => {
        const email = document.querySelector(".sign-in input[type='email']").value;
        const password = document.querySelector(".sign-in input[type='password']").value;


        // Hace una validacion, si es necesaria

        // Llama el login function con el email y password
        loginUsuario(email, password);
    });

    // Listener para el logout

    const logoutButton = document.querySelector(".sign-out-btn");
    logoutButton.addEventListener("click", () => {

        logoutUsuario();

    });

    async function loginUsuario(email, password) {
        const formElement = document.createElement("form");
        const emailInput = document.createElement("input");
        const passwordInput = document.createElement("input");
        emailInput.name = "CorreoUsuario";
        emailInput.value = email;
        passwordInput.name = "Contrasenna";
        passwordInput.value = password;
        formElement.appendChild(emailInput);
        formElement.appendChild(passwordInput);
        const datos = new FormData(formElement);

        try {
            const respuesta = await fetch(
                "../controllers/usuarioController.php?action=login_usuario",
                {
                    method: "POST",
                    body: datos,
                }
            );

            if (respuesta.ok) {
                const response = await respuesta.json();
                if (response.message === "Login successful") {
                    // si da correcto se redirecciona a activos.html
                    window.location.href = "/activos.html"; 
                } else {
                    Swal.fire({
                        ...swalConfig,
                        icon: "error",
                        title: "Error",
                        text: "Invalid credentials. Please try again.",
                    });
                }
            } else {
                throw new Error("Error in login request");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function logoutUsuario() {
        try {
            const respuesta = await fetch(
                "../controllers/usuarioController.php?action=logout_usuario",
                {
                    method: "POST",
                }
            );

            if (respuesta.ok) {
                const response = await respuesta.json();
                if (response.message === "Logout successful") {
                    
                    window.location.href = "/login.html"; 
                }
            } else {
                throw new Error("Error in logout request");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

});
