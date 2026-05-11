const video = document.getElementById('cardVideo');
const progressBar = document.getElementById('videoProgress');

// تحديث شريط التقدم مع حركة الفيديو
if (video) {
    video.ontimeupdate = () => {
        const percentage = (video.currentTime / video.duration) * 100;
        progressBar.style.width = percentage + "%";
    };
}

function playVideo() { video.play(); }
function pauseVideo() { video.pause(); }

function toggleMute() {
    video.muted = !video.muted;
}

function changeVolume(val) {
    video.volume = val;
    video.muted = false;
}

// التقديم والتأخير عند الضغط على الشريط
function seekVideo(e) {
    const area = document.querySelector('.progress-area');
    const rect = area.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
}

function showMediaCard(type, url) {
    const card = document.getElementById('mediaCard');
    if (card) {
        card.style.display = 'flex';
        video.src = url;
        video.play().catch(() => console.log("بانتظار تفاعل المستخدم"));
    }
}

// إزالة زر الإغلاق بناءً على طلبك
function closeMediaCard() {
    // تم التعطيل بناءً على رغبة المعلم محمود
}

window.addEventListener('load', () => {
    showMediaCard('video', 'https://dn790009.ca.archive.org/0/items/the-looney-tunes-show-season-2-of-2-mkv/The%20Looney%20Tunes%20Show%20-%20S02E01%20-%20Bobcats%20On%20Three.mp4');
});
