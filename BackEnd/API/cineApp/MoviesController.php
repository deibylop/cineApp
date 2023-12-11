<?php
use Firebase\JWT\JWT;
    
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/conection.php';
include_once '../objects/moviesClass.php';

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
                $movies = new Movies($db); 
                $results = $movies->consultarPeliculasDisponibles();
                $token = JWT::encode($results, JWT_KEY,'HS256');
                list($headersB64, $payloadB64, $sig) = explode('.', $token);
                $decoded = json_decode(base64_decode($headersB64), true);

                return json_encode($decoded);
                }
    } catch (Exception $e) {
        return json_encode(array('error' => $e->getMessage()));
    }
}

?>
