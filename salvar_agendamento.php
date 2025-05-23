<?php
// Mostrar erros para depuração
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Cabeçalhos para permitir CORS e indicar retorno em JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Receber dados JSON do corpo da requisição
$json = file_get_contents("php://input");
$data = json_decode($json, true);

// Validar JSON recebido
if (!$data) {
    echo json_encode(["success" => false, "message" => "Dados JSON inválidos."]);
    exit;
}

// Dados do banco de dados
$host = 'localhost'; // OU 'auth-db1077.hstgr.io'
$dbname = 'u578036672_bancoprojetos';
$username = 'u578036672_bancoprojetos';
$password = 'M4theus@123';

// Conectar ao banco
$conn = new mysqli($host, $username, $password, $dbname);

// Verificar erro na conexão
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Erro na conexão: " . $conn->connect_error]);
    exit;
}

// Preparar e sanitizar os dados
$cliente = $conn->real_escape_string($data["customer"]["name"]);
$whatsapp = $conn->real_escape_string($data["customer"]["whatsapp"]);
$cpf = $conn->real_escape_string($data["customer"]["cpf"]);
$servico = $conn->real_escape_string($data["service"]["name"]);
$barbeiro = $conn->real_escape_string($data["barber"]["name"]);
$hora = $conn->real_escape_string($data["time"]);

// Corrigir o formato da data recebida
$dateObj = isset($data["date"]) ? new DateTime($data["date"]) : null;
$data_agendamento = $dateObj ? $conn->real_escape_string($dateObj->format('Y-m-d')) : null;

// Validação básica
if (!$data_agendamento || !$hora) {
    echo json_encode(["success" => false, "message" => "Data ou horário inválidos."]);
    exit;
}

// Inserir no banco
$sql = "INSERT INTO agendamentos (cliente, whatsapp, cpf, servico, barbeiro, data, hora)
        VALUES ('$cliente', '$whatsapp', '$cpf', '$servico', '$barbeiro', '$data_agendamento', '$hora')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Agendamento salvo com sucesso!"]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao salvar: " . $conn->error]);
}

$conn->close();
?>
