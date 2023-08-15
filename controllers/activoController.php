<?php
require_once "../models/activoModel.php";
// require_once "../server.php";

class ActivoController {
    private $activoModel;

    public function __construct($activoModel) {
        $this->activoModel = $activoModel;
   
    }

    public function getActivos() {
        $activos = $this->activoModel->listarActivos();
        header("Content-Type: application/json");
        echo json_encode($activos);
    
    }
    public function listarbitacora() {
        $bitacoras = $this->activoModel->listarbitacora();
        header("Content-Type: application/json");
        echo json_encode($bitacoras);
    
    }

    public function buscarActivo($serie) {
        $activo = $this->activoModel->buscarActivo($serie);
        header("Content-Type: application/json");
        echo json_encode($activo);
    
    }

    

    public function EliminarActivo($serie) {
        $this->activoModel->EliminarActivo($serie);
        header("Content-Type: application/json");
        echo json_encode(['message' => 'Activo Serie eliminado con éxito']);
    
    }
    public function NuevoActivo($Serie, $Marca, $Tag, $PO, $RAM, $IdCategoria, $IdEntidad, $IdEstado, $WWID) {
        $this->activoModel->NuevoActivo($Serie, $Marca, $Tag, $PO, $RAM, $IdCategoria, $IdEntidad, $IdEstado, $WWID);
        header("Content-Type: application/json");
        echo json_encode(['message' => 'Asset added successfully']);
    }

    public function modificarActivo($Serie, $Marca, $Tag, $PO, $RAM, $IdCategoria, $IdEntidad, $IdEstado, $WWID) {
        $success = $this->activoModel->ModificarActivoSerie($Serie, $Marca, $Tag, $PO, $RAM, $IdCategoria, $IdEntidad, $IdEstado, $WWID);
        if ($success) {
            // La modificación fue exitosa
            http_response_code(200);
            echo json_encode(['message' => 'Asset modified successfully']);
        } else {
            // La modificación fallo
            http_response_code(500);
            echo json_encode(['error' => 'Failed to modify asset']);
        }
    }
    public function registerBitacora() {
        $json = file_get_contents('php://input');
        $postData = json_decode($json, true);

        if (isset($postData['Accion']) && isset($postData['Serie']) && isset($postData['IdUsuario'])) {
            $accion = $postData['Accion'];
            $serie = $postData['Serie'];
            $idUsuario = $postData['IdUsuario'];
            $this->activoModel->registrarBitacora($accion, $serie, $idUsuario);
        }
    }
}
// Crear una instancia del ActivoModel y ActivoController
$model = new ActivoModel($conn);
$controller = new ActivoController($model);

// Determinar la acción a realizar basada en el parámetro de consulta 'action'
$action = isset($_GET['action']) ? $_GET['action'] : '';
switch ($action) {
    case 'getActivos':
        $controller->getActivos();
        break;
    case 'listarbitacora':
        $controller->listarbitacora();
        break;
    case 'buscar_activo':
        $serie = $_GET['serie'] ?? '';
        $controller->buscarActivo($serie);
        break;
    case 'EliminarActivo':
        $serie = $_GET['serie'] ?? '';
        $controller->EliminarActivo($serie);
    break;
    case 'modificar_activo':
        $postData = json_decode(file_get_contents('php://input'), true);
        if (
            isset($postData['Serie']) &&
            isset($postData['Marca']) &&
            isset($postData['Tag']) &&
            isset($postData['PO']) &&
            isset($postData['RAM']) &&
            isset($postData['IdCategoria']) &&
            isset($postData['IdEntidad']) &&
            isset($postData['IdEstado']) &&
            isset($postData['WWID'])
        ) {
            $serie = $postData['Serie'];
            $marca = $postData['Marca'];
            $tag = $postData['Tag'];
            $po = $postData['PO'];
            $ram = $postData['RAM'];
            $idCategoria = $postData['IdCategoria'];
            $idEntidad = $postData['IdEntidad'];
            $idEstado = $postData['IdEstado'];
            $WWID = $postData['WWID'];
            $controller->modificarActivo($serie, $marca, $tag, $po, $ram, $idCategoria, $idEntidad, $idEstado, $WWID);
        } else {
            echo json_encode(['error' => 'Invalid parameters for modifying asset']);
        }
    break;
    
    case 'nuevo_activo':
        $postData = json_decode(file_get_contents('php://input'), true);
        if (
            isset($postData['Serie']) &&
            isset($postData['Marca']) &&
            isset($postData['Tag']) &&
            isset($postData['PO']) &&
            isset($postData['RAM']) &&
            isset($postData['IdCategoria']) &&
            isset($postData['IdEntidad']) &&
            isset($postData['IdEstado']) &&
            isset($postData['WWID'])
        ) {
            $serie = $postData['Serie'];
            $marca = $postData['Marca'];
            $tag = $postData['Tag'];
            $po = $postData['PO'];
            $ram = $postData['RAM'];
            $idCategoria = $postData['IdCategoria'];
            $idEntidad = $postData['IdEntidad'];
            $idEstado = $postData['IdEstado'];
            $WWID = $postData['WWID'];
            $controller->NuevoActivo($serie, $marca, $tag, $po, $ram, $idCategoria, $idEntidad, $idEstado, $WWID);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid parameters for adding asset']);
        }
        break;
        case 'registerBitacora':
            $controller->registerBitacora();
            break;
    break;
    default:
        // Acción inválida
        if (!empty($action) && method_exists($controller, $action)) {
            // Invocación de método dinámico para acciones personalizadas
            $controller->{$action}();
        } else {
            echo json_encode(["error" => "Invalid action"]);
        }
        break;
}

?>
