<?php
require_once "../models/empleadoModel.php";
//require_once "../server.php";

class empleadoController {
    private $empleadoModel;

    public function __construct($empleadoModel) {
        $this->empleadoModel = $empleadoModel;
    }

    public function get_empleados() {
        $empleados = $this->empleadoModel->get_empleados();
        header("Content-Type: application/json");
        // Envia la respuesta al js tipo json
        echo json_encode($empleados);
    }

    public function solicitudEmpleados($NombreEmpleado,$CorreoEmpleado,$WWID) {
        //se llama a empleado model para obtener su funcion nuevoempleado y se agregan los parametros obtenidos por metodo $_POST
        $this->empleadoModel->nuevoEmpleado($NombreEmpleado,$CorreoEmpleado,$WWID);
        header("Content-Type: application/json");
        //se vuelven a obtener los empleados para actualizar
        $empleados = $this->empleadoModel->get_empleados();
        echo json_encode($empleados);
    }
    public function editarEmpleados($id,$NombreEmpleado,$CorreoEmpleado,$WWID) {
        //se llama a empleado model para obtener su funcion nuevoempleado y se agregan los parametros obtenidos por metodo $_POST
        $this->empleadoModel->editarEmpleado($id,$NombreEmpleado,$CorreoEmpleado,$WWID);
        header("Content-Type: application/json");
        //se vuelven a obtener los empleados para actualizar
        $empleados = $this->empleadoModel->get_empleados();
        echo json_encode($empleados);
    }
    public function eliminarEmpleado($id){
        $this->empleadoModel->eliminarEmpleado($id);
        header("Content-Type: application/json");
        echo json_encode($id);
    }
}
    // Se crea las instancias del modelo y del controlador.
    $model = new empleadoModel($conn);
    $controller = new empleadoController($model);

/* ---Llamar a la función get_empleados para generar la salida 
de los empleados cuando el servidor tenga una solicitud tipo GET---*/
    if ($_SERVER["REQUEST_METHOD"] === "GET") {
        $controller->get_empleados();
//---Si la solicitud es tipo POST ejectua esta sentencia:
    } elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
//---isset nos retorna si la variable existe, de lo contrario retorna false
        if (isset($_POST['idEmpleado']) && $_POST['idEmpleado'] != '') {
            $id = $_POST['idEmpleado'];
            $controller->eliminarEmpleado($id);
        } elseif (isset($_POST['NombreEmpleado']) && isset($_POST['CorreoEmpleado']) && isset($_POST['WWID'])) {
            $NombreEmpleado = $_POST['NombreEmpleado'];
            $CorreoEmpleado = $_POST['CorreoEmpleado'];
            $WWID = $_POST['WWID'];
            $controller->solicitudEmpleados($NombreEmpleado, $CorreoEmpleado, $WWID);
        }
        elseif (isset($_POST['editId']) && isset($_POST['editNombre']) && isset($_POST['editCorreo'] ) && isset($_POST['editWwid'] )) {
            $NombreEmpleado = $_POST['editNombre'];
            $CorreoEmpleado = $_POST['editCorreo'];
            $WWID = $_POST['editWwid'];
            $id=$_POST['editId'];
            $controller->editarEmpleados($id,$NombreEmpleado, $CorreoEmpleado, $WWID);
        }
    }

?>

