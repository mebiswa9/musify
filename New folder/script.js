const music = document.querySelector('audio');
const coverImg = document.getElementById('img');
const play = document.getElementById('play');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const songName = document.getElementById('songName');
const artist = document.getElementById('artist');

const loopIcon = document.getElementById('loop');

const songList = document.getElementById('songList');

const songListbox = document.getElementById('songListbox');

const cross = document.getElementById('cross');

const progressBar = document.getElementById('progressBar');

let progress = document.getElementById('progress');

let totalDuration = document.getElementById('duration');
let totalcurrentTime = document.getElementById('currentTime');

//array of songs
const songs = [
	{
		name: '1',
		songName: 'chole gatho tate ki',
		artist: 'keshab dey',
	},
	{
		name: '2',
		songName: 'dhoom machale ',
		artist: 'shankar mahadeban',
	},
	{
		name: '3',
		songName: 'jal rahe hai diye ',
		artist: 'kailash khar',
	},
	{
		name: '4',
		songName: 'jai jai shiv shankar',
		artist: 'vishal dadlani',
	},
	{
		name: '5',
		songName: 'aila re aila',
		artist: 'daler mehendi',
	},
	{
		name: '6',
		songName: 'gali gali',
		artist: 'neha kakkar',
	},
	{
		name: '7',
		songName: 'jago jago bakre',
		artist: 'vishal dadlani',
	},
];
//change the music
const loadSong = (songs) => {
	songName.textContent = songs.songName;
	artist.textContent = songs.artist;
	img.src = 'cover/' + songs.name + '.jfif';
	music.src = 'song/' + songs.name + '.mp3';
};
// loadSong(songs[7]);

//playing
let isPlaying = false;
//event for play
const playMusic = () => {
	isPlaying = true;
	music.play();
	play.classList.replace('fa-play', 'fa-pause');
	coverImg.classList.add('anime');
};
//event for pause
const pauseMusic = () => {
	isPlaying = false;
	music.pause();
	play.classList.replace('fa-pause', 'fa-play');
	coverImg.classList.remove('anime');
};
//play or pause
play.addEventListener('click', () => {
	if (isPlaying) {
		pauseMusic();
	} else {
		playMusic();
	}
});

//next song event
const nextSong = () => {
	songsIndex = (songsIndex + 1) % songs.length;
	loadSong(songs[songsIndex]);
	playMusic();
};
//next song event
const prevSong = () => {
	songsIndex = (songsIndex - 1 + songs.length) % songs.length;
	loadSong(songs[songsIndex]);
	playMusic();
};
//progressbar
music.addEventListener('timeupdate', (e) => {
	// console.log(e);
	const { currentTime, duration } = e.srcElement;
	let progressTime = (currentTime / duration) * 100;
	progress.style.width = `${progressTime}%`;
	console.log(progressTime);
	//duration
	let minDuration = Math.floor(duration / 60);
	let secDuration = Math.floor(duration % 60);
	if (secDuration < 10) {
		secDuration = `0${secDuration}`;
	}
	let totalTimeDuration = `${minDuration} : ${secDuration}`;
	if (duration) {
		totalDuration.textContent = `${totalTimeDuration}`;
	}
	//current time
	let mincurrentTime = Math.floor(currentTime / 60);
	let seccurrentTime = Math.floor(currentTime % 60);
	if (seccurrentTime < 10) {
		seccurrentTime = `0${seccurrentTime}`;
	}
	let totalTimecurrentTime = `${mincurrentTime} : ${seccurrentTime}`;
	if (currentTime) {
		totalcurrentTime.textContent = `${totalTimecurrentTime}`;
	}
});

progressBar.addEventListener('click', (e) => {
	const duration = music.duration;
	let moveProgress = (e.offsetX / e.srcElement.clientWidth) * duration;
	music.currentTime = moveProgress;
});

music.addEventListener('ended', () => {
	if (isLooped) {
		loopStart();
	} else {
		nextSong();
	}
});
//next and prev event
songsIndex = 0;
next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);

let isLooped = false;
//loopstart
const loopStart = (e) => {
	isLooped = true;
	loopIcon.classList.replace('fa-repeat', 'fa-random');
	songsIndex = songsIndex % songs.length;
	loadSong(songs[songsIndex]);
	playMusic();
};
//loopend
const loopEnd = () => {
	isLooped = false;
	loopIcon.classList.replace('fa-random', 'fa-repeat');
};
//loop or not
loopIcon.addEventListener('click', () => {
	if (isLooped) {
		loopEnd();
	} else {
		loopStart();
	}
});

songList.addEventListener('click', () => {
	songListbox.classList.toggle('show');
});
cross.addEventListener('click', () => {
	songList.click();
});
