const video = document.getElementById('cardVideo');
const card = document.getElementById('mediaCard');

function togglePlay() {
    if (video.paused) {
        video.play();
        // تأثير بصري خفيف عند التشغيل (اختياري)
        card.style.borderColor = "rgba(255, 255, 255, 0.4)";
    } else {
        video.pause();
        // تأثير بصري خفيف عند الإيقاف (اختياري)
        card.style.borderColor = "rgba(255, 255, 255, 0.1)";
    }
}

window.addEventListener('load', () => {
    // الفيديو اللي اخترناه سوا
    video.src = "https://dn790009.ca.archive.org/0/items/the-looney-tunes-show-season-2-of-2-mkv/The%20Looney%20Tunes%20Show%20-%20S02E01%20-%20Bobcats%20On%20Three.mp4";
    card.style.display = 'flex';
});
