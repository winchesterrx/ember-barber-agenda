<?php
$host = 'auth-db1077.hstgr.io';
$dbname = 'u578036672_bancoprojetos';
$user = 'u578036672_bancoprojetos';
$pass = 'M4theus@123';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro na conexão com o banco de dados: " . $e->getMessage());
}
?>
