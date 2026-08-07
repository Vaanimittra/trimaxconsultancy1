/* ============================================
   TRIMAX CONSULTANCY - COMMON JAVASCRIPT
   Shared across all pages (Home, About, Project, Team, Realty Blogs, Contact)
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. ACTIVE MENU HIGHLIGHT
    // Automatically highlights the current page in the navigation
    // ============================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('.menu a');
    
    menuLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        // Remove any existing active class first
        link.classList.remove('active');
        
        // Add active class if the link matches the current page
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
        
        // Handle special cases where page names might differ
        // For example: 'index.html' should match 'home.html' if needed
        if (currentPage === 'index.html' && linkHref === 'home.html') {
            link.classList.add('active');
        }
        if (currentPage === 'ourteam.html' && linkHref === 'team.html') {
            link.classList.add('active');
        }
    });

    // ============================================
    // 2. SMOOTH SCROLL FOR INTERNAL ANCHOR LINKS
    // Enables smooth scrolling for all links starting with "#"
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" with no target
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    duration: 800 // Smooth transition duration
                });
            }
        });
    });

    // ============================================
    // 3. MOBILE HAMBURGER MENU TOGGLE
    // For responsive navigation on small screens
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when a link is clicked (mobile)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // ============================================
    // 4. SCROLL-TO-TOP BUTTON (optional)
    // Shows a button when scrolling down to go back to top
    // ============================================
    const scrollBtn = document.getElementById('scrollToTop');
    
    if (scrollBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollBtn.style.display = 'block';
            } else {
                scrollBtn.style.display = 'none';
            }
        });
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // 5. FORM VALIDATION (Contact Page)
    // Basic form validation for contact forms
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('fullname');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');
            
            let isValid = true;
            let errorMessage = '';
            
            // Validate Name
            if (name && name.value.trim() === '') {
                isValid = false;
                errorMessage += 'Please enter your full name.\n';
                name.style.borderColor = '#e74c3c';
            } else if (name) {
                name.style.borderColor = '#27ae60';
            }
            
            // Validate Email
            if (email && email.value.trim() === '') {
                isValid = false;
                errorMessage += 'Please enter your email address.\n';
                email.style.borderColor = '#e74c3c';
            } else if (email && !isValidEmail(email.value)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
                email.style.borderColor = '#e74c3c';
            } else if (email) {
                email.style.borderColor = '#27ae60';
            }
            
            // Validate Phone
            if (phone && phone.value.trim() === '') {
                isValid = false;
                errorMessage += 'Please enter your phone number.\n';
                phone.style.borderColor = '#e74c3c';
            } else if (phone) {
                phone.style.borderColor = '#27ae60';
            }
            
            // Validate Message
            if (message && message.value.trim() === '') {
                isValid = false;
                errorMessage += 'Please enter your message.\n';
                message.style.borderColor = '#e74c3c';
            } else if (message) {
                message.style.borderColor = '#27ae60';
            }
            
            if (!isValid) {
                alert('Please fix the following errors:\n\n' + errorMessage);
            } else {
                // Success - you can send data to server or redirect
                alert('Thank you! Your message has been sent successfully.');
                contactForm.reset();
                
                // Reset border colors
                if (name) name.style.borderColor = '#e0e7ef';
                if (email) email.style.borderColor = '#e0e7ef';
                if (phone) phone.style.borderColor = '#e0e7ef';
                if (message) message.style.borderColor = '#e0e7ef';
            }
        });
    }

    // ============================================
    // 6. EMAIL VALIDATION HELPER
    // ============================================
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ============================================
    // 7. ANIMATE ON SCROLL (reveal elements)
    // Adds fade-in animation when elements come into view
    // ============================================
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card, .team-card, .guide-card, .testimonial-card, .faq-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Add CSS for animation (dynamically)
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .card, .team-card, .guide-card, .testimonial-card, .faq-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .card.animate, .team-card.animate, .guide-card.animate, 
        .testimonial-card.animate, .faq-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Run on scroll and on load
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    // ============================================
    // 8. PAGE LOADER (optional)
    // Shows a loading spinner while page loads
    // ============================================
    const loader = document.getElementById('pageLoader');
    
    if (loader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.style.opacity = '0';
                setTimeout(function() {
                    loader.style.display = 'none';
                }, 500);
            }, 500);
        });
    }

    // ============================================
    // 9. BACK TO TOP BUTTON - CREATE IF NOT EXISTS
    // ============================================
    if (!document.getElementById('scrollToTop')) {
        const scrollBtn = document.createElement('button');
        scrollBtn.id = 'scrollToTop';
        scrollBtn.innerHTML = '⬆';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #b8863d;
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 24px;
            cursor: pointer;
            display: none;
            z-index: 999;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        `;
        document.body.appendChild(scrollBtn);
        
        // Hover effect
        scrollBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.background = '#0f2c3d';
        });
        scrollBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = '#b8863d';
        });
        
        // Show/hide on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollBtn.style.display = 'block';
            } else {
                scrollBtn.style.display = 'none';
            }
        });
        
        // Scroll to top on click
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // 10. CONSOLE LOG FOR DEBUGGING
    // ============================================
    const pageName = currentPage.replace('.html', '').charAt(0).toUpperCase() + 
                    currentPage.replace('.html', '').slice(1);
    console.log(`✅ Trimax Consultancy · ${pageName} page loaded successfully`);

    // ============================================
    // 11. HAMBURGER MENU - ADD DYNAMICALLY IF MISSING
    // ============================================
    const navMenuExisting = document.getElementById('navMenu');
    const hamburgerExisting = document.getElementById('hamburger');
    
    if (!hamburgerExisting && navMenuExisting) {
        // Create hamburger if it doesn't exist
        const newHamburger = document.createElement('div');
        newHamburger.id = 'hamburger';
        newHamburger.className = 'hamburger';
        newHamburger.innerHTML = '<i class="fas fa-bars"></i>';
        newHamburger.style.cssText = `
            display: none;
            font-size: 1.8rem;
            cursor: pointer;
            color: #f5e6d3;
            padding: 5px 10px;
        `;
        
        // Insert before nav menu
        const nav = document.querySelector('.menu');
        if (nav) {
            nav.parentNode.insertBefore(newHamburger, nav);
        }
        
        // Toggle functionality
        newHamburger.addEventListener('click', function() {
            navMenuExisting.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // ============================================
    // 12. SMOOTH SCROLL FOR ALL ANCHOR LINKS
    // Additional handler for dynamically added links
    // ============================================
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a[href^="#"]');
        if (target) {
            const targetId = target.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        }
    });

}); // End DOMContentLoaded

// ============================================
// 13. HANDLE AJAX FORM SUBMISSIONS (if needed)
// For contact forms that need to submit without page reload
// ============================================
function submitForm(formId, endpoint) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate sending (replace with actual fetch call)
        setTimeout(function() {
            alert('Thank you! Your message has been sent successfully.');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
        
        // Actual fetch call (uncomment when backend is ready)
        /*
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            alert('Thank you! Your message has been sent successfully.');
            form.reset();
        })
        .catch(error => {
            alert('Sorry, something went wrong. Please try again.');
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
        */
    });
}

// ============================================
// 14. GOOGLE MAPS INITIALIZATION (if used)
// ============================================
function initMap() {
    // This function can be called if you're using Google Maps
    // Example: Initialize map on contact page
    const mapElement = document.getElementById('map');
    if (mapElement) {
        // Google Maps initialization code would go here
        console.log('Map initialized');
    }
}

// ============================================
// 15. COUNTER ANIMATION FOR STATS
// Animate numbers counting up
// ============================================
function animateCounter(element, target, duration = 2000) {
    if (!element) return;
    
    const start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        
        element.textContent = current + '+';
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ============================================
// 16. OBSERVER FOR STAT COUNTERS
// Trigger counter animation when stats come into view
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('.stat-number');
    
    if (stats.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseInt(element.textContent);
                    if (!isNaN(target)) {
                        animateCounter(element, target);
                    }
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => {
            observer.observe(stat);
        });
    }
});

console.log('✅ TRIMAX CONSULTANCY · JavaScript loaded successfully');
