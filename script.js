/* ============================================
   KEYS90 · COMMON JAVASCRIPT
   Luxury Real Estate Website
   Version: 1.0
   ============================================ */

(function () {
    'use strict';

    // ==========================================
    // 1. DOM READY
    // ==========================================
    document.addEventListener('DOMContentLoaded', function () {

        // ==========================================
        // 2. ACTIVE MENU HIGHLIGHT
        // ==========================================
        function setActiveMenu() {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const menuLinks = document.querySelectorAll('.menu a');

            menuLinks.forEach(link => {
                const linkHref = link.getAttribute('href');
                // Remove active class from all links
                link.classList.remove('active');

                // Add active class to matching link
                if (linkHref === currentPage) {
                    link.classList.add('active');
                }

                // Handle case where href is just '#' or empty
                if (!linkHref || linkHref === '#') {
                    link.classList.remove('active');
                }
            });
        }

        // Call on load
        setActiveMenu();

        // ==========================================
        // 3. SMOOTH SCROLL FOR ANCHOR LINKS
        // ==========================================
        function initSmoothScroll() {
            const anchorLinks = document.querySelectorAll('a[href^="#"]');

            anchorLinks.forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const targetId = this.getAttribute('href');

                    // Skip if href is just '#'
                    if (targetId === '#') return;

                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        e.preventDefault();

                        // Smooth scroll to target
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });

                        // Update URL without causing page reload (optional)
                        if (history.pushState) {
                            history.pushState(null, null, targetId);
                        }

                        // Close mobile menu if open (optional)
                        closeMobileMenu();
                    }
                });
            });
        }

        // ==========================================
        // 4. MOBILE MENU TOGGLE
        // ==========================================
        function initMobileMenu() {
            const header = document.querySelector('header');
            const navWrapper = document.querySelector('.nav-wrapper');

            // Create hamburger button if it doesn't exist
            if (!document.querySelector('.hamburger-btn')) {
                const hamburgerBtn = document.createElement('button');
                hamburgerBtn.className = 'hamburger-btn';
                hamburgerBtn.setAttribute('aria-label', 'Toggle menu');
                hamburgerBtn.innerHTML = `
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                `;

                // Insert hamburger button before the menu
                const menu = document.querySelector('.menu');
                if (menu) {
                    menu.parentNode.insertBefore(hamburgerBtn, menu);
                }

                // Toggle menu on click
                hamburgerBtn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    toggleMobileMenu();
                });
            }

            // Close menu on outside click
            document.addEventListener('click', function (e) {
                const menu = document.querySelector('.menu');
                const hamburger = document.querySelector('.hamburger-btn');

                if (menu && hamburger) {
                    const isClickInside = menu.contains(e.target) || hamburger.contains(e.target);
                    if (!isClickInside && menu.classList.contains('open')) {
                        closeMobileMenu();
                    }
                }
            });

            // Close menu on ESC key
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') {
                    closeMobileMenu();
                }
            });
        }

        // Toggle mobile menu
        function toggleMobileMenu() {
            const menu = document.querySelector('.menu');
            const hamburger = document.querySelector('.hamburger-btn');

            if (menu) {
                menu.classList.toggle('open');
                hamburger && hamburger.classList.toggle('active');

                // Update aria-expanded
                const isOpen = menu.classList.contains('open');
                hamburger && hamburger.setAttribute('aria-expanded', isOpen);
            }
        }

        // Close mobile menu
        function closeMobileMenu() {
            const menu = document.querySelector('.menu');
            const hamburger = document.querySelector('.hamburger-btn');

            if (menu) {
                menu.classList.remove('open');
                hamburger && hamburger.classList.remove('active');
                hamburger && hamburger.setAttribute('aria-expanded', 'false');
            }
        }

        // ==========================================
        // 5. SCROLL EFFECTS (Sticky Header, etc.)
        // ==========================================
        function initScrollEffects() {
            const header = document.querySelector('header');
            let lastScrollY = window.scrollY;
            let ticking = false;

            function updateHeader() {
                const currentScrollY = window.scrollY;

                // Add shadow class when scrolled
                if (currentScrollY > 50) {
                    header && header.classList.add('scrolled');
                } else {
                    header && header.classList.remove('scrolled');
                }

                ticking = false;
            }

            // Throttled scroll handler
            window.addEventListener('scroll', function () {
                if (!ticking) {
                    window.requestAnimationFrame(function () {
                        updateHeader();
                    });
                    ticking = true;
                }
            });

            // Initial call
            setTimeout(updateHeader, 100);
        }

        // ==========================================
        // 6. BACK TO TOP BUTTON
        // ==========================================
        function initBackToTop() {
            // Check if back-to-top button exists
            let backBtn = document.querySelector('.back-to-top');

            if (!backBtn) {
                // Create button if it doesn't exist
                backBtn = document.createElement('button');
                backBtn.className = 'back-to-top';
                backBtn.setAttribute('aria-label', 'Back to top');
                backBtn.innerHTML = '↑';
                backBtn.style.cssText = `
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: #b8863d;
                    color: white;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 16px rgba(184, 134, 61, 0.3);
                    z-index: 999;
                `;

                document.body.appendChild(backBtn);

                // Click handler
                backBtn.addEventListener('click', function () {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }

            // Show/hide on scroll
            window.addEventListener('scroll', function () {
                const scrollY = window.scrollY;
                if (scrollY > 400) {
                    backBtn.style.opacity = '1';
                    backBtn.style.visibility = 'visible';
                } else {
                    backBtn.style.opacity = '0';
                    backBtn.style.visibility = 'hidden';
                }
            });
        }

        // ==========================================
        // 7. FORM VALIDATION (optional enhancement)
        // ==========================================
        function initFormValidation() {
            const forms = document.querySelectorAll('form');

            forms.forEach(form => {
                form.addEventListener('submit', function (e) {
                    e.preventDefault();

                    let isValid = true;
                    const requiredFields = form.querySelectorAll('[required]');

                    requiredFields.forEach(field => {
                        if (!field.value.trim()) {
                            isValid = false;
                            field.classList.add('error');
                            // Show error message
                            const errorMsg = field.dataset.error || 'This field is required';
                            showFieldError(field, errorMsg);
                        } else {
                            field.classList.remove('error');
                            removeFieldError(field);
                        }
                    });

                    if (isValid) {
                        // Simulate form submission
                        const submitBtn = form.querySelector('[type="submit"]');
                        if (submitBtn) {
                            const originalText = submitBtn.textContent;
                            submitBtn.textContent = 'Sending...';
                            submitBtn.disabled = true;

                            setTimeout(function () {
                                submitBtn.textContent = '✓ Sent!';
                                setTimeout(function () {
                                    submitBtn.textContent = originalText;
                                    submitBtn.disabled = false;
                                    form.reset();
                                }, 2000);
                            }, 1500);
                        }
                    }
                });
            });
        }

        // Helper: Show field error
        function showFieldError(field, message) {
            let errorEl = field.parentNode.querySelector('.field-error');
            if (!errorEl) {
                errorEl = document.createElement('span');
                errorEl.className = 'field-error';
                errorEl.style.cssText = `
                    display: block;
                    color: #dc3545;
                    font-size: 0.85rem;
                    margin-top: 4px;
                `;
                field.parentNode.appendChild(errorEl);
            }
            errorEl.textContent = message;
        }

        // Helper: Remove field error
        function removeFieldError(field) {
            const errorEl = field.parentNode.querySelector('.field-error');
            if (errorEl) {
                errorEl.remove();
            }
        }

        // ==========================================
        // 8. INITIALIZE ALL MODULES
        // ==========================================
        function init() {
            console.log('Keys90 · Common JS loaded');

            // Smooth scroll
            initSmoothScroll();

            // Mobile menu
            initMobileMenu();

            // Scroll effects
            initScrollEffects();

            // Back to top
            initBackToTop();

            // Form validation
            initFormValidation();
        }

        // Run initialization
        init();

    }); // End DOMContentLoaded

})(); // End IIFE