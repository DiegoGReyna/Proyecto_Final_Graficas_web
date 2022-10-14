<?php
 
class DB{
    private $host;
    private $db;
    private $user;
    private $password;
    private $charset;
    private $connection;
 
    public function __construct(){
        $this->host     = '127.0.0.1';
        $this->db       = 'swiftboat';
        $this->user     = 'root';
        $this->password = "";
        $this->charset  = 'utf8mb4';
    }

    function connect(){
    
        try{
 
            
            $this->connection = "mysql:host=".$this->host.";dbname=" . $this->db . ";charset=" . $this->charset;
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            $pdo = new PDO($this->connection,$this->user,$this->password);
        
            return $pdo;
 
        }catch(PDOException $e){
            print_r('Error connection: ' . $e->getMessage());
        }   
    }

    function disconnect(){
        $this->connection = null;
        return $this->connection;
    }
}

?>