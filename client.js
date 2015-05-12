var loggedIn = false;

$(function () {

	FetchChatData();

	DetectLoggedIn();	

	$('.login input.screen_name').keyup(function (e) {
		if ($(this).val() == "") {
			$('.login .enter').fadeOut();
		}
		else {
			$('.login .enter').fadeIn();
			if (e.keyCode == 13) {
				NewUser();
			}
		}
	});

	$('.container .messages .this-user i.status').click(function () {
		var modes = ["online", "busy", "unavailable"];
		current = $('.container .messages .this-user i.status').attr('class').split(" ")[1];
		next_index = (modes.indexOf(current) + 1) > (modes.length - 1) ? 0 : modes.indexOf(current) + 1;
		$('.container .messages .this-user i.status').removeClass(current);
		$('.container .messages .this-user i.status').addClass(modes[next_index]);
		UpdateStatus(modes[next_index]);
	});

	$('a.enter').click(NewUser);

});

function DetectLoggedIn() {
	$.post("/detect_user.php", function (data) {
		user_data = JSON.parse(data);
		if (user_data["results"] == "1") {
			$('.messages').show();
			$('.messages .this-user .name').prepend(user_data["screen_name"]);
			UpdateStatus('online');
			UpdateOnlineTime();
			FetchConvoData();
			loggedIn = true;
		}
		else {
			$('.login').show();
		}
	});
}

function UpdateOnlineTime() {
	$.post("/still_online.php");
	setTimeout(UpdateOnlineTime, 30000);
}

function HoversOnChatBar() {
	$('.people ul li[data-hover]').hover(function () {
		$('.tooltip').remove();
		$('body').append('<div class="tooltip">' + $(this).find('i.status')[0].outerHTML + $(this).attr('data-hover') + '</div>');
		t = $(this).position().top + $('.container').position().top + 30;
		l = $(this).position().left + $('.container').position().left - 408;
		$('.tooltip').css({ top: t, left: l });
	}, function () {
		$('.tooltip').remove();
	});
}

function UpdateStatus(text) {
	$.post("/update_status.php", { status: text });
}

function FetchChatData() {
	$.post("/fetch_online.php", function (data) {
		$('.people ul').html('');
		array = JSON.parse(data);
		for (x in array["information"]) {
			result = array["information"][x];
			$('.people ul').append('<li data-hover="'+result[1]+'">\
				<i class="status '+result[2]+'"></i>\
				<img class="avatar" src="avatar-standard.png" />\
			</li>');
		}
		HoversOnChatBar();
	});
	setTimeout(FetchChatData, 30000);
}

function FetchConvoData() {
	$.post("/fetch_conversations.php", function (data) {
		convoInfo = JSON.parse(data);
		$('.messages ul').html('');
		for (x in convoInfo) {
			id = convoInfo[x]["convoID"];
			other_user = convoInfo[x]["other_user"];
			recent_message = convoInfo[x]["messages"][convoInfo[x]["messages"].length-1];
			recent_content = (recent_message["text"].length > 150) ? recent_message["text"].substr(0, 147) + "..." : recent_message["text"];
			if (recent_message["to_me"] == false) { recent_content = "&#8594; " + recent_content; }
			$('.messages ul').append('<li>\
				<img class="avatar" src="avatar-standard.png" />\
				<span class="name">'+other_user+'</span>\
				<span class="recent-message">'+recent_content+'</span>\
			</li>');
		}
	});
	setTimeout(FetchChatData, 10000);
}

function NewUser() {
	screen_name = $('.screen_name').val();
	$('.login .enter').fadeOut();
	$('.login .loading').fadeIn();
	$.post("/create_user.php", { screen_name: screen_name }, function () {
		setTimeout(function () {
			location.reload();
		}, 2000);
	});
}