$(function () {

	$('.login input.screen_name').keyup(function () {
		if ($(this).val() == "") {
			$('.login .enter').fadeOut();
		}
		else {
			$('.login .enter').fadeIn();
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

	$('a.enter').click(function () {
		screen_name = $('.screen_name').val();
		$('.login .enter').fadeOut();
		$('.login .loading').fadeIn();
		$.post("/create_user.php", { screen_name: screen_name }, function () {
			setTimeout(function () {
				location.reload();
			}, 2000);
		});
	});

});