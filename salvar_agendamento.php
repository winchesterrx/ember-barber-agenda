<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$json = file_get_contents("php://input");
$data = json_decode($json, true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "JSON inválido ou não recebido", "raw" => $json]);
    exit;
}

// Apenas para teste: mostrar o que chegou
echo json_encode([
    "success" => true,
    "message" => "Dados recebidos com sucesso",
    "data" => $data
]);
exit;
?>
