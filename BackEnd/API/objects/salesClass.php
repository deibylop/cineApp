<?php

class Sales
{
    protected $usuario_id;
    protected $_db;
    protected $pelicula_id;
    protected $cantidad;
    public function __construct($db)
    {
        $this->_db = $db;
    }

    // Consultar historial de compras
    public function consultarHistorialCompras($usuario_id)
    {
        $instruccion = "CALL sp_get_user_buy_history    ($usuario_id)";
        $consulta = $this->_db->query($instruccion);
        $resultado = $consulta->fetch_all(MYSQLI_ASSOC);

        return $resultado;
    }

    // Realizar nueva compra
    public function realizarCompra($usuario_id, $pelicula_id, $cantidad)
    {
        $instruccion = "CALL sp_buy_tikets($usuario_id, $pelicula_id, $cantidad)";
        $consulta = $this->_db->query($instruccion);
        
        return $consulta;
    }

}
