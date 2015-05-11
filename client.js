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

});