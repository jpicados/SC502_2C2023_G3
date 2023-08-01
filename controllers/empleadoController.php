<?php
require_once "../models/empleadoModel.php";

class empleadoController{
    private $empleadoModel;

    public function __construct($empleadoModel) {
        $this->empleadoModel = $empleadoModel;
    }

    public function get_empleados() {
        $empleados = $this->empleadoModel->get_empleados();
        header("Content-Type: application/json");
        echo json_encode($empleados);
    }

    public function solicitudEmpleados($NombreEmpleado, $CorreoEmpleado, $WWID) {
        $this->empleadoModel->nuevoEmpleado($NombreEmpleado, $CorreoEmpleado, $WWID);
        header("Content-Type: application/json");
        $empleados = $this->empleadoModel->get_empleados();
        echo json_encode($empleados);
    }

    public function editarEmpleados($id, $NombreEmpleado, $CorreoEmpleado, $WWID) {
        if ($this->empleadoModel->editarEmpleado($id, $NombreEmpleado, $CorreoEmpleado, $WWID)) {
            $empleado = $this->empleadoModel->get_empleado($id);
            header("Content-Type: application/json");
            echo json_encode($empleado);
        } else {
            echo json_encode(['error' => 'Failed to edit employee']);
        }
    }

    public function eliminarEmpleado($id) {
        $this->empleadoModel->eliminarEmpleado($id);
        header("Content-Type: application/json");
        echo json_encode(['message' => 'Empleado eliminado con éxito']);
    }
}

$model = new empleadoModel($conn);
$controller = new empleadoController($model);

// Check if the action parameter is set
$action = isset($_GET['action']) ? $_GET['action'] : '';

// Perform the switch based on the action
switch ($action) {
    case 'get_empleados':
        // Get employees and return the response
        $controller->get_empleados();
        break;
        
    case 'solicitud_empleados':
        $postData = $_POST;
        if (isset($postData['NombreEmpleado']) && isset($postData['CorreoEmpleado']) && isset($postData['WWID'])) {
            $NombreEmpleado = $postData['NombreEmpleado'];
            $CorreoEmpleado = $postData['CorreoEmpleado'];
            $WWID = $postData['WWID'];
            $controller->solicitudEmpleados($NombreEmpleado, $CorreoEmpleado, $WWID);
        }
        break;
        
    case 'editar_empleados':
        $postData = $_POST;
        if (isset($postData['editId']) && isset($postData['editNombre']) && isset($postData['editCorreo']) && isset($postData['editWwid'])) {
            $NombreEmpleado = $postData['editNombre'];
            $CorreoEmpleado = $postData['editCorreo'];
            $WWID = $postData['editWwid'];
            $id = $postData['editId'];
            $controller->editarEmpleados($id, $NombreEmpleado, $CorreoEmpleado, $WWID);
        } else {
            echo json_encode(['error' => 'Invalid parameters for editing employee']);
        }
        break;
        
    case 'eliminar_empleado':
        $postData = $_POST;
        if (isset($postData['idEmpleado']) && $postData['idEmpleado'] != '') {
            $id = $postData['idEmpleado'];
            $controller->eliminarEmpleado($id);
        }
        break;
        
    default:
        // Handle unknown action or no action provided
        // Return an appropriate response or error message
        break;
}
?>
