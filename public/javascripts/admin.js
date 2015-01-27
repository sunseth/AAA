$(document).ready(function(){
	$('.event-el-name:last').css('border-bottom', 'none');
	$('.family-el-name:last').css('border-bottom', 'none');
	$('.committee-el-name:last').css('border-bottom', 'none');
	$('.cabinet-el-name:last').css('border-bottom', 'none');
	$('.media-el-name:last').css('border-bottom', 'none');

	$('.delete-button').click(function(){
		console.log($(this).data('name'));
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
		    success: function(result) {
		        $parent.hide();
		    }
		});
	});
});