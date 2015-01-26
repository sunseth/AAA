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

	$('.link').click(function(event){
		event.preventDefault();
		var template;
		var pageurl = $(this).attr('href');
		var page = $(this).attr('id');
		if(pageurl!=window.location){
			window.history.pushState({path:pageurl},'',pageurl);
		}
		$.ajax({
		    url : '/handlebars/' + page + '.handlebars',
		    success : function (data) {
		        template = Handlebars.compile(data);
		    },
		    dataType: "text",
		    async : false
		});
		$.ajax({
		    url : '/' + page,
		    success : function (data) {
		        $('main').html(template(JSON.parse(data)));
		    },
		    dataType: "text",
		    async : false
		});
	});
});