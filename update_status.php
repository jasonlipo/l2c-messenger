<?php
session_start();

if ($_POST['status']) {

	$db = new mysqli("127.0.0.1", "root", "", "learn2code_messenger") or die ("Error connecting to database");
	$text = $_POST['status'];

	$code = $_COOKIE['learn2code_user'];
	$db->query("UPDATE users SET status='$text' WHERE code = '$code'");

}

?>