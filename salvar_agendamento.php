<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"), true);

include 'db.php';

$stmt = $conn->prepare("INSERT INTO agendamentos (nome, whatsapp, cpf, servico, barbeiro, data, hora) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param(
  "sssssss",
  $data['customer']['name'],
  $data['customer']['whatsapp'],
  $data['customer']['cpf'],
  $data['service']['name'],
  $data['barber']['name'],
  $data['date'],
  $data['time']
);

if ($stmt->execute()) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false, "error" => $stmt->error]);
}
