<?php
require_once '../../php-jwt/src/JWT.php';
use \Firebase\JWT\JWT;

class Auth
{
    private static $JWT_KEY = "Llave maestra de JWT";

    public static function generarToken($data)
    {
        $token = JWT::encode($data, self::$JWT_KEY,'HS256');
        return $token;
    }

    public static function verificarToken($data)
    {
        try {
            $data = JWT::decode($data, self::$JWT_KEY);
            return $data;
        } catch (\Exception $e) {
            return false;
        }
    }
}
