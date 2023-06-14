<?php
require_once '../server.php';
class EmpleadoModel {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function listar_empleados() {
        $sql = "CALL Listar_empleados()";
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
