<?php
use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/conection.php';
include_once '../objects/usersClass.php';


$postData = file_get_contents("php://input");
$requestData = json_decode($postData, true);

if (isset($requestData['procedure_id'])) {
    $procedureId = $requestData['procedure_id'];

    $params = isset($requestData['params']) ? $requestData['params'] : array();
    $result = callStoredProcedure($procedureId, $params);
    http_response_code(200);
    echo($result);
} else {
    http_response_code(400);
    echo json_encode(array('error' => 'Identificador del procedimiento almacenado no válido.'));
}

function callStoredProcedure($procedureId, $params)
{
    $conex = new Conexion();
    $db = $conex->obtenerConexion();

    try {
        switch ($procedureId) {
            case 1:
                $users = new Users($db);
                $hashedPassword = md5($params['password']);
                $results = $users->loginUsuario($params['email'], $hashedPassword);
                if ($results) {
                    $token = JWT::encode($results, JWT_KEY, 'HS256');
                    return json_encode(array("token" => $token,"cod_error"=>200));
                } else {
                    onErrorService();
                }
                break;
            case 2:
                $users = new Users($db); 
                $results = $users->registrarUsuario($params['nombre'], $params['email'], $params['password'],$params['rol_id']);
                return json_encode(array('success' => $results,"cod_error"=>200));

            case 3:
                $users = new Users($db); 
                $results = $users->editarPerfilUsuario($params['usuario_id'], $params['nuevo_nombre'], $params['nuevo_correo'], $params['password']);
                return json_encode(array('success' => $results));
                
        }
    } catch (Exception $e) {
        return json_encode(array('error' => $e->getMessage()));
    }

}

function onErrorService(){
    echo json_encode(array(
        'cod_error' => 400,
    ));
}

?>
