<?php
require_once '../server.php';

class EstadoModel {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function listarEstados() {
        $sql = "CALL Listar_Estado()";
        $result = $this->conn->query($sql);

        $estados = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $estados[] = $row;
            }
        }
        return $estados;
    }
}

?>