(function() {
	var drawer = $('.drawer');
	var menuButton = $('.menu-button');

	menuButton.click(function() {
		drawer.toggleClass('open');
	});
})();