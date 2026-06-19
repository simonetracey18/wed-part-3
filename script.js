// script.js - Part 3 Enhancements for Pretty and Clawed

document.addEventListener('DOMContentLoaded', function() {

    // 1. Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 2. Gallery Lightbox (works on any image with class "gallery-img")
    function initLightbox() {
        const images = document.querySelectorAll('img.gallery-img, .card img');
        if (images.length === 0) return;

        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.cssText = `
            display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.95); z-index: 10000; justify-content: center;
            align-items: center; cursor: pointer;
        `;
        lightbox.innerHTML = `<img id="lightbox-img" style="max-width: 90%; max-height: 90%; border-radius: 12px;">`;
        document.body.appendChild(lightbox);

        images.forEach(img => {
            img.style.cursor = 'pointer';
            img.classList.add('gallery-img');
            img.addEventListener('click', () => {
                document.getElementById('lightbox-img').src = img.src;
                lightbox.style.display = 'flex';
            });
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.style.display = 'none';
        });
    }

    // 3. Service Search/Filter on service.html
    function initServiceFilter() {
        const searchInput = document.getElementById('service-search');
        if (!searchInput) return;

        searchInput.addEventListener('keyup', function() {
            const term = this.value.toLowerCase();
            const cards = document.querySelectorAll('.card');

            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(term) ? 'block' : 'none';
            });
        });
    }

    // 4. Form Validation (used by both enquiry and contact)
    window.validateForm = function(e) {
        e.preventDefault();
       
        const name = document.querySelector('input[name="name"], #name')?.value.trim();
        const email = document.querySelector('input[name="email"], #email')?.value.trim();
       
        if (!name || name.length < 3) {
            alert("Please enter your full name (minimum 3 characters).");
            return false;
        }
       
        if (!email || !email.includes('@')) {
            alert("Please enter a valid email address.");
            return false;
        }
       
        alert("Thank you! Your message has been received. We will contact you soon.");
        e.target.reset();
        return true;
    };

    // Initialize everything
    initLightbox();
    initServiceFilter();
});