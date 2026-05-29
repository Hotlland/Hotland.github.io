/* =============================================
   ЦИТРОН RP — script.js
   ============================================= */

// ──────────────────────────────
// 1. PARTICLE CANVAS BACKGROUND (cyan crystals)
// ──────────────────────────────
(function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    const COUNT = 70;
    const CYAN = 'rgba(0, 212, 245, ';

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createParticle() {
        return {
            x: random(0, canvas.width),
            y: random(0, canvas.height),
            r: random(0.5, 1.8),
            dx: random(-0.2, 0.2),
            dy: random(-0.6, -0.1),
            alpha: random(0.05, 0.35),
            fadeDir: Math.random() > 0.5 ? 1 : -1,
            // Some particles are diamond-shaped
            isDiamond: Math.random() > 0.7,
            size: random(2, 5),
        };
    }

    function initParticleList() {
        particles = [];
        for (let i = 0; i < COUNT; i++) {
            particles.push(createParticle());
        }
    }

    function drawDiamond(ctx, x, y, size, alpha) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = CYAN + alpha + ')';
        ctx.fillRect(-size/2, -size/2, size, size);
        ctx.restore();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            if (p.isDiamond) {
                drawDiamond(ctx, p.x, p.y, p.size, p.alpha);
            } else {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = CYAN + p.alpha + ')';
                ctx.fill();
            }

            p.x += p.dx;
            p.y += p.dy;
            p.alpha += p.fadeDir * 0.002;

            if (p.alpha <= 0.02 || p.alpha >= 0.4) p.fadeDir *= -1;

            if (p.y < -10) {
                p.y = canvas.height + 10;
                p.x = random(0, canvas.width);
            }
        });
        requestAnimationFrame(draw);
    }

    resize();
    initParticleList();
    draw();
    window.addEventListener('resize', () => { resize(); });
})();


// ──────────────────────────────
// 2. NAVBAR — scroll behaviour
// ──────────────────────────────
(function initNavbar() {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });
})();


// ──────────────────────────────
// 3. MOBILE BURGER MENU
// ──────────────────────────────
(function initBurger() {
    const burger = document.getElementById('burger');
    const menu = document.getElementById('mobileMenu');
    if (!burger || !menu) return;

    burger.addEventListener('click', () => {
        const open = menu.classList.toggle('open');
        burger.setAttribute('aria-expanded', open);
        const spans = burger.querySelectorAll('span');
        if (open) {
            spans[0].style.transform = 'translateY(7px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            menu.classList.remove('open');
            const spans = burger.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });
})();


// ──────────────────────────────
// 4. REVEAL ON SCROLL
// ──────────────────────────────
(function initReveal() {
    const targets = document.querySelectorAll('.reveal, .reveal-right');
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    targets.forEach(el => observer.observe(el));
})();


// ──────────────────────────────
// 5. COUNTER ANIMATION (Stats)
// ──────────────────────────────
(function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const duration = 1800;
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target);
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    el.textContent = target;
                }
            }

            requestAnimationFrame(update);
            observer.unobserve(el);
        });
    }, { threshold: 0.3 });

    counters.forEach(el => observer.observe(el));
})();


// ──────────────────────────────
// 6. FAQ ACCORDION
// ──────────────────────────────
function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').classList.remove('open');
    });

    if (!isOpen) {
        item.classList.add('open');
        answer.classList.add('open');
    }
}


// ──────────────────────────────
// 7. COPY IP
// ──────────────────────────────
function copyIP() {
    const ip = "hotland.falix.pro";
    navigator.clipboard.writeText(ip).then(() => {
        showToast();
    }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = ip;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        try { document.execCommand('copy'); showToast(); } catch (e) {}
        document.body.removeChild(ta);
    });
}

function showToast() {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}


// ──────────────────────────────
// 8. LIVE SERVER STATUS
// ──────────────────────────────
function updateOnline() {
    fetch('https://api.mcstatus.io/v2/status/java/hotland.falix.pro')
        .then(r => r.json())
        .then(data => {
            const countEl = document.getElementById('player-count');
            const dot = document.querySelector('#statusDot');
            const heroBadge = document.querySelector('.hero-badge .status-dot');

            if (data.online) {
                const online = data.players.online;
                const max = data.players.max;
                if (countEl) countEl.textContent = online + ' / ' + max;

                if (dot) {
                    dot.style.background = '#22c55e';
                    dot.style.boxShadow = '0 0 10px rgba(34,197,94,0.6)';
                }
            } else {
                if (countEl) countEl.textContent = 'Оффлайн';
                if (dot) {
                    dot.style.background = '#ef4444';
                    dot.style.boxShadow = '0 0 10px rgba(239,68,68,0.4)';
                }
                if (heroBadge) {
                    heroBadge.style.background = '#ef4444';
                    heroBadge.style.animationPlayState = 'paused';
                }
            }
        })
        .catch(() => {
            const countEl = document.getElementById('player-count');
            if (countEl) countEl.textContent = 'недоступен';
        });
}

updateOnline();
setInterval(updateOnline, 30000);


// ──────────────────────────────
// 9. SMOOTH ACTIVE NAV HIGHLIGHT
// ──────────────────────────────
(function initActiveNav() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const links = document.querySelectorAll('.nav-links a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(a => a.style.color = '');
                const id = entry.target.id;
                const active = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (active) active.style.color = 'var(--cyan)';
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
})();
