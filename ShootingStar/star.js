function createShootingStar() {
    // تظهر النجوم فقط في وضع الليل
    if (window.isDay) return; 

    const star = document.createElement('div');
    star.className = 'shooting-star';
    
    // موقع البداية عشوائي من الأعلى
    let startX = Math.random() * window.innerWidth;
    let startY = Math.random() * (window.innerHeight / 2);
    
    star.style.left = startX + 'px';
    star.style.top = startY + 'px';
    
    document.body.appendChild(star);

    // تحريك النجمة بزاوية
    let velocityX = 10 + Math.random() * 5;
    let velocityY = 5 + Math.random() * 3;

    let animation = setInterval(() => {
        startX -= velocityX;
        startY += velocityY;
        
        star.style.left = startX + 'px';
        star.style.top = startY + 'px';

        // حذف النجمة عندما تخرج من الشاشة
        if (startX < -100 || startY > window.innerHeight) {
            star.remove();
            clearInterval(animation);
        }
    }, 20);
}

// محاولة خلق نجمة كل 4 ثوانٍ
setInterval(createShootingStar, 4000);