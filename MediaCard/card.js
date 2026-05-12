const video = document.getElementById('cardVideo');
const card = document.getElementById('mediaCard');
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzU6hOGVr3I3278VafOxBuIjIxYxi4OupXDP1rtPDRewlMEHzQjU4c19lJMILWpvHEITg/exec";

// دالة جلب البيانات من Google Sheets
async function fetchVideoData() {
    try {
        const response = await fetch(SCRIPT_URL);
        const data = await response.json();

        if (data && data.length > 0) {
            // نأخذ رابط الفيديو من أول صف في ورقة Videos
            video.src = data[0].videoUrl;
            video.load();
            card.style.display = 'block'; // إظهار الكرت بعد جاهزية البيانات
        }
    } catch (error) {
        console.error("خطأ في الاتصال بـ Google Sheets:", error);
    }
}

// التحكم في التشغيل والإيقاف
function togglePlay() {
    if (video.paused) {
        video.play();
        card.style.borderColor = "rgba(255, 255, 255, 0.4)";
        document.getElementById('playBtn').innerText = "⏸";
    } else {
        video.pause();
        card.style.borderColor = "rgba(255, 255, 255, 0.1)";
        document.getElementById('playBtn').innerText = "▶";
    }
}

// التحكم في كتم الصوت
function toggleMute() {
    video.muted = !video.muted;
    document.getElementById('muteBtn').innerText = video.muted ? "🔇" : "🔊";
}

// التشغيل عند تحميل المكون
window.addEventListener('load', fetchVideoData);
