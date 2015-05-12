<?php
session_start();

if ($_POST['status']) {

	$db = new mysqli("127.0.0.1", "root", "", "learn2code_messenger") or die ("Error connecting to database");
	$text = $_POST['status'];

	$userID = $_SESSION['userID'];
	$db->query("UPDATE users SET status='$text' WHERE userID = '$userID'");

}

?>