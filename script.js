document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Preloader ---
    window.addEventListener('load', () => {
        setTimeout(() => {
            const preloader = document.getElementById('preloader');
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 1500); // 1.5s elegant delay
    });

    // --- 2. Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 3. Countdown Timer ---
    // Set your engagement date here
    const engagementDate = new Date('June 26, 2026 7:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = engagementDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = "<h3>The Celebration Has Begun!</h3>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Pad single digits with zero
        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    };

    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // --- 4. Background Music Player ---
    const musicBtn = document.getElementById('music-btn');
    const audio = document.getElementById('bg-music');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicBtn.style.background = 'rgba(255,255,255,0.5)';
            musicBtn.style.color = 'var(--accent-gold)';
        } else {
            audio.play();
            musicBtn.style.background = 'var(--accent-gold)';
            musicBtn.style.color = '#fff';
        }
        isPlaying = !isPlaying;
    });

    // --- 5. Floating Particles (Bokeh/Petals) ---
    const createParticle = () => {
        const particlesContainer = document.getElementById('particles');
        const particle = document.createElement('div');
        
        // Randomize size, position, and duration
        const size = Math.random() * 8 + 4;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        
        particle.style.position = 'fixed';
        particle.style.top = '-10px';
        particle.style.left = `${left}vw`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = 'rgba(212, 175, 55, 0.3)'; // Golden glow
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.2)';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '99';
        
        // Animate using Web Animations API
        particle.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
            { opacity: 1, offset: 0.1 },
            { opacity: 0.8, offset: 0.9 },
            { transform: `translateY(100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'linear',
            fill: 'forwards'
        });

        particlesContainer.appendChild(particle);

        // Cleanup
        setTimeout(() => { particle.remove(); }, duration * 1000);
    };

    // Generate a particle every 800ms
    setInterval(createParticle, 800);

    // --- 6. Guestbook (localStorage) ---
    const form = document.getElementById('message-form');
    const displayArea = document.getElementById('messages-display');

    const loadMessages = () => {
        const messages = JSON.parse(localStorage.getItem('weddingMessages')) || [];
        displayArea.innerHTML = messages.map(msg => 
            `<div class="guest-msg-card">
                <strong>${msg.name}</strong>
                <p style="margin-top: 5px; color: var(--text-light);">${msg.text}</p>
            </div>`
        ).join('');
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('guest-name').value;
        const msgInput = document.getElementById('guest-message').value;

        const newMessage = { name: nameInput, text: msgInput };
        const messages = JSON.parse(localStorage.getItem('weddingMessages')) || [];
        
        messages.unshift(newMessage); // Add to top
        localStorage.setItem('weddingMessages', JSON.stringify(messages));
        
        form.reset();
        loadMessages();
    });

    loadMessages(); // Load on init
});
