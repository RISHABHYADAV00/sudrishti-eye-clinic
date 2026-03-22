// Sudrishti Eye Clinic - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Header
    const header = document.getElementById('header');
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });

    // 2. Hero Slider
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 1) {
        setInterval(nextSlide, slideInterval);
    }

    // 2.5 Review Slider
    const reviewSlides = document.querySelectorAll('.review-slide');
    let currentReview = 0;
    
    function showReview(index) {
        if (!reviewSlides.length) return;
        reviewSlides.forEach(slide => slide.classList.remove('active'));
        if(index >= reviewSlides.length) currentReview = 0;
        else if (index < 0) currentReview = reviewSlides.length - 1;
        else currentReview = index;
        
        reviewSlides[currentReview].classList.add('active');
    }

    const nextReviewBtn = document.getElementById('next-review');
    const prevReviewBtn = document.getElementById('prev-review');

    if(nextReviewBtn && prevReviewBtn && reviewSlides.length > 0) {
        nextReviewBtn.addEventListener('click', () => showReview(currentReview + 1));
        prevReviewBtn.addEventListener('click', () => showReview(currentReview - 1));
        
        // Auto slide
        setInterval(() => {
            showReview(currentReview + 1);
        }, 6000);
    }

    // 3. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Booking Form Handling
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                service: document.getElementById('service').value
            };

            console.log('Booking request received:', formData);

            // Simple success feedback
            const btn = bookingForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-check"></i> Request Sent!';
            btn.style.background = 'var(--accent-green)';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = 'var(--primary-blue)';
                btn.disabled = false;
                bookingForm.reset();
                alert(`Thank you ${formData.name}! Your appointment request for ${formData.date} at ${formData.time} has been sent. We will contact you shortly.`);
            }, 2000);
        });
    }

    // 5. Active Link Highlighting
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
        
        // Special case for home
        if (window.scrollY < 300) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === 'index.html' || link.getAttribute('href') === '#') {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });

});
