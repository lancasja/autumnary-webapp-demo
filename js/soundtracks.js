(function() {

	var selectSong = $('.fa.fa-plus');
	var playButton = $('td.play');

	// when one of the add icons are clicked
	selectSong.each(function(index) {
		$(this).click(function() {
			// go to the confirmation page
			window.location = 'confirmation.html';
		});
	});

	/* angular */
	var app = angular.module('autumnaryApp', []);

	app.run(function() {
		SC.initialize({
			client_id: "61efae1f014bd2b6765361f9f9aecd47",
			redirect_uri: "callback.html"
		});
	});

	app.controller('ScController', function($scope, $http) {

		$scope.playing = false;

		var scUrl = 'https://api.soundcloud.com';
		var clientId = '61efae1f014bd2b6765361f9f9aecd47';
		var request = '/playlists/58826749'

		$http({
			method: 'GET',
			url: scUrl + request + '.json?client_id=' + clientId
		})
		.success(function(data) {
			$scope.playlist = data.tracks;
			console.log('success!');
		})
		.error(function(err) {
			console.log('There was an error:', err);
		}); // -- end $http

		$scope.playTrack = function(track) {
			var streamUrl = track.stream_url;
			var com = streamUrl.indexOf('.com');
			var path = streamUrl.substring(com + 4, streamUrl.length);

			SC.stream(path, function(sound) {
				if ($scope.playing) {
					sound.stop();
					$scope.playing = false;
					console.log($scope.playing);
				}
				else {
					sound.play();
					$scope.playing = true;
					console.log($scope.playing);
				}
			});
		};
	}); // -- end ScController
})();