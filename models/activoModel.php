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

        $data = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }
        return $data;
    }

    public function buscarActivo($codigoActivo) {
        $stmt = $this->conn->prepare("CALL Buscar_Activo(?)");
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
}
?>
