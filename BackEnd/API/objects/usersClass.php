<?php

class Users
{
    protected $correo;
    protected $contrasena;
    protected $_db;
    protected $usuario_id;
    public function __construct($db)
    {
        $this->_db = $db;
    }

    // Login de usuario
    public function loginUsuario($correo, $contrasena)
    {
        $instruccion = "CALL sp_login_user('$correo', '$contrasena')";
        $result = $this->_db->query($instruccion);
        $resultado = $result->fetch_assoc();

        return $resultado;
    }

    // Registro de usuario
    //ELIMINAR NOMBRE
    public function registrarUsuario($nombre, $correo, $password,$rol_id)
    {
        $hashedPassword = md5($password);
        $instruccion = "CALL sp_new_user('$nombre', '$correo', '$hashedPassword','$rol_id')";
        $result = $this->_db->query($instruccion);
        
        return $result;
    }

    // Editar perfil de usuario
    //ELIMINAR NOMBRE
    public function editarPerfilUsuario($usuario_id, $nuevo_nombre, $correo, $contrasena)
    {
        $instruccion = "CALL sp_update_user_profile($usuario_id, '$nuevo_nombre', '$correo', '$contrasena')";
        $result = $this->_db->query($instruccion);
        
        return $result;
    }

}
