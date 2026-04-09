 <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>
                <script> // Typed.js

                    new Typed('#typing', {
                        strings: ['Full Stack Developer', 'Data Analyst', 'AI Enthusiast', 'Cloud Engineer'],
                        typeSpeed: 55,
                        backSpeed: 35,
                        backDelay: 1800,
                        loop: true
                    });

                    // Custom cursor
                    const cursor = document.getElementById('cursor');
                    const ring = document.getElementById('cursorRing');
                    let mx = 0,
                        my = 0,
                        rx = 0,
                        ry = 0;

                    document.addEventListener('mousemove', e => {
                        mx = e.clientX; my = e.clientY;
                    });

                    function animateCursor() {
                        cursor.style.left = mx - 5 + 'px';
                        cursor.style.top = my - 5 + 'px';
                        rx += (mx - rx) * 0.12;
                        ry += (my - ry) * 0.12;
                        ring.style.left = rx - 18 + 'px';
                        ring.style.top = ry - 18 + 'px';
                        requestAnimationFrame(animateCursor);
                    }

                    animateCursor();

                    // Hover scale cursor
                    document.querySelectorAll('a, button, .skill-pill, .project-card, .cert-item').forEach(el => {
                        el.addEventListener('mouseenter', () => {
                            cursor.style.transform = 'scale(2.5)';
                            ring.style.transform = 'scale(1.5)';
                            ring.style.borderColor = 'rgba(168,85,247,0.6)';
                        });

                        el.addEventListener('mouseleave', () => {
                            cursor.style.transform = 'scale(1)';
                            ring.style.transform = 'scale(1)';
                            ring.style.borderColor = 'rgba(0,245,255,0.4)';
                        });
                    });

                    // Scroll reveal
                    const reveals = document.querySelectorAll('.reveal');

                    const observer = new IntersectionObserver(entries => {
                        entries.forEach((e, i) => {
                            if (e.isIntersecting) {
                                e.target.classList.add('visible');
                                observer.unobserve(e.target);
                            }
                        });
                    }

                        , {
                            threshold: 0.12
                        });
                    reveals.forEach(el => observer.observe(el));
                </script>
