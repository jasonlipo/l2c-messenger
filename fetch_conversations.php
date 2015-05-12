<?php
session_start();

$db = new mysqli("127.0.0.1", "root", "", "learn2code_messenger") or die ("Error connecting to database");

$this_user = $_SESSION['userID'];
$all_messages = $db->query("SELECT conversations.*, messages.* FROM messages LEFT JOIN conversations ON messages.convoID = conversations.convoID LEFT JOIN users ON (conversations.user0 = users.userID OR conversations.user1 = users.userID) WHERE users.userID = '$this_user'");

$output = [];
while ($this_message = $all_messages->fetch_assoc()) {
	
	$other_user = ($this_message["user0"] == $this_user) ? $this_message["user1"] : $this_message["user0"];
	$get_other_user = $db->query("SELECT screen_name FROM users WHERE userID = '$other_user'")->fetch_assoc();

	if (!isset($output[$this_message["convoID"]])) {
		$output[$this_message["convoID"]] = ["convoID" => $this_message["convoID"], "other_user" => $get_other_user["screen_name"], "messages" => []];
	}

	$which_user = ($this_message["user0"] == $this_user) ? 0 : 1;
	$output[$this_message["convoID"]]["messages"][] = ["to_me" => ($which_user == $this_message["toUser"]), "seen" => $this_message["seen"], "sent" => $this_message["sent"], "text" => $this_message["text"], ];
}

echo json_encode(array_values($output));

?>