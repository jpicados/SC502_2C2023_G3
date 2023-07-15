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

    public function NuevoActivo($Serie, $Marca, $Tag, $PO, $RAM, $IdCategoria, $IdEntidad,$IdEstado, $IdEmpleado){  
        $serie = $Serie
         $marca = $Marca
          $tag = $Tag
           $po = $Po
            $ram = $RAM
             $idcategoria = $IdCategoria
              $identidad = $IdEntidad
              $idestado = $IdEstado
        $idempleado = 
   }

    public function EliminarActivo($id){
        $sql = "CALL Eliminar_ActivoId(" . $id . ")";
        $this->conn->query($sql);
      }

      public function EliminarActivoSerie($serie){
        $sql = "CALL Eliminar_ActivoSerie(" . $serie . ")";
        $this->conn->query($sql);
      }

        public function ModificarActivoSerie($Marca,$Tag,$PO,$RAM,
        $IdCategoria,$IdEntidad,$IdEstado,$IdEmpleado){
            $marca = $Marca
            $tag = $Tag
            $po =$PO
            $ram = $RAM
            $idcategoria = $IdCategoria
            $identidad = $IdEntidad
            $idestado = $IdEstado
            $idempleado = $IdEmpleado

            $sql = "Modificar_ActivoSerie
            ('" . $Marca . "','" . $Tag . "',
            " . $PO . "," . $RAM . "," . $IdCategoria . ",
            " . $IdEntidad . "," . $IdCategoria . ",
            " . $IdEstado . "," . $IdEmpleado . ")";
            $this->conn->query($sql);
            
        }

    }

?>

