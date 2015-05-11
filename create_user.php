<?php
session_start();

if ($_POST['screen_name']) {

	$db = new mysqli("127.0.0.1", "root", "", "learn2code_messenger") or die ("Error connecting to database");
	$screen_name = $_POST['screen_name'];

	$chars = array_merge(range('a', 'z'), range(0, 9));
    shuffle($chars);
	$code = implode(array_slice($chars, 0, 50));

	$db->query("INSERT INTO users (screen_name, code) VALUES ('$screen_name', '$code')");

	setcookie("learn2code_user", $code, time()+86400*30*12);

}

?>