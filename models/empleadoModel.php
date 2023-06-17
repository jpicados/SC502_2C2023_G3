<?php
require_once '../server.php';
class empleadoModel{
    private $conn;
    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function get_empleados() {
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
   

    public function nuevoEmpleado($nombre,$correo,$wwid){
        //$empleado = json_decode(file_get_contents("php://input"));

        // Acceder a las propiedades del usuario
        //$nombre = $empleado->nombre;
        //$correo = $empleado->apellido;
        //$wwid = $empleado->cedula;

        try{
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql =$this->conn->prepare("INSERT INTO empleado (nombre, correo, wwid) VALUES (:nombre, :correo, :wwid)");
            $this->conn->query($sql);
            $sql->bindParam(":nombre", $nombre);
            $sql->bindParam(":correo", $correo);
            $sql->bindParam(":wwid", $wwid);
            $sql-> execute();
            $responde= "se envio correctamente";
        }catch (PDOException $e){
            $responde ="no se envio correctamente";
        }

        header("Content-Type: application/json". $e->getMessage());
        echo json_encode($responde);
    }
}
/*

*/
?>
