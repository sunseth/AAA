$(document).ready(function(){
	$('.event-el-name:last').css('border-bottom', 'none');
	$('.family-el-name:last').css('border-bottom', 'none');
	$('.committee-el-name:last').css('border-bottom', 'none');
	$('.cabinet-el-name:last').css('border-bottom', 'none');
	$('.media-el-name:last').css('border-bottom', 'none');

	$('.delete-button').click(function(){
		var delReq = JSON.stringify({
		    	name: $(this).data('name'),
		    	model: $(this).data('type')
		    });
		var $parent = $(this).parent();
		$.ajax({
		    url: '/admin',
		    type: 'DELETE',
		    dataType: 'json',
		    contentType: 'application/json',
		    data: delReq,
		    success: function(response) {
		        $parent.hide();
		    }, 
		    error: function(err){
		    	console.error(err);
		    }
		});
	});

	$('#event-submit').on('submit', function(evt){
		var formURL = $(this).attr('action');
		var formData = new FormData($('form')[0]);
		$.ajax({
			url: formURL,
			data: formData,
			type: 'POST',
			contentType: false,
			processData: false,
			success: function(data){
				var dataObj = JSON.parse(data);
				// $.ajax({
				// 	url: '/handlebars/event-list-item.handlebars',
				// 	dataType: 'text',
				// 	success:
				// });
				$('#event-list').append('<div>''</div>');
				$('#event-submit div input').val('');
				$('event-submit div textarea').val('');
			},
			error: function(err){
				console.error(err);
			}
		});
		evt.preventDefault();
	});
});