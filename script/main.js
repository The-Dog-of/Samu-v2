document.addEventListener('DOMContentLoaded', () => {
    
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (window.matchMedia("(pointer: fine)").matches && cursorDot) {
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%)`;
            
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        document.querySelectorAll('a, button, input, textarea, .tilt-card').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if(hamburger && navLinks){
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });
        
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.replace('ph-x', 'ph-list');
            });
        });
    }

    const tiltCards = document.querySelectorAll('.tilt-card');
    
    if (window.matchMedia("(min-width: 1024px)").matches) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10; 
                const rotateY = ((x - centerX) / centerX) * 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    function updateLiveCount() {
        const counter = document.getElementById('live-counter');
        if(!counter) return;
        
        let current = 298432; 
        
        setInterval(() => {
            const change = Math.floor(Math.random() * 300) - 100;
            current += change;
            
            const formatted = (current / 1000).toFixed(1) + 'k';
            counter.innerHTML = `🟢 ${formatted} Jogando`;
            
            if(change > 0) counter.style.textShadow = "0 0 5px rgba(0,255,0,0.5)";
            else counter.style.textShadow = "none";
            
        }, 4000);
    }
    updateLiveCount();

    const discordForm = document.getElementById('discordForm');
    if (discordForm) {
        discordForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const btn = document.getElementById('submitBtn');
            const status = document.getElementById('formStatus');
            
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="ph-bold ph-spinner-gap icon-spin"></i> Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                status.textContent = "Mensagem enviada com sucesso! 🚀";
                status.className = "status-msg success";
                btn.innerHTML = originalText;
                btn.disabled = false;
                discordForm.reset();
                setTimeout(() => status.textContent = "", 5000);
            }, 1500);
        });
    }
});