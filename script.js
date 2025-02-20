// JavaScript kodlarınızı buraya ekleyebilirsiniz.
console.log("Web sitem aktif!");

// Form doğrulama ve gönderme işlemleri
document.addEventListener('DOMContentLoaded', function() {
    // Form elementi
    const contactForm = document.querySelector('#iletisim form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini al
            const formData = {
                name: contactForm.querySelector('input[type="text"]').value,
                email: contactForm.querySelector('input[type="email"]').value,
                message: contactForm.querySelector('textarea').value
            };
            
            // Form doğrulama
            if (validateForm(formData)) {
                // Form başarılı mesajı göster
                showNotification('Mesajınız başarıyla gönderildi!', 'success');
                contactForm.reset();
            }
        });
    }
    
    // Smooth scroll için navigasyon linkleri
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Sayfa yüklendiğinde animasyon
    animateOnScroll();
});

// Form doğrulama fonksiyonu
function validateForm(data) {
    const errors = [];
    
    // İsim kontrolü
    if (!data.name.trim()) {
        errors.push('İsim alanı boş bırakılamaz');
    }
    
    // Email kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        errors.push('Geçerli bir email adresi giriniz');
    }
    
    // Mesaj kontrolü
    if (data.message.trim().length < 10) {
        errors.push('Mesaj en az 10 karakter olmalıdır');
    }
    
    // Hata varsa göster
    if (errors.length > 0) {
        errors.forEach(error => showNotification(error, 'error'));
        return false;
    }
    
    return true;
}

// Bildirim gösterme fonksiyonu
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} notification`;
    notification.textContent = message;
    
    // Bildirimi sayfaya ekle
    document.body.appendChild(notification);
    
    // Animasyon ekle
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);
    
    // Bildirimi kaldır
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Scroll animasyonu için
function animateOnScroll() {
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Dinamik yıl güncelleme
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.querySelector('#current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Sayfa yüklenme performansı
window.addEventListener('load', function() {
    const performanceData = {
        loadTime: window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart,
        totalTime: window.performance.timing.loadEventEnd - window.performance.timing.navigationStart
    };
    
    console.log('Sayfa Performans Metrikleri:', performanceData);
});
