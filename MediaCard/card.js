const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzU6hOGVr3I3278VafOxBuIjIxYxi4OupXDP1rtPDRewlMEHzQjU4c19lJMILWpvHEITg/exec"; 

let allProducts = []; // مصفوفة لتخزين الـ 3000 منتج
let currentIndex = 0;
const PAGE_SIZE = 20; // تحميل 20 منتج في كل مرة

// الدالة الأساسية لتحميل البيانات من جوجل
async function loadProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = "<p style='color:white; text-align:center;'>جاري جلب البضائع من السماء...</p>";

    try {
        const response = await fetch(SCRIPT_URL);
        allProducts = await response.json();
        
        container.innerHTML = ""; // تنظيف رسالة التحميل
        displayNextBatch(); // تحميل أول 20 منتج
    } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
        container.innerHTML = "<p style='color:red; text-align:center;'>عذراً، فشل الاتصال بالمستودع.</p>";
    }
}

// دالة عرض الدفعة التالية من المنتجات
function displayNextBatch() {
    const container = document.getElementById('products-container');
    const nextBatch = allProducts.slice(currentIndex, currentIndex + PAGE_SIZE);
    
    nextBatch.forEach(item => {
        const card = createMediaCard(item);
        container.appendChild(card);
    });
    
    currentIndex += PAGE_SIZE;
}

// دالة بناء "مكعب" الكرت (Component)
function createMediaCard(item) {
    const card = document.createElement('div');
    card.className = 'media-card';

    card.innerHTML = `
        <div class="video-container">
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
    return card;
}

// دالة إرسال الطلب عبر واتساب
function sendOrder(productName) {
    const phone = "963944674735"; 
    const message = `مرحباً، أريد طلب: ${productName}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

// مراقبة التمرير (السكروول) داخل الـ Overlay لتحميل المزيد
// ملاحظة: تأكد أن id="shop-overlay" موجود في index.html
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    const overlay = document.getElementById('shop-overlay');
    if (overlay) {
        overlay.addEventListener('scroll', () => {
            const { scrollTop, scrollHeight, clientHeight } = overlay;
            // إذا وصل المستخدم لقبل نهاية الصفحة بـ 100 بكسل، حمل المزيد
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                if (currentIndex < allProducts.length) {
                    displayNextBatch();
                }
            }
        });
    }
});
