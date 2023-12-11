<?php
require_once '../../php-jwt/src/JWT.php';

DEFINE("JWT_KEY", "Llave maestra de JWT");
class Conexion
{
    private $host = "localhost:8889";
    private $db_name = "proyecto_final";
    private $username = "root";
    private $password = "root";
    public $_db;
    
    public function obtenerConexion()
    {
        $this->_db = new mysqli($this->host, $this->username, $this->password, $this->db_name);
        if ($this->_db->connect_errno) {
            echo 'Fallo la conexion';
            return;
        } else {
            return $this->_db;
        }
    }
}
