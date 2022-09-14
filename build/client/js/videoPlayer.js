"use strict";

var video = document.querySelector("video");
var videoController = document.getElementById("videoController");
var psBtn = videoController.querySelector("#playPauseBtn");
var volumeBtn = videoController.querySelector("#volume");
var volumeRange = videoController.querySelector("#volumeRange");
var playFullTime = videoController.querySelector("#playPullTime");
var playCurrentTime = videoController.querySelector("#playCurrentTime");
var videoTimeRange = videoController.querySelector("#videoTimeRange");
var videoFullScreenBtn = videoController.querySelector("#videoFullScreenBtn");
var videoWrapper = document.querySelector(".videoWrapper");
var volumeValue = 0.5;
video.volume = volumeValue;

var handlePlayAndStop = function handlePlayAndStop() {
  if (video.paused) {
    video.play();
    psBtn.className = "fas fa-pause";
  } else {
    video.pause();
    psBtn.className = "fas fa-play";
  }
};

var handleSound = function handleSound() {
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

var handleVolume = function handleVolume(event) {
  var value = event.target.value;

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

var formatTime = function formatTime(seconds) {
  return new Date(seconds * 1000).toISOString().substring(14, 19);
};

var handleFullTime = function handleFullTime() {
  playFullTime.innerText = formatTime(Math.floor(video.duration));
  videoTimeRange.max = video.duration;
  video.play();
};

var handleTimeUpdate = function handleTimeUpdate() {
  playCurrentTime.innerText = formatTime(Math.floor(video.currentTime));
};

var videoPlayStatus = false;
var setVideoPlayStatus = false;

var handleTimeRange = function handleTimeRange(event) {
  var value = event.target.value;

  if (!setVideoPlayStatus) {
    videoPlayStatus = video.paused ? false : true;
    setVideoPlayStatus = true;
  }

  if (!video.paused) video.pause();
  video.currentTime = value;
};

var handleTimelineSet = function handleTimelineSet() {
  videoPlayStatus ? video.play() : video.pause();
  setVideoPlayStatus = false;
};

var handleFullScreen = function handleFullScreen() {
  var fullscreen = document.fullscreenElement;
  fullscreen ? document.exitFullscreen() : videoWrapper.requestFullscreen();
  videoFullScreenBtn.innerText = fullscreen ? "Full" : "Exit";
};

var handleKey = function handleKey(event) {
  var key = event.key;

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
video.readyState ? handleFullTime() : video.addEventListener("loadedmetadata", handleFullTime);
video.addEventListener("timeupdate", handleTimeUpdate);
videoTimeRange.addEventListener("input", handleTimeRange);
videoTimeRange.addEventListener("change", handleTimelineSet);
videoFullScreenBtn.addEventListener("click", handleFullScreen);
window.addEventListener("keydown", handleKey);