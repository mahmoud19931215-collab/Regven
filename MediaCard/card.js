// ضع هنا رابط الـ Web App الذي حصلت عليه بعد عمل Deploy لكود Apps Script
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzU6hOGVr3I3278VafOxBuIjIxYxi4OupXDP1rtPDRewlMEHzQjU4c19lJMILWpvHEITg/exec"; 

async function loadProducts() {
    const container = document.getElementById('products-container');
    
    // إظهار رسالة تحميل بسيطة بنكهة "اللعبة"
    container.innerHTML = "<p style='color:white; text-align:center;'>جاري جلب البضائع من السماء...</p>";

    try {
        const response = await fetch(SCRIPT_URL);
        const data = await response.json();

        // تنظيف الحاوية قبل العرض
        container.innerHTML = "";

        data.forEach(item => {
            // إنشاء الكرت لكل منتج
            const card = document.createElement('div');
            card.className = 'media-card';

            card.innerHTML = `
                <div class="video-container">
                  // نعدل السطر الخاص بالـ video ليصبح:
<video preload="auto" autoplay muted loop playsinline poster="loading_image.jpg">
    <source src="${item.video}" type="video/mp4">
                        متصفحك لا يدعم الفيديو
                    </video>




                    
                </div>
                <div class="card-details">
                    <h4>${item.title}</h4>
                    <p class="price">${item.price} ل.س</p>
                    <p style="font-size: 0.8rem; opacity: 0.8;">${item.description || ''}</p>
                    <button class="order-btn" onclick="sendOrder('${item.title}')">اطلب الآن</button>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
        container.innerHTML = "<p style='color:red;'>عذراً، فشل الاتصال بالمستودع. تأكد من الإنترنت.</p>";
    }
}

function sendOrder(productName) {
    const phone = "963944674735"; // ضع رقمك أو رقم فتون هنا
    const message = `مرحباً، أريد طلب: ${productName}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

// تشغيل الدالة عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', loadProducts);




let allProducts = []; // لحفظ الـ 3000 منتج
let currentIndex = 0;
const PAGE_SIZE = 20;

async function loadProducts() {
    const response = await fetch(SCRIPT_URL);
    allProducts = await response.json();
    displayNextBatch(); // عرض أول 20
}

function displayNextBatch() {
    const container = document.getElementById('products-container');
    const nextBatch = allProducts.slice(currentIndex, currentIndex + PAGE_SIZE);
    
    nextBatch.forEach(item => {
        const card = createMediaCard(item); // دالة إنشاء الكرت
        container.appendChild(card);
    });
    
    currentIndex += PAGE_SIZE;
}

// مراقبة التمرير (السكروول) لتحميل المزيد
document.getElementById('shop-overlay').addEventListener('scroll', function(e) {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
        if (currentIndex < allProducts.length) {
            displayNextBatch();
        }
    }
});



