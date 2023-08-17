<?php
session_start();
require_once "../models/loginModel.php";

class LoginController {

    public $first_login=0;
    private $loginModel;

    public function __construct($loginModel) {
        $this->loginModel = $loginModel;
    }

    public function loginUsuario($CorreoUsuario, $Contrasenna) {
        $usuario = $this->loginModel->getUserByEmail($CorreoUsuario);
    
        if ($usuario && $Contrasenna == $usuario['Contrasenna']) {
            // Guardar la información del usuario en la sesión
            $_SESSION['user_id'] = $usuario['IdUsuario'];
            $_SESSION['user_name'] = $usuario['NombreUsuario'];
            $_SESSION['user_tipo'] = $usuario['Tipo'];
            $_SESSION['firstLogin']=0;
    
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
                'userName' => $_SESSION['user_name'],
                'firstLogin'=> $_SESSION['firstLogin']
            ];
            
    
            if (isset($_SESSION['user_tipo'])) {
                $response['userTipo'] = $_SESSION['user_tipo'];
                
            } else {
                $response['userTipo'] = null;
                
            }
    
            echo json_encode($response);
            
        } else {
            echo json_encode(['isLoggedIn' => false]);
        }
        $_SESSION['firstLogin']+=1;
    }

    public function logoutUsuario() {
            // verificar si se ha iniciado una sesión
        if(session_id() == '' || !isset($_SESSION)) {
            // la sesión no está iniciada
            session_start();
        }
        // Destruye la sesión
        session_destroy();
        $_SESSION['firstLogin']=0;

        echo json_encode(['message' => 'Logout correcto']);
    }
}

$loginModel = new LoginModel($conn);
$loginController = new LoginController($loginModel);

// Obtiene datos de entrada JSON
$data = json_decode(file_get_contents("php://input"), true);

// Verifica si el parámetro de acción está configurado
$action = isset($_GET['action']) ? $_GET['action'] : '';

// Realiza la acción correspondiente según la solicitud
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
