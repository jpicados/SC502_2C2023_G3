<?php
require_once '../server.php';
class empleadoModel {
    private $conn;
  
    public function __construct($conn) {
      $this->conn = $conn;
    }
  
    public function get_empleados() {
      $sql = "CALL Listar_empleados";
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
      $sql = "CALL Nuevo_Empleado(" . $wwid . ",'" . $nombre . "','". $correo. "')";
      $this->conn->query($sql);
    }
    public function editarEmpleado($id,$NombreEmpleado,$CorreoEmpleado,$WWID) {  
      $nombre = $NombreEmpleado;
      $correo = $CorreoEmpleado;
      $wwid = $WWID;
      $Id=$id;
      //se insertan las variables empleado en tabla empleado
      //update empleado set NombreEmpleado="Johan Precioso",CorreoEmpleado="Nose@gmail.com",WWID=122231 where idEmpleado=189;
      $sql = "CALL Editar_Empleado('" . $nombre . "','" . $correo . "'," . $wwid . ")";
      $this->conn->query($sql);
    }
    public function eliminarEmpleado($id){
      $sql = "CALL Eliminar_Empleado(" . $id . ")";
      $this->conn->query($sql);
    }
  }
    

  
  
  


?>
