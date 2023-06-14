<?php
require_once '../server.php';
class empleadoModel{
    private $conn;
    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function listarEmpleados() {
        $sql = "select * from empleado";
        $consultaEmpleados = $this->conn->query($sql);

        $empleados = [];
        if ($consultaEmpleados->num_rows > 0) {//Translada la consulta de empleados y la cantidad hasta que ya no hayan 
            while ($empleado = $consultaEmpleados->fetch_assoc()) {
        $empleados[] = $empleado;
    }
}

        return $empleados;
    }
}

?>