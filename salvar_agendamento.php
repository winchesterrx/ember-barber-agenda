<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Recebe o corpo cru da requisição
$json = file_get_contents("php://input");
$data = json_decode($json, true);

// Se falhar ao interpretar o JSON, exibe erro e o conteúdo recebido
if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "JSON inválido ou não recebido",
        "raw" => $json // Aqui você vê o que chegou
    ]);
    exit;
}

// Dados do banco
$host = 'localhost';
$dbname = 'u578036672_bancoprojetos';
$username = 'u578036672_bancoprojetos';
$password = 'M4theus@123';

// Conexão
$conn = new mysqli($host, $username, $password, $dbname);

// Verifica conexão
if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Erro ao conectar ao banco de dados: " . $conn->connect_error
    ]);
    exit;
}

// Escapar dados
$cliente = $conn->real_escape_string($data["customer"]["name"]);
$whatsapp = $conn->real_escape_string($data["customer"]["whatsapp"]);
$cpf = $conn->real_escape_string($data["customer"]["cpf"]);
$servico = $conn->real_escape_string($data["service"]["name"]);
$barbeiro = $conn->real_escape_string($data["barber"]["name"]);
$data_agendamento = $conn->real_escape_string($data["date"]);
$hora = $conn->real_escape_string($data["time"]);

// Inserir dados
$sql = "INSERT INTO agendamentos (nome_cliente, telefone, cpf, servico, barbeiro, data, horario)
        VALUES ('$cliente', '$whatsapp', '$cpf', '$servico', '$barbeiro', '$data_agendamento', '$hora')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Agendamento salvo com sucesso!"]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao salvar: " . $conn->error]);
}

$conn->close();
