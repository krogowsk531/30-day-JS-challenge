let player = document.querySelector('.player')
let video = player.querySelector('.viewer')
let progress = player.querySelector('.progress');
let progressBar = player.querySelector('.progress__filled');
let toggle = player.querySelector('.toggle');
let skipButtons = player.querySelectorAll('[data-skip]');
let ranges = player.querySelectorAll('.player__slider');


function togglePlay() {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip)
}

function rangeHandler() {
  video[this.name] = this.value;
}

function progressHandler() {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(event) {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', progressHandler)


toggle.addEventListener('click', togglePlay)
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', rangeHandler))
ranges.forEach(range => range.addEventListener('mousemove', rangeHandler))

let mousedown = false;
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (event) => mousedown && scrub(event))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)
