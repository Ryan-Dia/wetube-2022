const startBtn = document.querySelector(".startBtn");

const handleStart = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });
};

startBtn.addEventListener("click", handleStart);
