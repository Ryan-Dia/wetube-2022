const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let globalVolume = 0.5;
video.volume = globalVolume;

const handlePlay = (e) => {
  if (video.paused) video.play();
  else video.pause();
  playBtn.innerHTML = video.paused ? "Play" : "Pused";
};

const handleMute = (e) => {
  if (video.muted) video.muted = false;
  else video.muted = true;
  muteBtn.innerText = video.muted ? "UnMute" : "Mute";
  volumeRange.value = video.muted ? 0 : globalVolume;
};

const handleVolumeChange = (event) => {
  const { value } = event.target;
  muteBtn.innerText = "Mute";
  video.muted = false;
  globalVolume = value;
  video.volume = value;
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(14, 19);

const handleLoadedMetadata = () => {
  totalTime.innerText = `${parseInt(video.duration / 60)}:${(
    video.duration % 60
  ).toFixed()}`;
  timeline.max = video.duration;
};

const handleTimeUpdate = () => {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
  /*  if (parseInt(video.currentTime) < 10) {
    currenTime.innerText = `0:0${parseInt(video.currentTime)}`;
  } else if (
    parseInt(video.currentTime) >= 10 &&
    parseInt(video.currentTime) < 60
  ) {
    currenTime.innerText = `0:${parseInt(video.currentTime)}`;
  } else {
    if (parseInt(video.currentTime % 60) < 10) {
      currenTime.innerText = `${parseInt(video.currentTime / 60)}:0${parseInt(
        video.currentTime % 60
      )}`;
    } else {
      currenTime.innerText = `${parseInt(video.currentTime / 60)}:${parseInt(
        video.currentTime % 60
      )}`;
    }
  } */
};

let videoPlayStatus = false;
let setVideoPlayStatus = false;

const handleTimeLineChange = (event) => {
  const {
    target: { value },
  } = event;
  if (!setVideoPlayStatus) {
    videoPlayStatus = video.paused ? false : true;
    setVideoPlayStatus = true;
  }
  if (!video.paused) video.pause();
  video.currentTime = value;
};

const handleTimelineSet = () => {
  videoPlayStatus ? video.play() : video.pause();
  setVideoPlayStatus = false;
};

const handleEnteFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  fullscreen ? document.exitFullscreen() : videoContainer.requestFullscreen();
  fullScreenBtn.innerText = fullscreen
    ? "Enter Full Screen"
    : "Exit FUll Screen";
};

let controlsMovementTimeout = null;

const handleMouseMove = () => {
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(() => {
    videoControls.classList.remove("showing");
  }, 3000);
};

const handleMouseLeave = () => {
  videoControls.classList.remove("showing");
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.readyState
  ? handleLoadedMetadata()
  : video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimeLineChange);
timeline.addEventListener("change", handleTimelineSet);
fullScreenBtn.addEventListener("click", handleEnteFullscreen);
video.addEventListener("ended", handleEnded);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
