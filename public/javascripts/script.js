$(document).ready(function(){
	$('#login-button').hover(function(){
		$('#login-pip').addClass('login-active');
	}, function(){
		$('#login-pip').removeClass('login-active');
	});

	$('#login-pip').hover(function(){
		$(this).css('background', 'maroon');
	}, function(){
		$(this).css('background', 'dodgerblue');
	});

	// $('#login-button').click(function(){
	// 	if($('#login-modal').hasClass('modal-active')){
	// 		$('#login-modal').fadeOut('slow');
	// 		$('#dark-overlay').fadeOut('slow');
	// 		$('#login-modal').removeClass('modal-active');
	// 	} else {
	// 		$('#login-modal').slideDown('slow');
	// 		$('#dark-overlay').fadeIn(200);
	// 		$('#login-modal').addClass('modal-active');
	// 	}
		
	// });

	// $('#dark-overlay').click(function(){
	// 	$('#login-modal').fadeOut('slow');
	// 	$('#dark-overlay').fadeOut('slow');
	// });
	$('#events-link').click(function(event){
		event.preventDefault();
		var template;
		var pageurl = $(this).attr('href');
		if(pageurl!=window.location){
			window.history.pushState({path:pageurl},'',pageurl);
		}
		$.ajax({
		    url : '/handlebars/events.handlebars',
		    success : function (data) {
		        template = Handlebars.compile(data);
		    },
		    dataType: "text",
		    async : false
		});
		$.ajax({
		    url : '/events',
		    success : function (data) {
		        $('main').html(template(JSON.parse(data)));
		        console.log(data);
		    },
		    dataType: "text",
		    async : false
		});
	});

	$('#families-link').click(function(event){
		event.preventDefault();
		var template;
		var pageurl = $(this).attr('href');
		if(pageurl!=window.location){
			window.history.pushState({path:pageurl},'',pageurl);
		}
		$.ajax({
		    url : '/handlebars/families.handlebars',
		    success : function (data) {
		        template = Handlebars.compile(data);
		    },
		    dataType: "text",
		    async : false
		});
		$.ajax({
		    url : '/families',
		    success : function (data) {
		        $('main').html(template(JSON.parse(data)));
		        console.log(data);
		    },
		    dataType: "text",
		    async : false
		});
	});
});