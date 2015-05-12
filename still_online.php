<?php
session_start();

$db = new mysqli("127.0.0.1", "root", "", "learn2code_messenger") or die ("Error connecting to database");
$text = $_POST['status'];

$userID = $_SESSION['userID'];
date_default_timezone_set('Europe/London');
$time = date("Y-m-d H:i:s");
$db->query("UPDATE users SET lastOnline = '$time' WHERE userID = '$userID'");


?>