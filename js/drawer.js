(function() {

	var menuButton = $('#menuButton');
	var drawer = $('#drawer');

	menuButton.click(function(event) {
		event.preventDefault();

		// if the menu button is clicked and drawer is closed
		if (!drawer.hasClass('open-drawer')) {
			// open the drawer
			drawer.addClass('open-drawer');

			if (drawer.hasClass('close-drawer')) {
				drawer.removeClass('close-drawer');
			}
			// move the icon
			$(this).css('right', '10px');
		}
		else {
			// otherwise close it
			drawer.addClass('close-drawer');

			if (drawer.hasClass('open-drawer')) {
				drawer.removeClass('open-drawer');
			}
			// and move the icon back
			$(this).css('right', '-16px');
		}
	});



})();