const video = document.getElementById('cardVideo');
const progressBar = document.getElementById('videoProgress');
const timeCounter = document.getElementById('timeCounter');
const playBtn = document.getElementById('playBtn');
const muteBtn = document.getElementById('muteBtn');

function togglePlay() {
    if (video.paused) {
        video.play();
        playBtn.innerText = "II";
    } else {
        video.pause();
        playBtn.innerText = "▶";
    }
}

function toggleMute() {
    video.muted = !video.muted;
    muteBtn.innerText = video.muted ? "🔇" : "🔊";
}

function formatTime(s) {
    let m = Math.floor(s / 60);
    s = Math.floor(s % 60);
    return (m < 10 ? "0"+m : m) + ":" + (s < 10 ? "0"+s : s);
}

if (video) {
    video.ontimeupdate = () => {
        const p = (video.currentTime / video.duration) * 100;
        progressBar.style.width = p + "%";
        timeCounter.innerText = formatTime(video.currentTime);
    };
}

function seekVideo(e) {
    const area = document.querySelector('.progress-area');
    const rect = area.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
}

window.addEventListener('load', () => {
    video.src = "https://dn790009.ca.archive.org/0/items/the-looney-tunes-show-season-2-of-2-mkv/The%20Looney%20Tunes%20Show%20-%20S02E01%20-%20Bobcats%20On%20Three.mp4";
    document.getElementById('mediaCard').style.display = 'flex';
});
