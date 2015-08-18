var music = document.getElementById('music'); // id for audio element
var duration; // Duration of audio clip
var pButton = document.getElementById('pButton'); // play button
var tempButton = document.getElementById('tempButton'); //temp
                                         
var playhead = document.getElementById('playhead'); // playhead

var timeline = document.getElementById('timeline'); // timeline
// timeline width adjusted for playhead
var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

var audioplayer = document.getElementById('audioplayer');
var timetext = document.getElementById('timetext');
// timeupdate event listener
music.addEventListener("timeupdate", timeUpdate, false);

//Makes timeline clickable
timeline.addEventListener("click", function (event) {
    moveplayhead(event);
    music.currentTime = duration * clickPercent(event);
}, false);

// returns click as decimal (.77) of the total timelineWidth
function clickPercent(e) {
    return (e.pageX - timeline.offsetLeft) / timelineWidth;
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
    if (music.currentTime == duration) {
        pButton.className = "";
        pButton.className = "play";
    }
    var mins = Math.round(music.currentTime/60);
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
function play() {
    // start music
    if (music.paused) {
        audioplayer.className="";
        timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
        music.play();
        // remove play, add pause
        pButton.className = "";
        pButton.className = "pause";
        tempButton.className = "";
        tempButton.className = "pause";
    } else { // pause music
        music.pause();
        // remove pause, add play
        pButton.className = "";
        pButton.className = "play";
        tempButton.className = "";
        tempButton.className = "play";
    }
}


// Gets audio file duration
music.addEventListener("canplaythrough", function () {
    duration = music.duration;
}, false);

$('#playButton').click(function() {
    play();
});


