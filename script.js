console.log("Web sitem aktif!");

// Form doğrulama ve gönderme işlemleri
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Form doğrulama
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const message = this.querySelector('textarea[name="message"]').value;
            
            if (!name || !email || !message) {
                e.preventDefault();
                showNotification('Lütfen tüm alanları doldurun', 'error');
                return;
            }
            
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                showNotification('Geçerli bir email adresi giriniz', 'error');
                return;
            }
            
            showNotification('Mesajınız gönderiliyor...', 'success');
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

    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        let bounds;
        
        function rotateToMouse(e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const leftX = mouseX - bounds.x;
            const topY = mouseY - bounds.y;
            const center = {
                x: leftX - bounds.width / 2,
                y: topY - bounds.height / 2
            }
            const distance = Math.sqrt(center.x**2 + center.y**2);
            
            card.style.transform = `
                scale3d(0.98, 0.98, 0.98)
                rotate3d(
                    ${center.y / 100},
                    ${-center.x / 100},
                    0,
                    ${Math.log(distance) * 2}deg
                )
                translate3d(0, 0, -${Math.log(distance)}px)
            `;
            
            card.style.boxShadow = `
                ${-center.x / 5}px 
                ${-center.y / 5}px 
                30px rgba(0,0,0,0.15),
                ${center.x / 3}px 
                ${center.y / 3}px 
                20px rgba(0,0,0,0.1) inset
            `;
        }
        
        card.addEventListener('mouseenter', () => {
            bounds = card.getBoundingClientRect();
            document.addEventListener('mousemove', rotateToMouse);
        });
        
        card.addEventListener('mouseleave', () => {
            document.removeEventListener('mousemove', rotateToMouse);
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
});

function validateForm(data) {
    const errors = [];
    
    if (!data.name.trim()) {
        errors.push('İsim alanı boş bırakılamaz');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        errors.push('Geçerli bir email adresi giriniz');
    }
    
    if (data.message.trim().length < 10) {
        errors.push('Mesaj en az 10 karakter olmalıdır');
    }
    
    if (errors.length > 0) {
        errors.forEach(error => showNotification(error, 'error'));
        return false;
    }
    
    return true;
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} notification`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

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

document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.querySelector('#current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

window.addEventListener('load', function() {
    const performanceData = {
        loadTime: window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart,
        totalTime: window.performance.timing.loadEventEnd - window.performance.timing.navigationStart
    };
    
    console.log('Sayfa Performans Metrikleri:', performanceData);
});
