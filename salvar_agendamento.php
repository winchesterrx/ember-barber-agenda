<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Receber os dados do corpo da requisição
$json = file_get_contents("php://input");
$data = json_decode($json, true);

// Verificar se os dados foram recebidos corretamente
if (!$data) {
    echo json_encode(["success" => false, "message" => "Dados JSON inválidos."]);
    exit;
}

// Conectar ao banco de dados
$host = 'localhost'; // OU auth-db1077.hstgr.io
$dbname = 'u578036672_bancoprojetos';
$username = 'u578036672_bancoprojetos';
$password = 'M4theus@123';

$conn = new mysqli($host, $username, $password, $dbname);

// Verificar erro na conexão
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Erro na conexão com o banco de dados: " . $conn->connect_error]);
    exit;
}

// Preparar os dados recebidos
$cliente = $conn->real_escape_string($data["customer"]["name"]);
$whatsapp = $conn->real_escape_string($data["customer"]["whatsapp"]);
$cpf = $conn->real_escape_string($data["customer"]["cpf"]);
$servico = $conn->real_escape_string($data["service"]["name"]);
$barbeiro = $conn->real_escape_string($data["barber"]["name"]);
$data_agendamento = $conn->real_escape_string($data["date"]);
$hora = $conn->real_escape_string($data["time"]);

// Inserir os dados na tabela (crie uma chamada `agendamentos` com essas colunas)
$sql = "INSERT INTO agendamentos (cliente, whatsapp, cpf, servico, barbeiro, data, hora)
        VALUES ('$cliente', '$whatsapp', '$cpf', '$servico', '$barbeiro', '$data_agendamento', '$hora')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Agendamento salvo com sucesso!"]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao salvar: " . $conn->error]);
}

$conn->close();
?>
