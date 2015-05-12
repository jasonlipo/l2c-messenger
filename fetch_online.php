<?php
session_start();

$db = new mysqli("127.0.0.1", "root", "", "learn2code_messenger") or die ("Error connecting to database");

date_default_timezone_set('Europe/London');
$last_online = date("Y-m-d H:i:s", strtotime("1 minute ago"));

$userID = $_SESSION['userID'];
$all_users = $db->query("SELECT * FROM users WHERE status != 'offline' AND lastOnline >= '$last_online' AND userID != '$userID'");

$output = ["number_online" => $all_users->num_rows, "information" => []];
while ($this_user = $all_users->fetch_assoc()) {
	$output["information"][] = [$this_user["userID"], $this_user["screen_name"], $this_user["status"]];
}

echo json_encode($output);

?>