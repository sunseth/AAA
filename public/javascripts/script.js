$(document).ready(function(){
	$('#login-button').hover(function(){
		$('#login-pip').addClass('login-active');
	}, function(){
		$('#login-pip').removeClass('login-active');
	});

	$('#login-pip').hover(function(){
		$(this).css('background', '#00BFFF');
	}, function(){
		$(this).css('background', '#1E90FF');
	});
});