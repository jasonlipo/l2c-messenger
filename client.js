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
			FetchConvoData(true);
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
	var updated_open = false;
	$.post("/fetch_online.php", function (data) {
		$('.people ul').html('');
		online_data = JSON.parse(data);
		for (x in online_data["information"]) {
			result = online_data["information"][x];
			$('.people ul').append('<li data-hover="'+result[1]+'">\
				<i class="status '+result[2]+'"></i>\
				<img class="avatar" src="avatar-standard.png" />\
			</li>');
			if ($('.contents .top-bar[data-otherid="'+result[0]+'"]').size()) {
				current = $('.contents .top-bar .status').attr('class').split(" ")[1];
				$('.contents .top-bar .status').removeClass(current);
				$('.contents .top-bar .status').addClass(result[2]);
				updated_open = true;
			}
		}
		if ($('.contents .top-bar').size() && !updated_open) {
			current = $('.contents .top-bar .status').attr('class').split(" ")[1];
			$('.contents .top-bar .status').removeClass(current);
			$('.contents .top-bar .status').addClass("offline");
		}
		HoversOnChatBar();
	});
	setTimeout(FetchChatData, 30000);
}

function FetchConvoData(loop) {
	$.post("/fetch_conversations.php", function (data) {
		convoInfo = JSON.parse(data);
		$('.messages ul').html('');
		for (x in convoInfo) {
			id = convoInfo[x]["convoID"];
			other_user = convoInfo[x]["other_user"];
			recent_message = convoInfo[x]["messages"][convoInfo[x]["messages"].length-1];
			recent_content = (recent_message["text"].length > 150) ? recent_message["text"].substr(0, 147) + "..." : recent_message["text"];
			if (recent_message["to_me"] == false) { recent_content = "&#8594; " + recent_content; }
			$('.messages ul').append('<li data-convoid="'+id+'">\
				<img class="avatar" src="avatar-standard.png" />\
				<span class="name">'+other_user+'</span>\
				<span class="recent-message">'+recent_content+'</span>\
			</li>');
		}
		ActivateMessages();
		if ($('.contents .top-bar').size()) {
			convoid = $('.contents .top-bar').attr('data-convoid');
			$('.messages ul li[data-convoid="'+convoid+'"]').trigger('click');
		}
		$('.container .contents img.loading').fadeOut();
	});
	if (loop) { setTimeout(function () { FetchConvoData(true) }, 30000); }
}

function ActivateMessages() {
	$('.messages ul li').click(function () {
		
		convoID = $(this).attr('data-convoid');
		
		for (x in convoInfo) {

			if (convoInfo[x]["convoID"] == convoID) {

				other_user_status = "offline";
				for (j in online_data["information"]) {
					if (online_data["information"][j][0] == convoInfo[x]["other_id"]) {
						other_user_status = online_data["information"][j][2];
					}
				}

				$('.contents').show();
				$('.contents .top-bar, .contents .scrollable').remove();
				$('.contents').prepend('\
				<div data-convoid="'+convoID+'" data-otherid="'+convoInfo[x]["other_id"]+'" class="top-bar">\
					<div class="name">'+convoInfo[x]["other_user"]+'<i class="status '+other_user_status+'"></i></div>\
					<img class="close" src="/close.png" />\
				</div><div class="scrollable"></div>');

				for (y in convoInfo[x]["messages"]) {

					message = convoInfo[x]["messages"][y];
					$('.contents .scrollable').append('<li class="message '+(!convoInfo[x]["messages"][y]["to_me"]?"me":"")+'">\
						<img class="avatar" src="avatar-standard.png" />\
						<i class="arrow1"></i><i class="arrow2"></i>\
						<span class="text">'+convoInfo[x]["messages"][y]["text"]+'</span>\
					</li>');

				}

				$('.contents .top-bar .close').click(function () {
					$('.contents').hide();
				});

				$('.scrollable').scrollTop($('.scrollable').height());

				EnterInTextarea();

				break;
			}

		}

	});	

}

function EnterInTextarea() {
	$('.contents textarea.write').unbind('keypress');
	$('.contents textarea.write').keypress(function (e) {
		if (e.keyCode == 13) {
			SendMessage();
			e.preventDefault();
			return false;
		}
	});
}

function SendMessage() {
	new_message = $('.contents textarea.write').val();
	$('.container .contents img.loading').fadeIn();
	$.post("/send_message.php", { other_user: $('.contents .top-bar').attr('data-otherid'), text: new_message }, function () {
		$('.contents textarea.write').val('');
		FetchConvoData(false);
	});
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