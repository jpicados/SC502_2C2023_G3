<?php
session_start();
require_once "../models/loginModel.php";

class LoginController {
    private $loginModel;

    public function __construct($loginModel) {
        $this->loginModel = $loginModel;
    }

    public function loginUsuario($CorreoUsuario, $Contrasenna) {
        $usuario = $this->loginModel->getUserByEmail($CorreoUsuario);
    
        if ($usuario && $Contrasenna == $usuario['Contrasenna']) {
            // Save user information in the session
            $_SESSION['user_id'] = $usuario['IdUsuario'];
            $_SESSION['user_name'] = $usuario['NombreUsuario'];
            $_SESSION['user_tipo'] = $usuario['Tipo']; // Add this line
    
            echo json_encode(['message' => 'Login correcto']);
        } else {
            echo json_encode(['error' => 'Credenciales incorrectas']);
        }
    }
    public function getSessionData() {
        if (isset($_SESSION['user_id']) && isset($_SESSION['user_name'])) {
            $response = [
                'isLoggedIn' => true,
                'userId' => $_SESSION['user_id'],
                'userName' => $_SESSION['user_name']
            ];
    
            if (isset($_SESSION['user_tipo'])) {
                $response['userTipo'] = $_SESSION['user_tipo'];
            } else {
                $response['userTipo'] = null; // or a default value if necessary
            }
    
            echo json_encode($response);
        } else {
            echo json_encode(['isLoggedIn' => false]);
        }
    }

    public function logoutUsuario() {
            // check if a session is started
        if(session_id() == '' || !isset($_SESSION)) {
            // session isn't started
            session_start();
        }
        // Destroy session
        session_destroy();

        echo json_encode(['message' => 'Logout correcto']);
    }
}

$loginModel = new LoginModel($conn);
$loginController = new LoginController($loginModel);

// Get JSON input data
$data = json_decode(file_get_contents("php://input"), true);

// Check if the action parameter is set
$action = isset($_GET['action']) ? $_GET['action'] : '';

// Perform the corresponding action based on the request
switch ($action) {
    case 'login_usuario':
        $CorreoUsuario = $data['CorreoUsuario'];
        $Contrasenna = $data['Contrasenna'];
        $loginController->loginUsuario($CorreoUsuario, $Contrasenna);
        break;
    case 'logout_usuario':
        $loginController->logoutUsuario();
        break;
    case 'get_session_data':
        $loginController->getSessionData();
        break;
    default:
        echo json_encode(['error' => 'Invalid action']);
}
?>
