<?php
session_start(); // Para lo del inicio de Session 

require_once "../models/usuarioModel.php";

class usuarioController {
    private $usuarioModel;

    public function __construct($usuarioModel) {
        $this->usuarioModel = $usuarioModel;
    }

    public function getUsuarios() {
        $usuarios = $this->usuarioModel->getUsuarios();
        header("Content-Type: application/json");
        echo json_encode($usuarios);
    }

    public function registrarUsuario($NombreUsuario, $CorreoUsuario, $Contrasenna) {
        $this->usuarioModel->registrarUsuario($NombreUsuario, $CorreoUsuario, $Contrasenna);
        header("Content-Type: application/json");
        $usuarios = $this->usuarioModel->getUsuarios();
        echo json_encode($usuarios);
    }

    public function editarUsuario($id, $NombreUsuario, $CorreoUsuario, $Contrasenna) {
        if ($this->usuarioModel->editarUsuario($id, $NombreUsuario, $CorreoUsuario, $Contrasenna)) {
            $usuario = $this->usuarioModel->getUsuario($id);
            header("Content-Type: application/json");
            echo json_encode($usuario);
        } else {
            echo json_encode(['error' => 'Failed to edit user']);
        }
    }

    public function eliminarUsuario($id) {
        $this->usuarioModel->eliminarUsuario($id);
        header("Content-Type: application/json");
        echo json_encode(['message' => 'User deleted successfully']);
    }

    public function loginUsuario($CorreoUsuario, $Contrasenna) {
        $usuario = $this->usuarioModel->getUsuarioByEmail($CorreoUsuario);

        if ($usuario && password_verify($Contrasenna, $usuario['Contrasenna'])) {
            // Guardar informacion de la session
            $_SESSION['user_id'] = $usuario['IdUsuario'];
            $_SESSION['user_name'] = $usuario['NombreUsuario'];

            // Mensaje de si se pudo loggear successfully o no
            echo json_encode(['message' => 'Login correcto']);
        } else {
            echo json_encode(['error' => 'Credenciales incorrectas']);
        }
    }

    public function logoutUsuario() {
        // Para destruir la session
        session_destroy();
        echo json_encode(['message' => 'Logout correcto']);
    }
}

$model = new usuarioModel($conn);
$controller = new usuarioController($model);

// Check if the action parameter is set
$action = isset($_GET['action']) ? $_GET['action'] : '';

// Perform the switch based on the action
switch ($action) {
    case 'get_usuarios':
        // Get users and return the response
        $controller->getUsuarios();
        break;

    case 'registrar_usuario':
        $postData = $_POST;
        if (isset($postData['NombreUsuario']) && isset($postData['CorreoUsuario']) && isset($postData['Contrasenna'])) {
            $NombreUsuario = $postData['NombreUsuario'];
            $CorreoUsuario = $postData['CorreoUsuario'];
            $Contrasenna = $postData['Contrasenna'];
            $controller->registrarUsuario($NombreUsuario, $CorreoUsuario, $Contrasenna);
        }
        break;

    case 'editar_usuario':
        $postData = $_POST;
        if (isset($postData['editId']) && isset($postData['editNombre']) && isset($postData['editCorreo']) && isset($postData['editContrasenna'])) {
            $NombreUsuario = $postData['editNombre'];
            $CorreoUsuario = $postData['editCorreo'];
            $Contrasenna = $postData['editContrasenna'];
            $id = $postData['editId'];
            $controller->editarUsuario($id, $NombreUsuario, $CorreoUsuario, $Contrasenna);
        } else {
            echo json_encode(['error' => 'Invalid parameters for editing user']);
        }
        break;

    case 'eliminar_usuario':
        $postData = $_POST;
        if (isset($postData['idUsuario']) && $postData['idUsuario'] != '') {
            $id = $postData['idUsuario'];
            $controller->eliminarUsuario($id);
        }
        break;

    default:
        // Handle unknown action or no action provided
        // Return an appropriate response or error message
        break;
}
?>
