<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/conection.php';
include_once '../objects/salesClass.php';


$postData = file_get_contents("php://input");
$requestData = json_decode($postData, true);

if (isset($requestData['procedure_id'])) {
    $procedureId = $requestData['procedure_id'];

    $params = isset($requestData['params']) ? $requestData['params'] : array();
    $result = callStoredProcedure($procedureId, $params);
    http_response_code(200);
    echo($result);
} else {
    echo json_encode(array('error' => 'Identificador del procedimiento almacenado no válido.'));
}

function callStoredProcedure($procedureId, $params)
{
    $conex = new Conexion();
    $db = $conex->obtenerConexion();

    try {
        switch ($procedureId) {
            case 1:
                $sales = new Sales($db); 
                $results = $sales->consultarHistorialCompras($params['usuario_id']);
                return json_encode($results);

            case 2:
                $sales = new Sales($db); 
                $results = $sales->realizarCompra($params['usuario_id'], $params['pelicula_id'], $params['cantidad']);
                return json_encode(array('success' => $results));

               }
    } catch (Exception $e) {
        return json_encode(array('error' => $e->getMessage()));
    }
}

?>
