<?php
require_once '../server.php';

class CategoriaModel {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function listarCategorias() {
        $sql = "CALL Listar_Categoria()";
        $result = $this->conn->query($sql);

        $categorias = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $categorias[] = $row;
            }

        }

        return $categorias;
    }
}

?>