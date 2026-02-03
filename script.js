// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Smooth Scrolling =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Navbar Background on Scroll =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
    }
});

// ===== Portfolio Filtering =====
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Function to show items by category
function filterPortfolio(filterValue) {
    portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (category === filterValue) {
            item.classList.remove('hidden');
            item.style.display = 'block';
        } else {
            item.classList.add('hidden');
            item.style.display = 'none';
        }
    });
}

// Show brand-kits by default on page load
document.addEventListener('DOMContentLoaded', () => {
    filterPortfolio('brand-kits');
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        filterPortfolio(filterValue);
    });
});

// ===== Lightbox Functionality =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImageIndex = 0;
let visibleImages = [];

// Function to update visible images array
function updateVisibleImages() {
    visibleImages = Array.from(portfolioItems).filter(item => {
        return !item.classList.contains('hidden') && 
               window.getComputedStyle(item).display !== 'none';
    });
}

// Open lightbox when clicking on portfolio item
portfolioItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        // Handle PDF items - open in PDF viewer modal
        if (item.classList.contains('portfolio-item-pdf')) {
            openPDFViewer(item);
            return;
        }
        
        updateVisibleImages();
        currentImageIndex = visibleImages.indexOf(item);
        
        const img = item.querySelector('img');
        const overlay = item.querySelector('.portfolio-overlay');
        const title = overlay.querySelector('h3').textContent;
        const subtitle = overlay.querySelector('p').textContent;
        
        lightboxImg.src = img.src;
        lightboxCaption.textContent = `${title} - ${subtitle}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close lightbox
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Navigate through images
lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateImage(-1);
});

lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateImage(1);
});

function navigateImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = visibleImages.length - 1;
    } else if (currentImageIndex >= visibleImages.length) {
        currentImageIndex = 0;
    }
    
    const currentItem = visibleImages[currentImageIndex];
    const img = currentItem.querySelector('img');
    const overlay = currentItem.querySelector('.portfolio-overlay');
    const title = overlay.querySelector('h3').textContent;
    const subtitle = overlay.querySelector('p').textContent;
    
    lightboxImg.src = img.src;
    lightboxCaption.textContent = `${title} - ${subtitle}`;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateImage(-1);
        } else if (e.key === 'ArrowRight') {
            navigateImage(1);
        }
    }
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

// Check if form is Netlify-enabled
if (contactForm.hasAttribute('data-netlify')) {
    // Netlify will handle the form submission
    contactForm.addEventListener('submit', (e) => {
        // Let Netlify handle it, but show a friendly message
        const name = document.getElementById('name').value;
        setTimeout(() => {
            alert(`Thank you, ${name}! Your message has been sent successfully.`);
        }, 100);
    });
} else {
    // Fallback for local testing
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        alert(`Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon.`);
        contactForm.reset();
    });
}

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all portfolio items and video items
document.addEventListener('DOMContentLoaded', () => {
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});

// ===== Pause all videos when one is playing =====
const videos = document.querySelectorAll('video');

videos.forEach(video => {
    video.addEventListener('play', () => {
        videos.forEach(otherVideo => {
            if (otherVideo !== video) {
                otherVideo.pause();
            }
        });
    });
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    const navHeight = document.querySelector('.navbar').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - navHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Native Lazy Loading (Simple & Effective) =====
// Modern browsers handle this automatically with loading="lazy"
// No JavaScript needed!

// ===== Preload hero image =====
window.addEventListener('load', () => {
    const heroSection = document.querySelector('.hero');
    heroSection.style.opacity = '1';
});

// ===== Performance: Reduce motion for users who prefer it =====
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// ===== PDF Viewer Functionality =====
const pdfViewer = document.getElementById('pdfViewer');
const pdfViewerFrame = document.getElementById('pdfViewerFrame');
const pdfViewerTitle = document.getElementById('pdfViewerTitle');
const pdfViewerLink = document.getElementById('pdfViewerLink');
const pdfViewerClose = document.querySelector('.pdf-viewer-close');
const pdfViewerPrev = document.getElementById('pdfViewerPrev');
const pdfViewerNext = document.getElementById('pdfViewerNext');

let currentPDFIndex = 0;
let visiblePDFs = [];

// Function to update visible PDFs array
function updateVisiblePDFs() {
    visiblePDFs = Array.from(portfolioItems).filter(item => {
        return item.classList.contains('portfolio-item-pdf') &&
               !item.classList.contains('hidden') && 
               window.getComputedStyle(item).display !== 'none';
    });
}

// Open PDF viewer
function openPDFViewer(item) {
    updateVisiblePDFs();
    currentPDFIndex = visiblePDFs.indexOf(item);
    
    const pdfPath = item.getAttribute('data-pdf');
    const overlay = item.querySelector('.portfolio-overlay');
    const title = overlay.querySelector('h3').textContent;
    
    pdfViewerFrame.src = pdfPath;
    pdfViewerTitle.textContent = title;
    pdfViewerLink.href = pdfPath;
    pdfViewer.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close PDF viewer
pdfViewerClose.addEventListener('click', closePDFViewer);
pdfViewer.addEventListener('click', (e) => {
    if (e.target === pdfViewer) {
        closePDFViewer();
    }
});

function closePDFViewer() {
    pdfViewer.classList.remove('active');
    pdfViewerFrame.src = '';
    document.body.style.overflow = 'auto';
}

// Navigate through PDFs
pdfViewerPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    navigatePDF(-1);
});

pdfViewerNext.addEventListener('click', (e) => {
    e.stopPropagation();
    navigatePDF(1);
});

function navigatePDF(direction) {
    currentPDFIndex += direction;
    
    if (currentPDFIndex < 0) {
        currentPDFIndex = visiblePDFs.length - 1;
    } else if (currentPDFIndex >= visiblePDFs.length) {
        currentPDFIndex = 0;
    }
    
    const currentItem = visiblePDFs[currentPDFIndex];
    const pdfPath = currentItem.getAttribute('data-pdf');
    const overlay = currentItem.querySelector('.portfolio-overlay');
    const title = overlay.querySelector('h3').textContent;
    
    pdfViewerFrame.src = pdfPath;
    pdfViewerTitle.textContent = title;
    pdfViewerLink.href = pdfPath;
}

// Keyboard navigation for PDF viewer
document.addEventListener('keydown', (e) => {
    if (pdfViewer.classList.contains('active')) {
        if (e.key === 'Escape') {
            closePDFViewer();
        } else if (e.key === 'ArrowLeft') {
            navigatePDF(-1);
        } else if (e.key === 'ArrowRight') {
            navigatePDF(1);
        }
    }
});

console.log('Jesign Media Portfolio - Loaded Successfully! 🎨');