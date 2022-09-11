const video = document.querySelector("video");
const videoController = document.getElementById("videoController");
const psBtn = videoController.querySelector("#playPauseBtn");
const volumeBtn = videoController.querySelector("#volume");
const volumeRange = videoController.querySelector("#volumeRange");
const playFullTime = videoController.querySelector("#playPullTime");
const playCurrentTime = videoController.querySelector("#playCurrentTime");
const videoTimeRange = videoController.querySelector("#videoTimeRange");
const videoFullScreenBtn = videoController.querySelector("#videoFullScreenBtn");
const videoWrapper = document.querySelector(".videoWrapper");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayAndStop = () => {
  if (video.paused) {
    video.play();
    psBtn.className = "fas fa-pause";
  } else {
    video.pause();
    psBtn.className = "fas fa-play";
  }
};

const handleSound = () => {
  if (video.muted) {
    video.muted = false;
    volumeRange.value = volumeValue;
    volumeBtn.className = "fas fa-volume-up";
  } else {
    video.muted = true;
    volumeRange.value = 0;
    volumeBtn.className = "fas fa-volume-mute";
  }
};

const handleVolume = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    volumeBtn.className = "fas fa-volume-mute";
  }
  if (value === "0") {
    volumeBtn.className = "fas fa-volume-off";
  } else {
    volumeBtn.className = "fas fa-volume-up";
  }
  video.volume = volumeValue = value;
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(14, 19);

const handleFullTime = () => {
  playFullTime.innerText = formatTime(Math.floor(video.duration));
  videoTimeRange.max = video.duration;
};

const handleTimeUpdate = () => {
  playCurrentTime.innerText = formatTime(Math.floor(video.currentTime));
};

let videoPlayStatus = false;
let setVideoPlayStatus = false;

const handleTimeRange = (event) => {
  const { value } = event.target;
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

const handleFullScreen = () => {
  const fullscreen = document.fullscreenElement;
  fullscreen ? document.exitFullscreen() : videoWrapper.requestFullscreen();
  videoFullScreenBtn.innerText = fullscreen ? "Full" : "Exit";
};

const handleKey = (event) => {
  const { key } = event;
  switch (key) {
    case "f" || "F":
      videoWrapper.requestFullscreen();
      break;
    case "Escape":
      document.exitFullscreen();
      break;
    case " ":
      handlePlayAndStop();
      break;
    default:
      break;
  }
};

psBtn.addEventListener("click", handlePlayAndStop);
volumeBtn.addEventListener("click", handleSound);
volumeRange.addEventListener("input", handleVolume);
video.readyState
  ? handleFullTime()
  : video.addEventListener("loadedmetadata", handleFullTime);
video.addEventListener("timeupdate", handleTimeUpdate);
videoTimeRange.addEventListener("input", handleTimeRange);
videoTimeRange.addEventListener("change", handleTimelineSet);
videoFullScreenBtn.addEventListener("click", handleFullScreen);
window.addEventListener("keydown", handleKey);
