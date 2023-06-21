<?php
require_once '../server.php';
class empleadoModel {
    private $conn;
  
    public function __construct($conn) {
      $this->conn = $conn;
    }
  
    public function get_empleados() {
      $sql = "SELECT * FROM empleado";
      $consultaEmpleados = $this->conn->query($sql);
      $empleados = [];
      while ($empleado = $consultaEmpleados->fetch_assoc()) {
        $empleados[] = $empleado;
      }
  
      return $empleados;
    }
  
    public function nuevoEmpleado($NombreEmpleado,$CorreoEmpleado,$WWID) {  
      $nombre = $NombreEmpleado;
      $correo = $CorreoEmpleado;
      $wwid = $WWID;
      //se insertan las variables empleado en tabla empleado
      $sql = "INSERT INTO empleado (NombreEmpleado, CorreoEmpleado, WWID) VALUES ('" . $nombre . "','" . $correo . "'," . $wwid . ")";;
      $this->conn->query($sql);
    }
    public function editarEmpleado($id,$NombreEmpleado,$CorreoEmpleado,$WWID) {  
      $nombre = $NombreEmpleado;
      $correo = $CorreoEmpleado;
      $wwid = $WWID;
      $Id=$id;
      //se insertan las variables empleado en tabla empleado
      //update empleado set NombreEmpleado="Johan Precioso",CorreoEmpleado="Nose@gmail.com",WWID=122231 where idEmpleado=189;
      $sql = "update empleado set NombreEmpleado='".$nombre."',CorreoEmpleado='".$correo."',WWID=".$wwid." where idEmpleado='".$Id."';";;
      $this->conn->query($sql);
    }
    public function eliminarEmpleado($id){
      $sql="delete from empleado WHERE IdEmpleado=".$id.";";
      $this->conn->query($sql);
    }
  }
    

  
  
  


?>
