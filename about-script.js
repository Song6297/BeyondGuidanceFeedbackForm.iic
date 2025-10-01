document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    // Setup progress bar
    setupProgressBar();
    
    // Add copy functionality to account numbers
    setupCopyFunctionality();
    
    function initAnimations() {
        // Add initial animation classes
        const header = document.querySelector('.logo-header');
        if (header) {
            header.classList.add('animate__fadeInDown');
        }
    }
    
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    
                    // Add staggered animation
                    const delay = entry.target.getAttribute('data-aos-delay') || 0;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
            });
        }, observerOptions);
        
        // Observe all elements with data-aos attribute
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });
    }
    
    function setupProgressBar() {
        const progressFill = document.getElementById('progress-fill');
        if (!progressFill) return;
        
        // Update progress on scroll
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / documentHeight) * 100;
            
            progressFill.style.width = `${Math.min(progress, 100)}%`;
        });
    }
    
    // Back to Top Button functionality
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    function setupCopyFunctionality() {
        // Add click-to-copy functionality for account numbers and UPI
        const detailValues = document.querySelectorAll('.detail-value');
        
        detailValues.forEach(element => {
            // Only add copy functionality to numeric values and UPI
            const text = element.textContent.trim();
            if (/^\d+$/.test(text) || text.includes('@') || /^[A-Z0-9]+$/.test(text)) {
                element.style.cursor = 'pointer';
                element.title = 'Click to copy';
                
                element.addEventListener('click', function() {
                    copyToClipboard(this.textContent.trim(), this);
                });
            }
        });
    }
    
    function copyToClipboard(text, element) {
        // Create a temporary textarea element
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        
        // Select and copy the text
        textarea.select();
        textarea.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            document.execCommand('copy');
            showCopyFeedback(element);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
        
        document.body.removeChild(textarea);
    }
    
    function showCopyFeedback(element) {
        const originalText = element.textContent;
        const originalColor = element.style.color;
        
        // Show feedback
        element.textContent = '✓ Copied!';
        element.style.color = 'var(--success)';
        
        // Add animation
        element.style.animation = 'bounceIn 0.5s ease-out';
        
        // Reset after 2 seconds
        setTimeout(() => {
            element.textContent = originalText;
            element.style.color = originalColor;
            element.style.animation = '';
        }, 2000);
    }
    
    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.about-card, .bank-card, .social-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'cardFloat 0.6s ease-out';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
    
    // Add parallax effect to background particles
    document.addEventListener('mousemove', (e) => {
        const particles = document.querySelectorAll('.particle');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.0003;
            const x = (mouseX - 0.5) * speed * window.innerWidth;
            const y = (mouseY - 0.5) * speed * window.innerHeight;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Add entrance animation for sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 200 * index);
    });
    
    // Add floating animation keyframe
    const style = document.createElement('style');
    style.textContent = `
        @keyframes cardFloat {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Navigate with arrow keys
        if (e.key === 'ArrowDown') {
            window.scrollBy({
                top: 100,
                behavior: 'smooth'
            });
        } else if (e.key === 'ArrowUp') {
            window.scrollBy({
                top: -100,
                behavior: 'smooth'
            });
        }
    });
    
    // Add resize handler for responsive adjustments
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recalculate any dynamic elements if needed
            console.log('Window resized');
        }, 250);
    });
    
    // Add print styles awareness
    window.addEventListener('beforeprint', () => {
        document.body.classList.add('printing');
    });
    
    window.addEventListener('afterprint', () => {
        document.body.classList.remove('printing');
    });
    
    // Log page load completion
    console.log('About Us page loaded successfully');
});
