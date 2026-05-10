const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');



function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    moonX = width * 0.8;
    initElements();
}

function initElements() {
    stars = []; clouds = [];
    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.8,
            opacity: Math.random(),
            speed: 0.008 + Math.random() * 0.02
        });
    }
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
    window.isDay = !window.isDay;
    const styleLink = document.getElementById('theme-style');
    styleLink.href = window.isDay ? "style.css" : "style2.css";
    initElements();
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    if (window.isDay) {
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

        ctx.save();
        ctx.shadowBlur = 30; ctx.shadowColor = "white";
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(moonX, 120, 50, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();

        moonX -= 0.05;
        if (moonX < -60) moonX = width + 60;
    }
    requestAnimationFrame(draw);
}

window.addEventListener('resize', resize);
resize();
draw();
