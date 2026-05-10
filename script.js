const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let width, height, isDay = false; 
let stars = [], clouds = [];
let moonX; // متغير لموقع القمر

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    moonX = width * 0.8; // موقع البداية للقمر
    initElements();
}

function initElements() {
    stars = []; clouds = [];
    // نجوم الليل
    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.8,
            opacity: Math.random(),
            speed: 0.008 + Math.random() * 0.02
        });
    }
    // غيوم النهار الثابتة
    for (let i = 0; i < 5; i++) {
        clouds.push({
            x: Math.random() * width,
            y: Math.random() * (height / 3),
            speed: 0.3 + Math.random() * 0.5,
            size: 40
        });
    }
}

function toggleMode() {
    isDay = !isDay;
    
    // تبديل ملف الـ CSS برمجياً
    const styleLink = document.getElementById('theme-style');
    if (isDay) {
        styleLink.href = "style.css";
    } else {
        styleLink.href = "style2.css";
    }
    
    initElements();
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    if (isDay) {
        // نهار (ألوانك المفضلة)
        let grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, "#4facfe");
        grad.addColorStop(1, "#00f2fe");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        clouds.forEach(c => {
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.size, 0, Math.PI*2);
            ctx.arc(c.x+30, c.y-10, c.size, 0, Math.PI*2);
            ctx.arc(c.x+60, c.y, c.size, 0, Math.PI*2);
            ctx.fill();
            c.x += c.speed;
            if (c.x > width + 100) c.x = -150;
        });
    } else {
        // ليل مطور
        let grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, "#020205");
        grad.addColorStop(1, "#101025");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        stars.forEach(s => {
            s.opacity += s.speed;
            if (s.opacity > 1 || s.opacity < 0.2) s.speed *= -1;
            ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI*2);
            ctx.fill();
        });

        // القمر الكبير المتحرك مع توهج
        ctx.save();
        ctx.shadowBlur = 30;
        ctx.shadowColor = "white";
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(moonX, 120, 50, 0, Math.PI*2); // كبرنا الحجم لـ 50
        ctx.fill();
        ctx.restore();

        moonX -= 0.05; // حركة بطيئة جداً للقمر لليسار
        if (moonX < -60) moonX = width + 60;
    }

    requestAnimationFrame(draw);
}

window.addEventListener('resize', resize);
resize();
draw();
