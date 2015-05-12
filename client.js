$(function () {

	$.post("/detect_user.php", function (data) {
		array = JSON.parse(data);
		if (array["results"] == "1") {
			$('.messages').show();
			UpdateStatus('online');
			FetchChatData();
		}
		else {
			$('.login').show();
		}
	});

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

	$('.people ul li[data-hover]').hover(function () {
		$('.tooltip').remove();
		$('body').append('<div class="tooltip">' + $(this).find('i.status')[0].outerHTML + $(this).attr('data-hover') + '</div>');
		t = $(this).position().top + $('.container').position().top + 30;
		l = $(this).position().left + $('.container').position().left - 408;
		$('.tooltip').css({ top: t, left: l });
	}, function () {
		$('.tooltip').remove();
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

function UpdateStatus(text) {
	$.post("/update_status.php", { status: text });
}

function FetchChatData() {

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