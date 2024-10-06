var arr = [
    {
        songName: 'cry', url: "./music/cry.mp3", img: "./images/cry.webp"
    },
    {
        songName: 'perfect', url: './music/perfect.mp3', img: './images/perfect.jpeg'
    },
    {
        songName: 'i wanna be yours', url: './music/i_wanna_be.mp3', img: './images/i_wanna_be_yours.jpg'
    },
    {
        songName: '505', url: './music/505.mp3', img: './images/505.jpg'
    },
    {
        songName: 'the night we met', url: './music/the_night_we_met.mp3', img: './images/night_we_met.jpeg'
    },
    {
        songName: 'too sweet', url: './music/too_sweet.mp3', img: './images/too_sweet.jpg'
    }
];

var poster = document.querySelector("#poster");
var songs_list = document.getElementsByClassName('songs-list')[0];
var audio = new Audio();
var selectedsong = 0;
var play = document.querySelector("#play");
var back = document.querySelector('#back');
var forward = document.querySelector('#forward');
var timeDisplay = document.getElementById('timeDisplay');

function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if (sec < 10) {
        sec = '0' + sec;
    }
    return `${min}:${sec}`;
}


function mainfunction() {
    var clutter = "";

    arr.forEach(function (elem, index) {
        clutter += `<div class="song-parts d-flex" id="${index}" style="border-top: 1px solid black; padding: 20px 10px 10px 20px;">
                        <h3 style="font-size: 20px;" class="px-5">${index + 1}</h3>
                        <h3 style="font-size: 20px;">${elem.songName}</h3>
                        <h3 style="font-size: 20px;" class="px-5">3:15</h3>
                    </div>`;
    });

    audio.src = arr[selectedsong].url;
    audio.load(); 

    songs_list.innerHTML = clutter;

    poster.style.backgroundImage = `url(${arr[selectedsong].img})`;
    document.body.style.backgroundImage = `url(${arr[selectedsong].img})`;

    forward.style.opacity = 1;
    back.style.opacity = 1;
    songNameDisplay.innerText = arr[selectedsong].songName.replace(/_/g, ' ');  

}

mainfunction();

audio.addEventListener('timeupdate', function () {
    let currentTime = formatTime(audio.currentTime);
    let duration = formatTime(audio.duration);

    if (!isNaN(audio.duration)) {
        timeDisplay.innerHTML = `${currentTime} / ${duration}`;
    } else {
        timeDisplay.innerHTML = `${currentTime} / 0:00`;
    }
});



songs_list.addEventListener('click', function (dets) {
    selectedsong = dets.target.closest('.song-parts').id;
    
    mainfunction();
    audio.play();
    
    play.innerHTML = `<i class="ri-pause-large-line"></i>`;
});

play.addEventListener("click", function() {
    if (audio.paused) {
        audio.play();
        play.innerHTML = `<i class="ri-pause-large-line"></i>`; 
    } else {
        audio.pause();
        play.innerHTML = `<i class="ri-play-large-line"></i>`;  
    }
});


forward.addEventListener("click", function() {
   if (selectedsong < arr.length - 1) {
        selectedsong++;
        mainfunction();
        audio.play();
        play.innerHTML = `<i class="ri-pause-large-line"></i>`;
   } else {
       forward.style.opacity = 0.4; 
   }
});

back.addEventListener("click", function() {
    if (selectedsong > 0) {
        selectedsong--;
        mainfunction();
        audio.play();
        play.innerHTML = `<i class="ri-pause-large-line"></i>`;
    } else {
        back.style.opacity = 0.4;  
    }
});
