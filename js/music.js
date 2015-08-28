var music = document.getElementById('music'); // id for audio element
var duration; // Duration of audio clip
var pButton = document.getElementById('pButton'); // play button
var btn1 = document.getElementById('btn1'); //oaffysparade
var btn2 = document.getElementById('btn2'); //reggaeton O'Bricks
var btn3 = document.getElementById('btn3'); //scattaflya
var btn4 = document.getElementById('btn4'); //wooks and grannies                                        
var playhead = document.getElementById('playhead'); // playhead
var timeline = document.getElementById('timeline'); // timeline
// timeline width adjusted for playhead
var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
var audioplayer = document.getElementById('audioplayer');
var timetext = document.getElementById('timetext');
var progress = document.getElementById('progress');
var trackArtist = document.getElementById('track-artist');
var trackTitle = document.getElementById('track-title');
var albumArt = document.getElementById('album-art');

//analyser variables
var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

// Initialize the MP3 player after the page loads all of its HTML into the window
window.addEventListener("load", initMp3Player, false);
function initMp3Player(){
	context = new webkitAudioContext(); // AudioContext object instance
	analyser = context.createAnalyser(); // AnalyserNode method
	canvas = document.getElementById('analyser_render');
    canvas.style.width = window.innerWidth - 117 + "px";
	ctx = canvas.getContext('2d');
	// Re-route audio playback into the processing graph of the AudioContext
	source = context.createMediaElementSource(music); 
	source.connect(analyser);
	analyser.connect(context.destination);
	frameLooper();
}
// frameLooper() animates any style of graphics you wish to the audio frequency
// Looping at the default frame rate that the browser provides(approx. 60 FPS)
function frameLooper(){
	window.webkitRequestAnimationFrame(frameLooper);
	fbc_array = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(fbc_array);
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
	ctx.fillStyle = '#ffffff'; // Color of the bars
	bars = 100;
	for (var i = 0; i < bars; i++) {
		bar_x = i * 3;
		bar_width = 2;
		bar_height = -(fbc_array[i] / 2);
		//  fillRect( x, y, width, height ) // Explanation of the parameters below
		ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
	}
}


// timeupdate event listener
music.addEventListener("timeupdate", timeUpdate, false);

//Makes timeline clickable
timeline.addEventListener("click", function (event) {
    moveplayhead(event);
    music.currentTime = duration * clickPercent(event);
}, false);

// returns click as decimal (.77) of the total timelineWidth
function clickPercent(e) {
    return (e.pageX - (timeline.offsetLeft + audioplayer.offsetLeft)) / timelineWidth;
}

// Makes playhead draggable
playhead.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

// Boolean value so that mouse is moved on mouseUp only when the playhead is released
var onplayhead = false;
// mouseDown EventListener
function mouseDown() {
    onplayhead = true;
    window.addEventListener('mousemove', moveplayhead, true);
    music.removeEventListener('timeupdate', timeUpdate, false);
}
// mouseUp EventListener
// getting input from all mouse clicks
function mouseUp(e) {
    if (onplayhead == true) {
        moveplayhead(e);
        window.removeEventListener('mousemove', moveplayhead, true);
        // change current time
        music.currentTime = duration * clickPercent(e);
        music.addEventListener('timeupdate', timeUpdate, false);
    }
    onplayhead = false;
}
// mousemove EventListener
// Moves playhead as user drags
function moveplayhead(e) {
    var newMargLeft = e.pageX - timeline.offsetLeft;
    if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
        playhead.style.marginLeft = newMargLeft + "px";
    }
    if (newMargLeft < 0) {
        playhead.style.marginLeft = "0px";
    }
    if (newMargLeft > timelineWidth) {
        playhead.style.marginLeft = timelineWidth + "px";
    }
}

// timeUpdate
// Synchronizes playhead position with current point in audio
function timeUpdate() {
    var playPercent = timelineWidth * (music.currentTime / duration);
    playhead.style.marginLeft = playPercent + "px";
    progress.style.width = playPercent + "px";
    if (music.currentTime == duration) {
        pButton.className = "";
        pButton.className = "play-main";
    }
    var mins = Math.floor(music.currentTime/60);
    var secs = Math.round(music.currentTime%60);
    var totalMins = Math.round(duration/60);
    var totalSecs = Math.round(duration%60);
    if (secs<10) {
        secs = "0" + secs;
    }
    if (totalSecs<10) {
        totalSecs = "0" +totalSecs;
    }
    timetext.textContent = mins + ":" + secs + "/" + totalMins + ":" + totalSecs;
}

//Play and Pause
function play(track) {
    if (music.src=="" && track=="0") {
    } else {
    
    if (track !=0) {
        source = "music/" + track + ".mp3";
        if (music.src.indexOf(source) == -1) music.src = source;
    }
    // start music
    if (music.paused) {
        audioplayer.className="";
        timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
        music.play();
        // remove play, add pause
        pButton.className = "pause-main";
        switch(track) {
            case 0:
                var trackNum = parseInt(music.src.substring(music.src.indexOf("music")+6,music.src.indexOf("music")+7));
                switch(trackNum) {
                    case 1:
                        btn1.className="pause";
                        break;
                    case 2:
                        btn2.className="pause";
                        break;
                    case 3:
                        btn3.className="pause";
                        break;
                    case 4:
                        btn4.className="pause";
                        break;
                }
                break;
            case 1:
                btn1.className="pause";
                btn2.className="play";
                btn3.className="play";
                btn4.className="play";
                trackArtist.textContent = "Jimmy Fontana";
                trackTitle.textContent = "Oaffy's Parade";
                albumArt.style.backgroundImage = "url(../img/jimmy_fontana_album.png)";
                break;
            case 2:
                btn1.className="play";
                btn2.className="pause";
                btn3.className="play";
                btn4.className="play";
                trackArtist.textContent = "Jimmy Fontana";
                trackTitle.textContent = "Reggaeton O' Bricks";
                albumArt.style.backgroundImage = "url(../img/jimmy_fontana_album.png)";
                break;
            case 3:
                btn1.className="play";
                btn2.className="play";
                btn3.className="pause";
                btn4.className="play";
                trackArtist.textContent = "Jimmy Fontana";
                trackTitle.textContent = "ScattafIya";
                albumArt.style.backgroundImage = "url(../img/jimmy_fontana_album.png)";
                break;
            case 4:
                btn1.className="play";
                btn2.className="play";
                btn3.className="play";
                btn4.className="pause";
                trackArtist.textContent = "Jimmy Fontana";
                trackTitle.textContent = "Wooks and Grannies";
                albumArt.style.backgroundImage = "url(../img/jimmy_fontana_album.png)";
                break;
        }
    } else { // pause music
        music.pause();
        // remove pause, add play
        pButton.className = "play-main";
        switch(track) {
            case 0:
                btn1.className="play";
                btn2.className="play";
                btn3.className="play";
                btn4.className="play";         
                break;
            case 1:
                btn1.className="play";
                break;
            case 2:
                btn2.className="play";
                break;
            case 3:
                btn3.className="play";
                break;
            case 4:
                btn4.className="play";
                break;
        }
    }
    }
}


// Gets audio file duration
music.addEventListener("canplaythrough", function () {
    duration = music.duration;
}, false);

$('#playButton').click(function() {
    play();
});


