function createBird() {
    // العصفور يظهر فقط في النهار
    if (!window.isDay) return;

    const bird = document.createElement('div');
    bird.className = 'bird';
    
    // يبدأ من خارج الشاشة يساراً بارتفاع عشوائي
    let startX = -50;
    let startY = Math.random() * (window.innerHeight / 2);
    
    bird.style.left = startX + 'px';
    bird.style.top = startY + 'px';
    
    document.body.appendChild(bird);

    let speed = 2 + Math.random() * 3;

    let birdFlight = setInterval(() => {
        // إذا تحول الوقت لليل فجأة، يختفي العصفور
        if (!window.isDay) {
            bird.remove();
            clearInterval(birdFlight);
        }

        startX += speed;
        bird.style.left = startX + 'px';

        // حذف العصفور عند الخروج من الشاشة يميناً
        if (startX > window.innerWidth + 50) {
            bird.remove();
            clearInterval(birdFlight);
        }
    }, 20);
}

// محاولة إطلاق عصفور كل 6 ثوانٍ
setInterval(createBird, 6000);