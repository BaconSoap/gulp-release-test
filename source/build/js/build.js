(function($) {
	$(function() {
		console.log('this is file 1');



		
	});
})(jQuery.noConflict());
(function($) {
	$(function() {
		console.log('file 2');
	});
})(jQuery.noConflict());

