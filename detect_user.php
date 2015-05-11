<?php
session_start();

if (isset($_COOKIE['learn2code_user'])) {

	$db = new mysqli("127.0.0.1", "root", "", "learn2code_messenger") or die ("Error connecting to database");
	$code = $_COOKIE['learn2code_user'];

	$find = $db->query("SELECT * FROM users WHERE code = '$code'");

	if ($find->num_rows > 0) {
		$row = $find->fetch_assoc();
		echo json_encode(array("results" => 1, "screen_name" => $row["screen_name"], "id" => $row["userID"]));
	}
	else {
		echo json_encode(array("results" => 0, "error" => "Not found"));
	}


}
else {
	echo json_encode(array("results" => 0, "error" => "No cookie"));
}

?>