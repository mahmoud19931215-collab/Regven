function createMediaCard(item) {
    const card = document.createElement('div');
    card.className = 'media-card';

    // بناء محتوى الكرت (فيديو + تفاصيل)
    card.innerHTML = `
        <div class="video-container">
            <video preload="metadata" muted loop onmouseover="this.play()" onmouseout="this.pause()">
                <source src="${item.video}" type="video/mp4">
                متصفحك لا يدعم الفيديو
            </video>
        </div>
        <div class="card-details">
            <h4>${item.title}</h4>
            <p class="price">${item.price} ل.س</p>
            <button class="order-btn" onclick="sendOrder('${item.title}')">اطلب عبر واتساب</button>
        </div>
    `;
    return card;
}

function sendOrder(productName) {
    const phone = "963945083365"; // رقم فتون أو رقمك
    const message = `مرحباً، أريد طلب منتج: ${productName}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}
