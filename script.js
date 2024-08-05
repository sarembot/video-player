const video = document.getElementById('video');
const playPauseBtn = document.getElementById('play');
const playPauseIcon = document.getElementById('play-pause-icon');
const stopBtn = document.getElementById('stop');
const progress = document.getElementById('progress');
const timeStamp = document.getElementById('timestamp');

// playing and pausing video
function togglePlayPauseIcons() {
  playPauseIcon.classList.toggle('fa-play');
  playPauseIcon.classList.toggle('fa-pause');
}

function playPause() {
  if (playPauseBtn.classList.contains('playing')) {
    togglePlayPauseIcons();
    video.pause();
    playPauseBtn.classList.remove('playing');
    return;
  }

  togglePlayPauseIcons();
  video.play();
  playPauseBtn.classList.add('playing');
}

// stop video
function stop() {
  if (playPauseBtn.classList.contains('playing')) {
    togglePlayPauseIcons();
    video.pause();
    video.currentTime = 0;
    playPauseBtn.classList.remove('playing');
    progress.value = 0;
  }
}

//track time progress
function trackProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercentage = (currentTime / duration) * 100;

  progress.value = progressPercentage;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`; // padStart() - formats each literal in the timestamp to be prefixed with 0 no matter what
  };

  timeStamp.innerText = formatTime(currentTime);
}

// set progress
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = video.duration;

  const time = (clickX / width) * duration;
  video.currentTime = Math.round(time);
}

// Event listeners
playPauseBtn.addEventListener('click', playPause);
stopBtn.addEventListener('click', stop);
video.addEventListener('timeupdate', trackProgress);
video.addEventListener('click', playPause);
progress.addEventListener('click', setProgress);
