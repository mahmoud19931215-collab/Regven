function showMediaCard(type, url) {
    const card = document.getElementById('mediaCard');
    const video = document.getElementById('cardVideo');
    const image = document.getElementById('cardImage');

    card.style.display = 'flex';

    if (type === 'video') {
        video.style.display = 'block';
        image.style.display = 'none';
        video.src = url;
        video.play();
    } else if (type === 'image') {
        image.style.display = 'block';
        video.style.display = 'none';
        image.src = url;
    }
}

function closeMediaCard() {
    const card = document.getElementById('mediaCard');
    const video = document.getElementById('cardVideo');
    card.style.display = 'none';
    video.pause(); // إيقاف الفيديو عند الإغلاق
}

// مثال للتشغيل (يمكنك مسح هذا السطر وتشغيله من أي مكان)
// showMediaCard('video', 'https://www.w3schools.com/html/mov_bbb.mp4');