<?php
//session_start();  

require_once "../models/usuarioModel.php";

class usuarioController {
    private $usuarioModel;

    public function __construct($usuarioModel) {
        $this->usuarioModel = $usuarioModel;
    }

    public function getUsuarios() {
        header("Content-Type: application/json");
        $usuarios = $this->usuarioModel->getUsuarios();
        echo json_encode(['success' => true, 'data' => $usuarios]);
    }

    public function registrarUsuario($NombreUsuario, $CorreoUsuario, $Contrasenna) {
        header("Content-Type: application/json");
        $success = $this->usuarioModel->registrarUsuario($NombreUsuario, $CorreoUsuario, $Contrasenna);
        if($success) {
            $usuarios = $this->usuarioModel->getUsuarios();
            echo json_encode(['success' => true, 'data' => $usuarios]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to register user']);
        }
    }

    public function editarUsuario($Tipo, $id) {
        header("Content-Type: application/json");
        if ($this->usuarioModel->editarUsuario($Tipo, $id)) {
            //$usuario = $this->usuarioModel->getUsuario($id);
            echo json_encode(['success' => true, 'data' => $Tipo]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to edit user']);
        }
    }

    public function eliminarUsuario($id) {
        header("Content-Type: application/json");
        $success = $this->usuarioModel->eliminarUsuario($id);
        if($success) {
            echo json_encode(['success' => true, 'message' => 'User deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to delete user']);
        }
    }

    public function loginUsuario($CorreoUsuario, $Contrasenna) {
        header("Content-Type: application/json");http://localhost/SC502_2C2023_G3/controllers/usuarioController.php?action=eliminar_usuario
        $usuario = $this->usuarioModel->getUsuarioByEmail($CorreoUsuario);

        if ($usuario && password_verify($Contrasenna, $usuario['Contrasenna'])) {
            $_SESSION['user_id'] = $usuario['IdUsuario'];
            $_SESSION['user_name'] = $usuario['NombreUsuario'];
            echo json_encode(['success' => true, 'message' => 'Login correcto']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas']);
        }
    }

    public function logoutUsuario() {
        header("Content-Type: application/json");
        session_destroy();
        echo json_encode(['success' => true, 'message' => 'Logout correcto']);
    }
}

$model = new usuarioModel($conn);
$controller = new usuarioController($model);

// Get JSON input data
$data = json_decode(file_get_contents("php://input"), true);

// Check if the action parameter is set
$action = isset($_GET['action']) ? $_GET['action'] : '';

// Perform the switch based on the action
switch ($action) {
    case 'get_usuarios':
        // Assuming this doesn't need a POST payload
        $controller->getUsuarios();
        break;

    case 'registrar_usuario':
        if (isset($data['NombreUsuario']) && isset($data['CorreoUsuario']) && isset($data['Contrasenna'])) {
            $NombreUsuario = $data['NombreUsuario'];
            $CorreoUsuario = $data['CorreoUsuario'];
            $Contrasenna = $data['Contrasenna'];
            $controller->registrarUsuario($NombreUsuario, $CorreoUsuario, $Contrasenna);
        } else {
            echo json_encode(['success' => false, 'message' => 'Missing parameters for registration']);
        }
        break;

        case 'editarUsuario':
            if (isset($data['Id']) && isset($data['Tipo'])) {
                $id = (int)$data['Id'];
                $newTipo = (int)$data['Tipo'];
                
                $controller->editarUsuario($newTipo, $id);
            } else {
                echo json_encode(['success' => false, 'message' => 'Missing parameters for editing']);
            }
            break;

    case 'eliminar_usuario':
        if (isset($data['IdUsuario'])) {
            $id = $data['IdUsuario'];
            $controller->eliminarUsuario($id);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid parameters for deleting user']);
        }
        break;
        
    case 'login_usuario':
        if (isset($data['CorreoUsuario']) && isset($data['Contrasenna'])) {
            $CorreoUsuario = $data['CorreoUsuario'];
            $Contrasenna = $data['Contrasenna'];
            $controller->loginUsuario($CorreoUsuario, $Contrasenna);
        } else {
            echo json_encode(['success' => false, 'message' => 'Missing parameters for login']);
        }
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action provided']);
        break;
}

?>
