$(function () {

	$('.login input.screen_name').keyup(function () {
		if ($(this).val() == "") {
			$('.login .enter').fadeOut();
		}
		else {
			$('.login .enter').fadeIn();
		}
	});

});