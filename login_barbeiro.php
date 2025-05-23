<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Receber entrada JSON
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Verificação básica
if (!$data || !isset($data['email']) || !isset($data['password'])) {
    echo json_encode([
        "success" => false,
        "message" => "Email e senha são obrigatórios"
    ]);
    exit;
}

// Conexão com o banco
$host = 'localhost';
$dbname = 'u578036672_bancoprojetos';
$username = 'u578036672_bancoprojetos';
$password = 'M4theus@123';

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Erro na conexão"]);
    exit;
}

// Buscar barbeiro por email
$email = $conn->real_escape_string($data['email']);
$sql = "SELECT * FROM barbeiros WHERE email = '$email' AND ativo = 1 LIMIT 1";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $barbeiro = $result->fetch_assoc();

    if (password_verify($data['password'], $barbeiro['senha'])) {
        unset($barbeiro['senha']); // remove a senha do retorno
        echo json_encode([
            "success" => true,
            "barbeiro" => $barbeiro
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Senha incorreta"
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Email não encontrado ou barbeiro inativo"
    ]);
}

$conn->close();
?>
