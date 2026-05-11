const video = document.getElementById('cardVideo');
const progressBar = document.getElementById('videoProgress');
const timeCounter = document.getElementById('timeCounter');
const mainBtn = document.getElementById('mainToggleBtn');

function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
}

if (video) {
    video.ontimeupdate = () => {
        // تحريك الشريط الأحمر
        const percentage = (video.currentTime / video.duration) * 100;
        progressBar.style.width = percentage + "%";
        
        // تحديث عداد الوقت (الوقت الحالي / الوقت الكلي)
        timeCounter.innerText = formatTime(video.currentTime) + " / " + formatTime(video.duration || 0);
    };

    // إخفاء الزر المركزي عند التشغيل وإظهاره عند الإيقاف (اختياري)
    video.onplay = () => { mainBtn.innerText = "⏸"; mainBtn.style.opacity = "0.3"; };
    video.onpause = () => { mainBtn.innerText = "▶️"; mainBtn.style.opacity = "1"; };
}

function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function seekVideo(e) {
    const area = document.querySelector('.progress-area');
    const rect = area.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
}

window.addEventListener('load', () => {
    const videoUrl = 'https://dn790009.ca.archive.org/0/items/the-looney-tunes-show-season-2-of-2-mkv/The%20Looney%20Tunes%20Show%20-%20S02E01%20-%20Bobcats%20On%20Three.mp4';
    const card = document.getElementById('mediaCard');
    if (card) {
        card.style.display = 'flex';
        video.src = videoUrl;
    }
});
