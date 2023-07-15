<?php
require_once "../models/activoModel.php";
// require_once "../server.php";

class ActivoController {
    private $activoModel;

    public function __construct($activoModel) {
        $this->activoModel = $activoModel;
   
    }

    public function getActivos() {
        $data = $this->activoModel->listarActivos();
        header("Content-Type: application/json");
        echo json_encode($data);
    
    }

    public function buscarActivo($serie) {
        $data = $this->activoModel->buscarActivo($serie);
        header("Content-Type: application/json");
        echo json_encode($data);
    
    }

    /* Eliminar activo cambiar a ID?*/
    public function EliminarActivo($serie) {
        $this->ActivoModel->EliminarActivo($serie);
        header("Content-Type: application/json");
        echo json_encode(['message' => 'Activo eliminado con éxito']);
    
    }

public function EliminarActivoSerie($serie) {
        $this->ActivoModel->EliminarActivoSerie($serie);
        header("Content-Type: application/json");
        echo json_encode(['message' => 'Activo Serie eliminado con éxito']);
    
    }
/*Revisar */
    public function NuevoActivo($Serie, $Marca, $Tag, $PO, $RAM, $IdCategoria, $IdEntidad,$IdEstado, $IdEmpleado) {
        $this->ActivoModel->NuevoActivo($Serie, $Marca, $Tag, $PO, $RAM, $IdCategoria, $IdEntidad,$IdEstado, $IdEmpleado);
        header("Content-Type: application/json");
        $data = $this->empleadoModel->listarActivos();
        echo json_encode($data);

}

public function ModificarActivoSerie($id, $NombreEmpleado, $CorreoEmpleado, $WWID) {
    if ($this->empleadoModel->ModificarActivoSerie($id, $NombreEmpleado, $CorreoEmpleado, $WWID)) {
        $data = $this->empleadoModel->listarActivos($id);
        header("Content-Type: application/json");
        echo json_encode($data);
    } else {
        echo json_encode(['error' => 'fallo al modificiar el activo serie']);
    }
}

// Create an instance of the ActivoModel and ActivoController
$model = new ActivoModel($conn);
$controller = new ActivoController($model);

// Determine the action to perform based on the 'action' query parameter
$action = $_GET['action'] ?? '';
switch ($action) {
    case 'get_activos':
        $controller->getActivos();
        break;
    case 'buscar_activo':
        $serie = $_GET['serie'] ?? '';
        $controller->buscarActivo($serie);
        break;
    default:
        // Invalid action
        if (!empty($action) && method_exists($controller, $action)) {
            // Dynamic method invocation for custom actions
            $controller->{$action}();
        } else {
            echo json_encode(["error" => "Invalid action"]);
        }
        break;
}
}
?>
