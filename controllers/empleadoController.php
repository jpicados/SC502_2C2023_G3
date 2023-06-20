<?php
require_once "../models/empleadoModel.php";
require_once "../server.php";

class empleadoController {
   
    private $empleadoModel;


    public function __construct($empleadoModel) {
        $this->empleadoModel = $empleadoModel;
    }

    public function get_empleados() {
        $empleados = $this->empleadoModel->get_empleados();

        // Send the response as JSON
        header("Content-Type: application/json");
        echo json_encode($empleados);
    }

    public function solicitudEmpleados() {
        //se decodifica el json de entrada
        $empleado = json_decode(file_get_contents("php://input"));
        //se llama a empleado model para obtener su funcion nuevo empleado, se le pasa el empleado decodificado
        $this->empleadoModel->nuevoEmpleado($empleado);
        header("Content-Type: application/json");
        //se vuelven a obtener los empleados para actualizar
        $empleados = $this->empleadoModel->get_empleados();
        
        echo json_encode($empleados);
    }
    public function eliminarEmpleado(){
        $id = json_decode(file_get_contents("php://input"));
        $this->empleadoModel->eliminarEmpleado($id);
        header("Content-Type: application/json");
        echo json_encode($id);
    }
    
        
}
    // Create an instance of the EmpleadoModel and EmpleadoController
    $model = new empleadoModel($conn);
    $controller = new empleadoController($model);


if ($_SERVER["REQUEST_METHOD"] === "GET") {
    // Llamar a la función get_empleados para generar la salida de los empleados cuando el servidor tenga 
    // una solicitud tipo GET
    $controller->get_empleados();
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
        
        // Llamar a la función solicitudEmpleados() para procesar el formulario de enviar empleados
        $controller->solicitudEmpleados();
        $controller->eliminarEmpleado();
    
}



?>

