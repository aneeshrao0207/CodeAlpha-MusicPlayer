// ================================
// MUSIC PLAYER - CODEALPHA
// Developed by Aneesh Rao S V
// ================================

// ---------- SONG LIST ----------

const songs = [

{
    title:"Dream Escape",
    artist:"Alex Productions",
    src:"music/song1.mp3",
    cover:"images/cover1.jpg"
},

{
    title:"Night Drive",
    artist:"SoulProdMusic",
    src:"music/song2.mp3",
    cover:"images/cover2.jpg"
},

{
    title:"Summer Chill",
    artist:"LesFM",
    src:"music/song3.mp3",
    cover:"images/cover3.jpg"
},

{
    title:"Future Bass",
    artist:"Music Unlimited",
    src:"music/song4.mp3",
    cover:"images/cover4.jpg"
},

{
    title:"Morning Coffee",
    artist:"Olexy",
    src:"music/song5.mp3",
    cover:"images/cover5.jpg"
}

];

// ---------- ELEMENTS ----------

const audio=document.getElementById("audio");

const cover=document.getElementById("cover");

const title=document.getElementById("title");

const artist=document.getElementById("artist");

const playBtn=document.getElementById("play");

const prevBtn=document.getElementById("prev");

const nextBtn=document.getElementById("next");

const shuffleBtn=document.getElementById("shuffle");

const repeatBtn=document.getElementById("repeat");

const favoriteBtn=document.getElementById("favorite");

const muteBtn=document.getElementById("mute");

const themeBtn=document.getElementById("themeBtn");

const volume=document.getElementById("volume");

const progress=document.getElementById("progress");

const progressContainer=document.getElementById("progressContainer");

const playlist=document.getElementById("playlist");

const currentTime=document.getElementById("currentTime");

const duration=document.getElementById("duration");

const visualizer=document.querySelector(".visualizer");

// ---------- VARIABLES ----------

let currentSong=0;

let isPlaying=false;

let isShuffle=false;

let isRepeat=false;

let isFavorite=false;

// ---------- LOAD SAVED SETTINGS ----------

const savedSong=localStorage.getItem("currentSong");

const savedTheme=localStorage.getItem("theme");

if(savedSong){

    currentSong=parseInt(savedSong);

}

if(savedTheme==="dark"){

    document.body.classList.add("dark");

    themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';

}

// ---------- INITIALIZE ----------

loadSong(currentSong);

createPlaylist();

audio.volume=1;
volume.value=1;

// ================================
// LOAD SONG
// ================================

function loadSong(index){

    audio.src=songs[index].src;

    cover.src=songs[index].cover;

    title.textContent=songs[index].title;

    artist.textContent=songs[index].artist;

    localStorage.setItem("currentSong",index);

    updatePlaylist();

}
// ================================
// PLAY SONG
// ================================

function playSong(){

    audio.play();

    isPlaying=true;

    playBtn.innerHTML='<i class="fa-solid fa-pause"></i>';

    cover.classList.add("playing");

    visualizer.style.opacity="1";

}

// ================================
// PAUSE SONG
// ================================

function pauseSong(){

    audio.pause();

    isPlaying=false;

    playBtn.innerHTML='<i class="fa-solid fa-play"></i>';

    cover.classList.remove("playing");

    visualizer.style.opacity=".4";

}

// ================================
// PLAY BUTTON
// ================================

playBtn.addEventListener("click",()=>{

    if(isPlaying){

        pauseSong();

    }

    else{

        playSong();

    }

});

// ================================
// NEXT SONG
// ================================

nextBtn.addEventListener("click",()=>{

    if(isShuffle){

        currentSong=Math.floor(Math.random()*songs.length);

    }

    else{

        currentSong++;

        if(currentSong>=songs.length){

            currentSong=0;

        }

    }

    loadSong(currentSong);

    playSong();

});

// ================================
// PREVIOUS SONG
// ================================

prevBtn.addEventListener("click",()=>{

    currentSong--;

    if(currentSong<0){

        currentSong=songs.length-1;

    }

    loadSong(currentSong);

    playSong();

});

// ================================
// PROGRESS UPDATE
// ================================

audio.addEventListener("timeupdate",()=>{

    if(audio.duration){

        const percent=(audio.currentTime/audio.duration)*100;

        progress.style.width=percent+"%";

    }

    currentTime.textContent=formatTime(audio.currentTime);

    duration.textContent=formatTime(audio.duration);

});

// ================================
// SEEK BAR
// ================================

progressContainer.addEventListener("click",(e)=>{

    const width=progressContainer.clientWidth;

    const clickX=e.offsetX;

    audio.currentTime=(clickX/width)*audio.duration;

});

// ================================
// SONG ENDED
// ================================

audio.addEventListener("ended",()=>{

    if(isRepeat){

        audio.currentTime=0;

        playSong();

        return;

    }

    nextBtn.click();

});

// ================================
// FORMAT TIME
// ================================

function formatTime(time){

    if(isNaN(time)) return "0:00";

    const min=Math.floor(time/60);

    const sec=Math.floor(time%60);

    return `${min}:${sec<10?"0"+sec:sec}`;

}
// ================================
// CREATE PLAYLIST
// ================================

function createPlaylist(){

    playlist.innerHTML="";

    songs.forEach((song,index)=>{

        const li=document.createElement("li");

        li.innerHTML=`
            <i class="fa-solid fa-music"></i>
            <span>${song.title}</span>
        `;

        li.addEventListener("click",()=>{

            currentSong=index;

            loadSong(currentSong);

            playSong();

        });

        playlist.appendChild(li);

    });

}

// ================================
// UPDATE PLAYLIST
// ================================

function updatePlaylist(){

    const items=document.querySelectorAll("#playlist li");

    items.forEach((item,index)=>{

        if(index===currentSong){

            item.classList.add("active");

            item.innerHTML=`
                <i class="fa-solid fa-play"></i>
                <span>${songs[index].title}</span>
            `;

        }

        else{

            item.classList.remove("active");

            item.innerHTML=`
                <i class="fa-solid fa-music"></i>
                <span>${songs[index].title}</span>
            `;

        }

    });

}

// ================================
// VOLUME
// ================================

volume.addEventListener("input",()=>{

    audio.volume=volume.value;

});

// ================================
// MUTE
// ================================

muteBtn.addEventListener("click",()=>{

    if(audio.volume>0){

        audio.volume=0;

        volume.value=0;

        muteBtn.innerHTML='<i class="fa-solid fa-volume-xmark"></i>';

    }

    else{

        audio.volume=1;

        volume.value=1;

        muteBtn.innerHTML='<i class="fa-solid fa-volume-high"></i>';

    }

});

// ================================
// SHUFFLE
// ================================

shuffleBtn.addEventListener("click",()=>{

    isShuffle=!isShuffle;

    shuffleBtn.classList.toggle("active-btn");

});

// ================================
// REPEAT
// ================================

repeatBtn.addEventListener("click",()=>{

    isRepeat=!isRepeat;

    repeatBtn.classList.toggle("active-btn");

});

// ================================
// FAVORITE
// ================================

favoriteBtn.addEventListener("click",()=>{

    isFavorite=!isFavorite;

    if(isFavorite){

        favoriteBtn.innerHTML='<i class="fa-solid fa-heart"></i>';

        favoriteBtn.classList.add("active-btn");

    }

    else{

        favoriteBtn.innerHTML='<i class="fa-regular fa-heart"></i>';

        favoriteBtn.classList.remove("active-btn");

    }

});

// ================================
// DARK MODE
// ================================

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

        themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';

    }

    else{

        localStorage.setItem("theme","light");

        themeBtn.innerHTML='<i class="fa-solid fa-moon"></i>';

    }

});

// ================================
// KEYBOARD SHORTCUTS
// ================================

document.addEventListener("keydown",(e)=>{

    switch(e.code){

        case "Space":

            e.preventDefault();

            playBtn.click();

            break;

        case "ArrowRight":

            nextBtn.click();

            break;

        case "ArrowLeft":

            prevBtn.click();

            break;

        case "ArrowUp":

            audio.volume=Math.min(audio.volume+0.1,1);

            volume.value=audio.volume;

            break;

        case "ArrowDown":

            audio.volume=Math.max(audio.volume-0.1,0);

            volume.value=audio.volume;

            break;

    }

});

// ================================
// INITIAL VISUALIZER STATE
// ================================

visualizer.style.opacity=".4";

