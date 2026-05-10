function showMediaCard(type, url) {
    const card = document.getElementById('mediaCard');
    const video = document.getElementById('cardVideo');
    const image = document.getElementById('cardImage');

    if (!card) return;

    card.style.display = 'flex';

    if (type === 'video') {
        video.style.display = 'block';
        image.style.display = 'none';
        video.src = url;
        
        // محاولة التشغيل
        video.play().catch(error => {
            console.log("التشغيل التلقائي بالصوت محظور، سيتم التشغيل صامتاً حتى يتفاعل المستخدم.");
        });
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

// الحل السحري للصوت: إلغاء الكتم عند أول لمسة للشاشة
window.addEventListener('click', () => {
    const video = document.getElementById('cardVideo');
    if (video && video.muted) {
        video.muted = false; // إلغاء الكتم
        video.play();       // التأكد من أنه يعمل
    }
}, { once: true }); // true تعني أن هذا الأمر سينفذ لمرة واحدة فقط عند أول ضغطة

window.addEventListener('load', () => {
    showMediaCard('video', 'https://dn790009.ca.archive.org/0/items/the-looney-tunes-show-season-2-of-2-mkv/The%20Looney%20Tunes%20Show%20-%20S02E01%20-%20Bobcats%20On%20Three.mp4');
});
