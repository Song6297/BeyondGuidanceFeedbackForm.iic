document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Setup rating functionality
    setupRating('q1-rating', 'q1');
    setupRating('q3-rating', 'q3');
    setupRating('q5-rating', 'q5');
    setupRating('q6-rating', 'q6');
    
    // Setup form submission
    const form = document.getElementById('feedbackForm');
    const submitBtn = document.querySelector('.submit-btn');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');
    
    form.addEventListener('submit', handleFormSubmit);
    closeModal.addEventListener('click', closeSuccessModal);
    
    // Setup input animations
    setupInputAnimations();
    
    // Setup intersection observer for scroll animations
    setupScrollAnimations();
    
    // Setup progress bar
    setupProgressBar();
    
    function initAnimations() {
        // Add initial animation classes
        document.querySelector('header').classList.add('animate__fadeInDown');
        document.querySelector('.form-container').classList.add('animate__fadeInUp');
        
        // Animate floating elements
        animateFloatingElements();
    }
    
    function setupRating(containerId, inputId) {
        const container = document.getElementById(containerId);
        const input = document.getElementById(inputId);
        
        container.querySelectorAll('.rating-option').forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from all options
                container.querySelectorAll('.rating-option').forEach(opt => {
                    opt.classList.remove('selected');
                    opt.style.animation = '';
                });
                
                // Add selected class to clicked option
                this.classList.add('selected');
                this.style.animation = 'bounceIn 0.6s ease-out';
                
                // Update hidden input value
                input.value = this.getAttribute('data-value');
                
                // Add validation feedback
                input.classList.add('validated');
                
                // Trigger confetti for high ratings (4 or 5)
                const value = parseInt(this.getAttribute('data-value'));
                if (value >= 4) {
                    triggerConfetti(this);
                }
            });
            
            // Add hover animation
            option.addEventListener('mouseenter', function() {
                if (!this.classList.contains('selected')) {
                    this.style.transform = 'translateY(-5px) scale(1.05)';
                }
            });
            
            option.addEventListener('mouseleave', function() {
                if (!this.classList.contains('selected')) {
                    this.style.transform = '';
                }
            });
        });
    }
    
    function setupInputAnimations() {
        const textareas = document.querySelectorAll('textarea');
        
        textareas.forEach(textarea => {
            const container = textarea.parentElement;
            
            textarea.addEventListener('focus', function() {
                container.classList.add('focused');
                container.classList.add('animate__pulse');
                setTimeout(() => {
                    container.classList.remove('animate__pulse');
                }, 1000);
            });
            
            textarea.addEventListener('blur', function() {
                if (!this.value) {
                    container.classList.remove('focused');
                }
            });
            
            // Add character counter for longer textareas
            if (textarea.id === 'q4' || textarea.id === 'q8' || textarea.id === 'q9') {
                setupCharacterCounter(textarea);
            }
        });
        
        // Radio button animations
        const radioOptions = document.querySelectorAll('.radio-option');
        radioOptions.forEach(option => {
            option.addEventListener('click', function() {
                radioOptions.forEach(opt => {
                    opt.classList.remove('selected');
                    opt.style.animation = '';
                });
                this.classList.add('selected');
                this.style.animation = 'rubberBand 0.6s ease-out';
            });
        });
    }
    
    function setupCharacterCounter(textarea) {
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.8rem;
            color: var(--gray);
            margin-top: 0.5rem;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        textarea.parentElement.appendChild(counter);
        
        textarea.addEventListener('input', function() {
            const count = this.value.length;
            counter.textContent = `${count} characters`;
            counter.style.opacity = count > 0 ? '1' : '0';
            
            if (count > 200) {
                counter.style.color = 'var(--success)';
            } else if (count > 100) {
                counter.style.color = 'var(--primary)';
            } else {
                counter.style.color = 'var(--gray)';
            }
        });
        
        textarea.addEventListener('focus', function() {
            if (this.value.length > 0) {
                counter.style.opacity = '1';
            }
        });
        
        textarea.addEventListener('blur', function() {
            counter.style.opacity = '0';
        });
    }
    
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    
                    // Add staggered animation for form groups
                    if (entry.target.classList.contains('form-group')) {
                        const delay = entry.target.getAttribute('data-aos-delay') || 0;
                        setTimeout(() => {
                            entry.target.style.animation = `fadeInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms both`;
                        }, delay);
                    }
                }
            });
        }, observerOptions);
        
        // Observe all elements with data-aos attribute
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });
    }
    
    function animateFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating');
        
        floatingElements.forEach((el, index) => {
            const delay = index * 0.5;
            el.style.animationDelay = `${delay}s`;
        });
    }
    
    function triggerConfetti(element) {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Create confetti elements
        for (let i = 0; i < 12; i++) {
            createConfettiParticle(x, y);
        }
    }
    
    function createConfettiParticle(x, y) {
        const colors = ['#4361ee', '#4895ef', '#3f37c9', '#4cc9f0', '#560bad'];
        const confetti = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${color};
            border-radius: 1px;
            z-index: 1000;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
        `;
        
        document.body.appendChild(confetti);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 2;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        const rotation = Math.random() * 360;
        const rotationSpeed = (Math.random() - 0.5) * 10;
        
        let progress = 0;
        
        function animate() {
            progress += 0.02;
            const currentY = y + vy * progress * 50 - 0.5 * 9.8 * progress * progress * 50;
            const currentX = x + vx * progress * 50;
            const currentRotation = rotation + rotationSpeed * progress * 50;
            
            confetti.style.transform = `translate(${currentX - x}px, ${currentY - y}px) rotate(${currentRotation}deg)`;
            confetti.style.opacity = 1 - progress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        }
        
        animate();
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            shakeInvalidFields();
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        
        // Collect form data
        const formData = {
            q1: document.getElementById('q1').value,
            q2: document.querySelector('input[name="q2"]:checked')?.value || '',
            q2_explanation: document.getElementById('q2-explanation')?.value || '',
            q3: document.getElementById('q3').value,
            q4: document.getElementById('q4')?.value || '',
            q5: document.getElementById('q5').value,
            q6: document.getElementById('q6').value,
            q7: document.querySelector('input[name="q7"]:checked')?.value || '',
            q8: document.querySelector('input[name="q8"]:checked')?.value || '',
            q9: document.getElementById('q9')?.value || '',
            q10: document.getElementById('q10')?.value || '',
            q11: document.querySelector('input[name="q11"]:checked')?.value || ''
        };
        
        // Google Apps Script Web App URL
        const scriptURL = 'https://script.google.com/macros/s/AKfycbzqN5qSea7joYsuu1wf8fmHZjNRkGHhBTDLTK_JTy8-syJ-2rky2S3A_q2YHJyaB-wFKw/exec';
        
        // Send data to Google Sheets
        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            
            setTimeout(() => {
                showSuccessModal();
                resetForm();
            }, 1000);
        })
        .catch(error => {
            console.error('Error:', error);
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            
            setTimeout(() => {
                showSuccessModal();
                resetForm();
            }, 1000);
        });
    }
    
    function validateForm() {
        let isValid = true;
        const requiredFields = [
            'q1', 'q2', 'q3', 'q5', 'q6', 'q7', 'q8', 'q11'
        ];
        
        requiredFields.forEach(field => {
            const element = document.querySelector(`[name="${field}"]`);
            if (!element || (element.type === 'radio' && !document.querySelector(`[name="${field}"]:checked`)) || 
                (element.type === 'hidden' && !element.value)) {
                isValid = false;
                markFieldInvalid(field);
            } else {
                markFieldValid(field);
            }
        });
        
        return isValid;
    }
    
    function markFieldInvalid(fieldName) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (field) {
            const formGroup = field.closest('.form-group');
            if (formGroup) {
                formGroup.classList.add('invalid');
                formGroup.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    formGroup.style.animation = '';
                }, 500);
            }
        }
    }
    
    function markFieldValid(fieldName) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (field) {
            const formGroup = field.closest('.form-group');
            if (formGroup) {
                formGroup.classList.remove('invalid');
                formGroup.classList.add('valid');
            }
        }
    }
    
    function shakeInvalidFields() {
        const invalidFields = document.querySelectorAll('.form-group.invalid');
        invalidFields.forEach(field => {
            field.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                field.style.animation = '';
            }, 500);
        });
        
        // Scroll to first invalid field
        if (invalidFields.length > 0) {
            invalidFields[0].scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }
    
    function showSuccessModal() {
        const modal = document.getElementById('successModal');
        modal.style.display = 'flex';
        modal.classList.add('animate__zoomIn');
        
        // Add celebration effects
        triggerCelebration();
    }
    
    function closeSuccessModal() {
        const modal = document.getElementById('successModal');
        modal.classList.remove('animate__zoomIn');
        modal.classList.add('animate__zoomOut');
        
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('animate__zoomOut');
        }, 500);
    }
    
    function triggerCelebration() {
        // Add more confetti
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createConfettiParticle(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight
                );
            }, i * 50);
        }
        
        // Add success sound (in a real app)
        console.log('🎉 Celebration time!');
    }
    
    function resetForm() {
        setTimeout(() => {
            // Reset form visually
            document.getElementById('feedbackForm').reset();
            
            // Reset all selected states
            document.querySelectorAll('.rating-option.selected').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            document.querySelectorAll('.radio-option.selected').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            document.querySelectorAll('.form-group.valid').forEach(group => {
                group.classList.remove('valid');
            });
            
            // Reset button state
            submitBtn.classList.remove('success');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1000);
    }
    
    // Add some interactive background effects
    document.addEventListener('mousemove', (e) => {
        const floatingElements = document.querySelectorAll('.floating');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        floatingElements.forEach((el, index) => {
            const speed = (index + 1) * 0.0002;
            const x = (mouseX - 0.5) * speed * window.innerWidth;
            const y = (mouseY - 0.5) * speed * window.innerHeight;
            
            el.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.type !== 'textarea') {
            e.preventDefault();
        }
    });
    
    // Add resize handler for responsive adjustments
    window.addEventListener('resize', () => {
        document.querySelectorAll('.character-counter').forEach(counter => {
            counter.style.opacity = '0';
        });
    });
    
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
    
    // Progress bar functionality
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
        
        // Update progress on form interaction
        const formInputs = document.querySelectorAll('input[required], textarea[required]');
        let totalRequired = formInputs.length;
        
        function updateFormProgress() {
            let completed = 0;
            formInputs.forEach(input => {
                if (input.type === 'radio') {
                    const name = input.name;
                    if (document.querySelector(`input[name="${name}"]:checked`)) {
                        completed++;
                    }
                } else if (input.value) {
                    completed++;
                }
            });
            
            const progress = (completed / totalRequired) * 100;
            progressFill.style.width = `${progress}%`;
        }
        
        // Listen to form changes
        form.addEventListener('change', updateFormProgress);
        form.addEventListener('input', updateFormProgress);
    }
});
