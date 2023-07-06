<?php
require_once '../server.php';
class usuarioModel {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function getUsuarios() {
        $sql = "CALL Listar_Usuarios()";
        $consultaUsuarios = $this->conn->query($sql);
        $usuarios = [];
        while ($usuario = $consultaUsuarios->fetch_assoc()) {
          $usuarios[] = $usuario;
        }
    
        return $usuarios;
    }

    public function registrarUsuario($NombreUsuario,$CorreoUsuario,$Contrasenna) {  
        $nombre = $NombreUsuario;
        $correo = $CorreoUsuario;
        $contrasenna = $Contrasenna;
        //se insertan las variables empleado en tabla empleado
        $sql = "CALL Registrar_Usuario('" . $nombre . "','" . $correo . "'," . $contrasenna . ")";
        $this->conn->query($sql);
      }
      public function editarUsuario($id,$NombreUsuario,$CorreoUsuario,$Contrasenna) {  
        $nombre = $NombreUsuario;
        $correo = $CorreoUsuario;
        $contrasenna = $Contrasenna;
        $Id=$id;
        $sql = "CALL Editar_Usuario('" . $nombre . "','" . $correo . "'," . $contrasenna . "," . $Id . ")";
        $this->conn->query($sql);
      }
      public function eliminarUsuario($id){
        $sql = "CALL Eliminar_Usuario(" . $id . ")";
        $this->conn->query($sql);
      }
    }
?>
