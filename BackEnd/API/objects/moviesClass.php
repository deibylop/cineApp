<?php

class Movies
{
    protected $_db;

    public function __construct($db)
    {
        $this->_db = $db;
    }


    // Consultar películas disponibles
    public function consultarPeliculasDisponibles()
    {
        $instruccion = "CALL sp_get_all_movies()";
        $consulta = $this->_db->query($instruccion);
        $resultado = $consulta->fetch_all(MYSQLI_ASSOC);
        return $resultado;
    }

}
