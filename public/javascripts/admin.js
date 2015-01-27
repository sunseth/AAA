$(document).ready(function(){

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
				$.ajax({
					url: '/handlebars/event-list-item.handlebars',
					dataType: 'text',
					success: function(hbs){
						var template = Handlebars.compile(hbs);
						var listElement = template(dataObj);
						$('#event-list').append(listElement);
					}
				});
				$('#event-submit div input').val('');
				$('#event-submit div textarea').val('');
			},
			error: function(err){
				console.error(err);
			}
		});
		evt.preventDefault();
	});

	$('#family-submit').on('submit', function(evt){
		var formURL = $(this).attr('action');
		var formData = new FormData($('form')[1]);
		$.ajax({
			url: formURL,
			data: formData,
			type: 'POST',
			contentType: false,
			processData: false,
			success: function(data){
				var dataObj = JSON.parse(data);
				$.ajax({
					url: '/handlebars/family-list-item.handlebars',
					dataType: 'text',
					success: function(hbs){
						var template = Handlebars.compile(hbs);
						var listElement = template(dataObj);
						$('#family-list').append(listElement);
					}
				});
				$('#family-submit div input').val('');
				$('#family-submit div textarea').val('');
			},
			error: function(err){
				console.error(err);
			}
		});
		evt.preventDefault();
	});

	// $('.submit-post').on('submit', function(event){
	// 	var id = $(this).attr('id');
	// 	var url = $(this).attr('action');
	// 	if (id=='event-submit'){
	// 		ajaxAdd(url, 0, '/handlebars/event-list-item.handlebars', $('#family-list'), 
	// 			$('#family-submit div input'), $('#family-submit div textarea'));
	// 	} else if (id=='family-submit'){

	// 	} else if (id=='committee-submit'){

	// 	} else if (id=='cabinet-submit'){

	// 	} else if (id=='media-submit'){

	// 	} else {
	// 		console.error('Invalid form');
	// 	}
	// 	event.preventDefault();
	// });

	// function ajaxAdd(url, formNum, handlebarsPath, addTo, inputClean, textareaClean){

	// }
});