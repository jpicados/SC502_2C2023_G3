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
}
?>
