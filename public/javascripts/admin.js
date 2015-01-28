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

	$('.submit-post').on('submit', function(event){
		var id = $(this).attr('id');
		var url = $(this).attr('action');
		var formData;
		if (id=='event-submit'){
			formData = new FormData($('form')[0]);
			
			ajaxAdd(url, formData, '/handlebars/event-list-item.handlebars', $('#event-list'), 
				$('#event-submit div input'), $('#event-submit div textarea'));

		} else if (id=='family-submit'){
			formData = new FormData($('form')[1]);

			ajaxAdd(url, formData, '/handlebars/family-list-item.handlebars', $('#family-list'), 
				$('#family-submit div input'), $('#family-submit div textarea'));

		} else if (id=='committee-submit'){
			formData = new FormData($('form')[2]);

			ajaxAdd(url, formData, '/handlebars/committee-list-item.handlebars', $('#committee-list'), 
				$('#committee-submit div input'), $('#committee-submit div textarea'));

		} else if (id=='cabinet-submit'){
			formData = new FormData($('form')[3]);

			ajaxAdd(url, formData, '/handlebars/cabinet-list-item.handlebars', $('#cabinet-list'), 
				$('#cabinet-submit div input'), $('#cabinet-submit div textarea'));

		} else if (id=='media-submit'){
			formData = new FormData($('form')[4]);

			ajaxAdd(url, formData, '/handlebars/media-list-item.handlebars', $('#media-list'), 
				$('#media-submit div input'), $('#media-submit div textarea'));

		} else {

			console.error('Invalid form');

		}
		event.preventDefault();
	});

	function ajaxAdd(url, formData, handlebarsPath, addTo, inputClean, textareaClean){
		$.ajax({
			url: url,
			data: formData,
			type: 'POST',
			contentType: false,
			processData: false,
			success: function(data){
				var dataObj = JSON.parse(data);
				$.ajax({
					url: handlebarsPath,
					dataType: 'text',
					success: function(hbs){
						var template = Handlebars.compile(hbs);
						var listElement = template(dataObj);
						addTo.append(listElement);
					}
				});
				inputClean.val('');
				textareaClean.val('');
			},
			error: function(err){
				console.error(err);
			}
		});
	}
});