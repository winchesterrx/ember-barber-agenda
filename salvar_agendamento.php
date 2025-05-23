<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// ---------------------
// Configurações de CORS
// ---------------------
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Tratar requisições OPTIONS (pré-flight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ---------------------
// Ler e validar JSON recebido
// ---------------------
$input = file_get_contents("php://input");

if (!$input) {
    echo json_encode([
        "success" => false,
        "message" => "Nenhum corpo de requisição recebido.",
        "raw" => ""
    ]);
    exit;
}

$data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode([
        "success" => false,
        "message" => "JSON inválido ou não recebido",
        "raw" => $input
    ]);
    exit;
}

// ---------------------
// Conectar ao banco de dados
// ---------------------
$host = 'localhost'; // ou auth-db1077.hstgr.io se estiver externo
$dbname = 'u578036672_bancoprojetos';
$username = 'u578036672_bancoprojetos';
$password = 'M4theus@123';

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Erro na conexão com o banco de dados: " . $conn->connect_error
    ]);
    exit;
}

// ---------------------
// Preparar dados para inserção
// ---------------------
$cliente = $conn->real_escape_string($data["customer"]["name"]);
$whatsapp = $conn->real_escape_string($data["customer"]["whatsapp"]);
$cpf = $conn->real_escape_string($data["customer"]["cpf"]);
$servico = $conn->real_escape_string($data["service"]["name"]);
$barbeiro = $conn->real_escape_string($data["barber"]["name"]);
$data_agendamento = $conn->real_escape_string($data["date"]);
$hora = $conn->real_escape_string($data["time"]);

// ---------------------
// Inserir dados na tabela
// ---------------------
$sql = "INSERT INTO agendamentos (nome_cliente, telefone, cpf, servico, barbeiro, data, horario) 
        VALUES ('$cliente', '$whatsapp', '$cpf', '$servico', '$barbeiro', '$data_agendamento', '$hora')";

if ($conn->query($sql) === TRUE) {
    echo json_encode([
        "success" => true,
        "message" => "Agendamento salvo com sucesso!"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Erro ao salvar: " . $conn->error
    ]);
}

$conn->close();
