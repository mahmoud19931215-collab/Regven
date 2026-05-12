// ضع هنا رابط الـ Web App الذي حصلت عليه بعد عمل Deploy لكود Apps Script
const SCRIPT_URL = "أضف_رابط_جوجل_هنا"; 

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
                    <video preload="metadata" muted loop onmouseover="this.play()" onmouseout="this.pause()" playsinline>
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
    const phone = "9639xxxxxxxx"; // ضع رقمك أو رقم فتون هنا
    const message = `مرحباً، أريد طلب: ${productName}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

// تشغيل الدالة عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', loadProducts);
