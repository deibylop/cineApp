<?php

class Movies
{
    protected $_db;

    public function __construct($db)
    {
        $this->_db = $db;
    }


    // Consultar películas disponibles
    public function getAllMovies()
    {
        $instruccion = "CALL sp_get_all_movies()";
        $consulta = $this->_db->query($instruccion);
        $resultado = $consulta->fetch_all(MYSQLI_ASSOC);
        return $resultado;
    }

    public function getAllAsientos()
    {
        $instruccion = "CALL sp_get_all_asientos()";
        $consulta = $this->_db->query($instruccion);
        $resultado = $consulta->fetch_all(MYSQLI_ASSOC);
        return $resultado;
    }
    public function getAllHorarios($id)
    {
        $instruccion = "CALL sp_get_available_horarios('$id')";
        $consulta = $this->_db->query($instruccion);
        $resultado = $consulta->fetch_all(MYSQLI_ASSOC);
        return $resultado;
    }
    public function getAllSalas()
    {
        $instruccion = "CALL sp_get_all_salas()";
        $consulta = $this->_db->query($instruccion);
        $resultado = $consulta->fetch_all(MYSQLI_ASSOC);
        return $resultado;
    }
    public function getAllGeneros()
    {
        $instruccion = "CALL sp_get_all_generos()";
        $consulta = $this->_db->query($instruccion);
        $resultado = $consulta->fetch_all(MYSQLI_ASSOC);
        return $resultado;
    }
    public function insertNewMovie($titulo, $descripcion, $genero, $fecha_estreno, $url_imagen)
    {
        $stmt = $this->_db->prepare("CALL sp_insertar_pelicula(?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $titulo, $descripcion, $genero, $fecha_estreno, $url_imagen);
        $stmt->execute();
        $stmt->close();
        return 200;
    }

    public function udpateMovie($id, $titulo, $descripcion, $genero, $fecha_estreno, $url_imagen, $status)
    {
        $stmt = $this->_db->prepare("CALL sp_UpdateMovie(?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("isssssi", $id, $titulo, $descripcion, $genero, $fecha_estreno, $url_imagen, $status);
        $stmt->execute();
        $stmt->close();
        return 200;
    }
    public function deleteMovie($id)
    {
        $stmt = $this->_db->prepare("CALL sp_deleteMovie(?)");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->close();
        return 200;
    }
    public function getCurrentSala($id)
    {
        $instruccion = "CALL sp_obtener_asientos_sala('$id')";
        $consulta = $this->_db->query($instruccion);
        $resultado = $consulta->fetch_all(MYSQLI_ASSOC);
        return $resultado;
    }

    public function paymentService(
        $billingAddress,
        $aptSuite,
        $zipCode,
        $provincia,
        $cardName,
        $cardNumber,
        $expirationDate,
        $cvvCode,
        $movie,
        $asientos,
        $amount
    ) {
        $pay = $this->newPayment(
            $cardName,
            $cardNumber,
            $expirationDate,
            $cvvCode,
            $amount
        );
        if ($pay  == 200) {
            foreach ($asientos as $asientoId) {
                $stmt = $this->_db->prepare("CALL sp_update_asiento_asignado(?)");
                $stmt->bind_param("i", $asientoId);
                $stmt->execute();
                $stmt->close();
                return 200;
            }
           
        }
    }

    public function newPayment(
        $cardName,
        $cardNumber,
        $expirationDate,
        $cvvCode,
        $amount
    ) {
        // $openpayApiKey = 'sk_84d6ffb83e8b4566b9a766082ddfd4bf';
        // $openpayMerchantId = 'mcnmfuqnixizxv9rbpo5';

        // list($month, $year) = explode('/', $expirationDate);

        // $chargeData = array(
        //     'amount'=> $amount,
        //     'currency'=> "USD",
        //     'description'=> "Compra de boletos de cine",
        //     'customer_id'=>"1234567890",
        //     'card'=> array(
        //         'holder_name' => $cardName,
        //         'expiration_year'=> $year,
        //         'expiration_month'=> $month,
        //         'cvv2'=> $cvvCode
        //     )
            
        // );
        
        // $apiEndpoint = "https://sandbox-api.openpay.mx/v1/{$openpayMerchantId}/charges";

        // $ch = curl_init($apiEndpoint);
        // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        // curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        // curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($chargeData));
        // curl_setopt($ch, CURLOPT_USERPWD, "{$openpayApiKey}:");

        // $response = curl_exec($ch);
        // print_r($response);
        // if (curl_errno($ch)) {
        //     echo 'Error al realizar la solicitud: ' . curl_error($ch);
        // } else {
        //     $responseData = json_decode($response, true);
        //     if ($responseData && isset($result['id'])) {
        //         return 200;
        //     } else {
        //         return $responseData;
        //     }
        // }

        // curl_close($ch);
        return 200;
    }
}
