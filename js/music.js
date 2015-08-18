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
var audioplayertext = document.getElementById('audioplayertext');
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
function play(track) {
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
        pButton.className = "pause";
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
                audioplayertext.innerHTML = "<b>Oaffy's Parade</b><br>Jimmy Fontana";
                break;
            case 2:
                btn1.className="play";
                btn2.className="pause";
                btn3.className="play";
                btn4.className="play";
                audioplayertext.innerHTML = "<b>Reggaeton O' Bricks</b><br>Jimmy Fontana";
                break;
            case 3:
                btn1.className="play";
                btn2.className="play";
                btn3.className="pause";
                btn4.className="play";
                audioplayertext.innerHTML = "<b>ScattafIya</b><br>Jimmy Fontana";
                break;
            case 4:
                btn1.className="play";
                btn2.className="play";
                btn3.className="play";
                btn4.className="pause";
                audioplayertext.innerHTML = "<b>Wooks and Grannies</b><br>Jimmy Fontana";
                break;
        }
    } else { // pause music
        music.pause();
        // remove pause, add play
        pButton.className = "play";
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


// Gets audio file duration
music.addEventListener("canplaythrough", function () {
    duration = music.duration;
}, false);

$('#playButton').click(function() {
    play();
});


