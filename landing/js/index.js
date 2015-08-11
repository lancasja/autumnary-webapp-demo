(function() {

	var loginBtn = $('#login-btn');
	var signinModal = $('#signinModal');

	loginBtn.click(function(e) {
		e.preventDefault();
		
		signinModal.toggleClass('fadeInDown');
	});

})();