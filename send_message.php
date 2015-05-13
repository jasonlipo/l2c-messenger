<?php
session_start();

$db = new mysqli("127.0.0.1", "root", "", "learn2code_messenger") or die ("Error connecting to database");

$userID = $_SESSION['userID'];
$other_user = $_POST['other_user'];
$message = $db->real_escape_string($_POST['text']);

$convos = $db->query("SELECT * FROM conversations WHERE (user0 = '$userID' AND user1 = '$other_user') OR (user0 = '$other_user' AND user1 = '$userID')");

date_default_timezone_set('Europe/London');
$time = date("Y-m-d H:i:s");

if ($convos->num_rows > 0) {
	$info = $convos->fetch_assoc();
	$to_user = ($info["user0"] == $userID) ? 1 : 0;
	$db->query("INSERT INTO messages (convoID, toUser, sent, text) VALUES ('".$info[convoID]."', '$to_user', '$time', '$message')");
}
else {
	$db->query("INSERT INTO conversations (user0, user1) VALUES ('$userID', '$other_user')");
	$convoID = $db->insert_id;
	$db->query("INSERT INTO messages (convoID, toUser, sent, text) VALUES ('$convoID', '1', '$time', '$message')");
}


?>