<?php
session_start();
?>

<!DOCTYPE html>
<html>

<head>
	<link href='http://fonts.googleapis.com/css?family=Montserrat:700,400' rel='stylesheet' type='text/css'>
	<link href='/style.css' rel='stylesheet' type='text/css'>
	<link href="/icon.png" rel="shortcut icon" />
	<title>Learn2Code Messenger</title>
	<script type="text/javascript" src="jquery.js"></script>
	<script type="text/javascript" src="client.js"></script>
</head>

<body>

	<div class="heading">
		<b>Messenger</b>
		<br />
		by Jason Lipowicz
	</div>

	<div class="container">

		<div class="login">
			<h1>Create an account</h1>
			<p>
				Type a screen name.
				<br />You will be remembered on this computer.
				<br /><br />
				<input placeholder="Enter a screen name" class="screen_name" />
				<a class="enter">&#10152;</a>
				<img class="loading" src="loading.gif" />
			</p>
		</div>
		
		<div class="people">
		<ul>

			<li data-hover="Jason Lipowicz">
				<i class="status online"></i>
				<img class="avatar" src="avatar-standard.png" />
			</li>

			<li data-hover="Jason Lipowicz">
				<i class="status busy"></i>
				<img class="avatar" src="avatar-standard.png" />
			</li>

			<li data-hover="Jason Lipowicz">
				<i class="status unavailable"></i>
				<img class="avatar" src="avatar-standard.png" />
			</li>

			<li data-hover="Jason Lipowicz">
				<i class="status offline"></i>
				<img class="avatar" src="avatar-standard.png" />
			</li>

		</ul>
		</div>

		<div class="messages">
			<div class="this-user">
				<img class="avatar" src="avatar-standard.png" />
				<div class="name">Jason Lipowicz</div>
				<i class="status online"></i>
			</div>
			<ul>
				<li>
					<img class="avatar" src="avatar-standard.png" />
					<span class="name">Bob Smith</span>
					<span class="recent-message">This is a test message to see if it works...</span>
				</li>
				<li>
					<img class="avatar" src="avatar-standard.png" />
					<span class="name">Bob Smith</span>
					<span class="recent-message">This is a test message to see if it works...</span>
				</li>
			</ul>
		</div>

		<div class="contents">
		</div>

	</div>

</body>

</html>