function showMediaCard(type, url) {
    const card = document.getElementById('mediaCard');
    const video = document.getElementById('cardVideo');

    if (!card) return;
    card.style.display = 'flex';

    if (type === 'video') {
        video.src = url;
        video.play().catch(e => console.log("بانتظار تفاعل المستخدم"));
    }
}

function closeMediaCard() {
    const card = document.getElementById('mediaCard');
    const video = document.getElementById('cardVideo');
    if (card) card.style.display = 'none';
    if (video) video.pause();
}

// وظائف الأزرار
function playVideo() {
    document.getElementById('cardVideo').play();
}

function pauseVideo() {
    document.getElementById('cardVideo').pause();
}

function toggleMute() {
    const video = document.getElementById('cardVideo');
    video.muted = !video.muted;
}

// تشغيل تلقائي عند التحميل
window.addEventListener('load', () => {
    showMediaCard('video', 'https://dn790009.ca.archive.org/0/items/the-looney-tunes-show-season-2-of-2-mkv/The%20Looney%20Tunes%20Show%20-%20S02E01%20-%20Bobcats%20On%20Three.mp4');
});
