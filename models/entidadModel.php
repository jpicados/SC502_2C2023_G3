<?php
require_once '../server.php';

class EntidadModel {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function listarEntidades() {
        $sql = "CALL Listar_Entidad()";
        $result = $this->conn->query($sql);

        $entidades = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $entidades[] = $row;
            }

        }

        return $entidades;
    }
}

?>