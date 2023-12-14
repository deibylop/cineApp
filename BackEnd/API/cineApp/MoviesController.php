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
    echo ($result);
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
                $results = $movies->getAllMovies();
                return json_encode($results);
            case 2:
                $movies = new Movies($db);
                $results = $movies->getAllSalas();
                return json_encode($results);
            case 3:
                $movies = new Movies($db);
                $results = $movies->getAllHorarios($params['id']);
                return json_encode($results);
            case 4:
                $movies = new Movies($db);
                $results = $movies->getAllAsientos();
                return json_encode($results);
            case 5:
                $movies = new Movies($db);
                $results = $movies->getAllGeneros();
                return json_encode($results);
            case 6:
                $movies = new Movies($db);
                $results = $movies->insertNewMovie($params['titulo'], $params['descripcion'], $params['genero'], $params['fecha'], $params['movieImg']);
                return json_encode(array("cod_error" => 200));
            case 7:
                $movies = new Movies($db);
                $results = $movies->udpateMovie($params['id'], $params['titulo'], $params['descripcion'], $params['genero'], $params['fecha'], $params['movieImg'], $params['status']);
                return json_encode(array("cod_error" => 200));
            case 8:
                $movies = new Movies($db);
                $results = $movies->deleteMovie($params['id']);
                return json_encode(array("cod_error" => 200));
            case 9:
                $movies = new Movies($db);
                $results = $movies->getAllHorarios($params['id']);
                return json_encode(array("Data" => $results));
            case 10:
                $movies = new Movies($db);
                $results = $movies->getCurrentSala($params['id']);
                return json_encode(array("Data" => $results));
            case 11:
                $movies = new Movies($db);
                $results = $movies->paymentService(
                    $params['billingAddress'],
                    $params['aptSuite'],
                    $params['zipCode'],
                    $params['provincia'],
                    $params['cardName'],
                    $params['cardNumber'],
                    $params['expirationDate'],
                    $params['cvvCode'],
                    $params['movie'],
                    $params['asientos'],
                    $params['amount']
                );
                return json_encode(array("Data" => $results,"cod_error" => 200));
        }
    } catch (Exception $e) {
        return json_encode(array('error' => $e->getMessage()));
    }
}
