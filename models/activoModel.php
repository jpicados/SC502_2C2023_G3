<?php
require_once '../server.php';

class ActivoModel {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function listarActivos() {
        $sql = "CALL Listar_Activos()";
        $result = $this->conn->query($sql);

        $activos = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $activos[] = $row;
            }

        }

        return $activos;
    }
    public function listarBitacora() {
        $sql = "CALL Listar_Bitacora()";
        $result = $this->conn->query($sql);

        $bitacora = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $bitacora[] = $row;
            }

        }

        return $bitacora;
    }

    public function buscarActivo($codigoActivo) {
        $stmt = $this->conn->prepare("CALL Buscar_ActivoSerie(?)");
        $stmt->bind_param("s", $codigoActivo);
        $stmt->execute();
        $result = $stmt->get_result();

        $data = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }

        }

        $stmt->close();
        return $data;
    }

    public function NuevoActivo($Serie, $Marca, $Tag, $PO, $RAM, $IdCategoria, $IdEntidad, $IdEstado, $WWID) {
        $sql = "CALL Nuevo_Activo(?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("sssssiisi", $Serie, $Marca, $Tag, $PO, $RAM, $IdCategoria, $IdEntidad, $IdEstado, $WWID);
    
        if ($stmt->execute()) {
            $stmt->close();
            return true;
        } else {
            $error = $stmt->error;
            $stmt->close();
            error_log("Error executing stored procedure: " . $error);
            return false;
        }
    }

    public function EliminarActivo($serie) {
        $sql = "CALL Eliminar_ActivoSerie(?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $serie);
    
        if ($stmt->execute()) {
            $stmt->close();
            return true;
        } else {
            $error = $stmt->error;
            $stmt->close();
            error_log("Error executing stored procedure: " . $error);
            return false;
        }
    }

      
    public function ModificarActivoSerie($Serie, $Marca, $Tag, $PO, $RAM, $IdCategoria, $IdEntidad, $IdEstado, $WWID) {  
        $sql = "CALL Modificar_ActivoSerie(?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("sssssiisi", $Serie, $Marca, $Tag, $PO, $RAM, $IdCategoria, $IdEntidad, $IdEstado, $WWID);
    
        if ($stmt->execute()) {
            $stmt->close();
            return true;
        } else {
            $error = $stmt->error;
            $stmt->close();
            error_log("Error executing stored procedure: " . $error);
            return false;
        }
    }
    public function registrarBitacora($accion, $serie, $idUsuario) {
        $sql = "CALL Registrar_Bitacora(?, ?, ?)";
        $stmt = $this->conn->prepare($sql);

        // Bind the parameters
        $stmt->bind_param('ssi', $accion, $serie, $idUsuario);

        // Execute the query
        $stmt->execute();

        // Check for errors
        if ($stmt->error) {
            return array("status" => "error", "message" => $stmt->error);
        } else {
            return array("status" => "success", "message" => "Bitacora record successfully registered");
        }
    }


    }

?>

