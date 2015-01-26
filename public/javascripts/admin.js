$(document).ready(function(){
	$('.event-el-name:last').css('border-bottom', 'none');
	$('.family-el-name:last').css('border-bottom', 'none');
	$('.committee-el-name:last').css('border-bottom', 'none');
	$('.cabinet-el-name:last').css('border-bottom', 'none');
	$('.media-el-name:last').css('border-bottom', 'none');

	$('.delete-button').click(function(){
		$.ajax({
		    url: '/admin',
		    type: 'DELETE',
		    dataType: 'json',
		    contentType: 'application/json',
		    data: {
		    	name: $(this).data('name'),
		    	model: $(this).data('type');
		    }
		    success: function(result) {
		        console.log(result);
		        $(this).parent().slideUp('slow');
		    }
		});
	});

	$('button').on('submit', function(event){
		event.preventDefault();
		alert($(this).closest('form').data('action'));
	});
});