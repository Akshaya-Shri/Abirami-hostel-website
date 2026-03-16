/* script.js */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger to X
            const bars = mobileMenu.querySelectorAll('.bar');
            if (navMenu.classList.contains('active')) {
                bars[0].style.transform = 'translateY(8px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                
                // Reset hamburger icon
                const bars = mobileMenu.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });

    // Smooth scroll offset for fixed navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations on scroll
    const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .facility-item, .gallery-item, .rule-item');
    
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
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Handle Contact Form Submission
    const contactForm = document.getElementById('inquiryForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            if(name && phone && message) {
                // Since this is a static site without a backend, we'll just show an alert
                // In a real scenario, this could send an email via Formspree or similar service
                alert(`Thank you for your inquiry, ${name}! We will get back to you at ${phone} soon.`);
                contactForm.reset();
            }
        });
    }

    // Change nav style on scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            nav.style.padding = '10px 20px';
        } else {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            nav.style.padding = '15px 20px';
        }
    });
});
