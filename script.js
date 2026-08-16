const revealElements = document.querySelectorAll('.reveal');
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.15
});
revealElements.forEach(el => scrollObserver.observe(el));
const heroBackground = document.querySelector('.hero-background');
const heroLayout = document.querySelector('.hero-layout');
let scrollFramePending = false;
function updateHeroMotion() {
    const scrolled = window.pageYOffset;
    if (heroBackground) {
        heroBackground.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0) scale(1.04)`;
    }
    if (heroLayout) {
        const fade = Math.max(0.25, 1 - (scrolled / 850));
        heroLayout.style.opacity = fade;
        heroLayout.style.transform = `translate3d(0, ${scrolled * 0.06}px, 0)`;
    }
    scrollFramePending = false;
}
window.addEventListener('scroll', () => {
    if (!scrollFramePending) {
        window.requestAnimationFrame(updateHeroMotion);
        scrollFramePending = true;
    }
}, { passive: true });
updateHeroMotion();
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
const yearNode = document.getElementById('year');
if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
}
const talkForm = document.getElementById('talk-form');
const formSuccess = document.getElementById('form-success');
if (talkForm) {
    talkForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = talkForm.querySelector('button');
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        try {
            const response = await fetch(talkForm.action, {
                method: talkForm.method,
                headers: {
                    'Accept': 'application/json'
                },
                body: new FormData(talkForm)
            });
            if (response.ok) {
                talkForm.style.display = 'none';
                formSuccess.style.display = 'block';
                setTimeout(() => {
                    talkForm.reset();
                    talkForm.style.display = 'block';
                    formSuccess.style.display = 'none';
                    btn.innerHTML = originalContent;
                    btn.disabled = false;
                }, 5000);
            } else {
                throw new Error('Unable to send message');
            }
        } catch (error) {
            btn.innerHTML = originalContent;
            btn.disabled = false;
            alert('Sorry, your message could not be sent right now. Please email me directly at iraneyan18@gmail.com.');
        }
    });
}
