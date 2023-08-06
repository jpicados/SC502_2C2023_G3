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
        $sql = "CALL Registrar_Usuario('" . $nombre . "','" . $correo . "','" . $contrasenna . "')";
        if (!$this->conn->query($sql)) {
          echo "Error: " . $this->conn->error;
          return false;
        }
        return true;
      }
      public function editarusuario($Tipo, $Id) {  
        $tipo = (int)$Tipo; 
        $id = (int)$Id;     
        $sql = "CALL Editar_Usuario('" . $tipo . "','" . $id . "')";
        if (!$this->conn->query($sql)) {
            echo "Error: " . $this->conn->error;
            return false;
        }
        return true;
    }
    public function eliminarUsuario($id){
      $sql = "CALL Eliminar_Usuario(" . $id . ")";
      if ($this->conn->query($sql) === TRUE) {
          return true;
      } else {
          return false;
      }
  }
      
      public function loginUsuario($correo, $contrasenna) {
        $sql = "CALL Login_Usuario('" . $correo . "', '" . $contrasenna . "')";
        $result = $this->conn->query($sql);

        // Check if the login was successful and return the user data if it was
        if ($result->num_rows === 1) {
            $usuario = $result->fetch_assoc();
            return $usuario;
        } else {
            return null; // Return null if login failed
        }
    }
    }
?>
