function showMediaCard(type, url) {
    const card = document.getElementById('mediaCard');
    const video = document.getElementById('cardVideo');
    const image = document.getElementById('cardImage');

    if (!card) return; // لضمان عدم حدوث خطأ إذا لم يجد العنصر

    card.style.display = 'flex';

    if (type === 'video') {
        video.style.display = 'block';
        image.style.display = 'none';
        video.src = url;
        video.play().catch(error => console.log("تحتاج لتفاعل المستخدم لتشغيل الصوت: ", error));
    } else if (type === 'image') {
        image.style.display = 'block';
        video.style.display = 'none';
        image.src = url;
    }
}

function closeMediaCard() {
    const card = document.getElementById('mediaCard');
    const video = document.getElementById('cardVideo');
    if (card) card.style.display = 'none';
    if (video) video.pause();
}

// سطر التشغيل التلقائي عند فتح الصفحة:
window.addEventListener('load', () => {
    // سيقوم بتشغيل الفيديو الذي وضعته أنت في ملف index.html
    showMediaCard('video', 'https://dn790009.ca.archive.org/0/items/the-looney-tunes-show-season-2-of-2-mkv/The%20Looney%20Tunes%20Show%20-%20S02E01%20-%20Bobcats%20On%20Three.mp4');
});
