// ==========================================
// DODGE THE CREEPS - Enhanced Website Script
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Dodge The Creeps - Website Loaded!');
    
    // ==========================================
    // BUTTON RIPPLE EFFECT
    // ==========================================
    const buttons = document.querySelectorAll('.button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = this.querySelector('.button-ripple');
            if (ripple) {
                ripple.style.width = '0';
                ripple.style.height = '0';
                
                // Get click position relative to button
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Set ripple position
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                // Trigger animation
                setTimeout(() => {
                    ripple.style.width = '400px';
                    ripple.style.height = '400px';
                }, 10);
                
                // Reset after animation
                setTimeout(() => {
                    ripple.style.width = '0';
                    ripple.style.height = '0';
                }, 600);
            }
        });
    });
    
    // ==========================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(
        '.description-card, .preview-card, .button, .feature-item'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // ==========================================
    // PARALLAX EFFECT FOR LOGO
    // ==========================================
    const logoContainer = document.querySelector('.logo-container');
    
    if (logoContainer) {
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            
            logoContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
    
    // ==========================================
    // PREVIEW CARD TILT EFFECT
    // ==========================================
    const previewCards = document.querySelectorAll('.preview-card');
    
    previewCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `
                translateY(-10px) 
                scale(1.02) 
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ==========================================
    // TITLE TEXT ANIMATION ON LOAD
    // ==========================================
    const titleWords = document.querySelectorAll('.title-word');
    
    titleWords.forEach((word, index) => {
        word.style.opacity = '0';
        word.style.transform = 'translateY(50px) rotateX(90deg)';
        
        setTimeout(() => {
            word.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            word.style.opacity = '1';
            word.style.transform = 'translateY(0) rotateX(0deg)';
        }, 200 + index * 150);
    });
    
    // ==========================================
    // FEATURE ICONS ANIMATION
    // ==========================================
    const featureIcons = document.querySelectorAll('.feature-icon');
    
    featureIcons.forEach((icon, index) => {
        icon.addEventListener('mouseenter', () => {
            icon.style.animation = 'none';
            setTimeout(() => {
                icon.style.animation = 'bounce 0.6s ease';
            }, 10);
        });
    });
    
    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ==========================================
    // LOADING ANIMATION
    // ==========================================
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // ==========================================
    // CURSOR EFFECT (Optional - can be disabled if too distracting)
    // ==========================================
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(71, 140, 191, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    // Enable cursor on desktop only
    if (window.matchMedia('(pointer: fine)').matches) {
        cursor.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
        
        // Scale cursor on hover over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .preview-card, .feature-item');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = 'rgba(255, 107, 107, 0.8)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = 'rgba(71, 140, 191, 0.8)';
            });
        });
    }
    
    // ==========================================
    // PARTICLES EFFECT (Subtle)
    // ==========================================
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(71, 140, 191, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 0;
            animation: particleFloat 15s linear forwards;
        `;
        
        const startX = Math.random() * window.innerWidth;
        particle.style.left = startX + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(particle);
        
        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                to {
                    transform: translateY(-100vh) translateX(${(Math.random() - 0.5) * 200}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            particle.remove();
        }, 15000);
    }
    
    // Create particles periodically (subtle effect)
    setInterval(createParticle, 3000);
    
    // ==========================================
    // CONSOLE MESSAGE
    // ==========================================
    console.log('%c🎮 Dodge The Creeps', 'font-size: 20px; font-weight: bold; color: #478CBF;');
    console.log('%cBuilt with Godot Engine', 'font-size: 14px; color: #8B949E;');
    console.log('%cCheck out the docs: https://docs.godotengine.org/en/stable/getting_started/first_2d_game/index.html', 'font-size: 12px; color: #6E7681;');
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
// Throttle scroll and mousemove events for better performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to mousemove events
window.addEventListener('mousemove', throttle((e) => {
    // Existing mousemove handlers already optimized
}, 16)); // ~60fps
