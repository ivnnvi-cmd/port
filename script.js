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
const submitBtn = document.getElementById('submitBtn');

// Handle form submission with Netlify Forms
if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(contactForm);
            
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });
            
            if (response.ok) {
                // Success - show message and reset form
                alert('Thank you! Your message has been sent successfully. I will get back to you soon!');
                contactForm.reset();
            } else {
                // Error from server
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Network error or other issue
            alert('Oops! There was a problem sending your message. Please try again or email me directly at jesignnnnnnnmedia@gmail.com');
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }
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
    
    // Use PDF.js viewer for better compatibility with Git LFS on Netlify
    // PDF.js can handle cross-origin and large files better than native iframe
    const viewerUrl = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(window.location.origin + '/' + pdfPath)}`;
    
    pdfViewerFrame.src = viewerUrl;
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
    
    // Use PDF.js viewer for better compatibility
    const viewerUrl = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(window.location.origin + '/' + pdfPath)}`;
    
    pdfViewerFrame.src = viewerUrl;
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

// ===== Video Modal =====
const videoItems = document.querySelectorAll('.video-item');
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const videoModalClose = document.querySelector('.video-modal-close');
const videoPrev = document.getElementById('videoPrev');
const videoNext = document.getElementById('videoNext');
let currentVideoIndex = 0;

// Lazy load video thumbnails using Intersection Observer
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const video = entry.target;
            if (video.dataset.src) {
                video.src = video.dataset.src;
                video.load();
                delete video.dataset.src;
            }
            videoObserver.unobserve(video);
        }
    });
}, {
    rootMargin: '50px'
});

// Set up lazy loading for video thumbnails
document.querySelectorAll('.video-thumbnail video').forEach(video => {
    const source = video.querySelector('source');
    if (source && source.src) {
        video.dataset.src = source.src;
        source.removeAttribute('src');
    }
    videoObserver.observe(video);
});

function openVideoModal(index) {
    currentVideoIndex = index;
    const videoSrc = videoItems[currentVideoIndex].getAttribute('data-video');
    modalVideo.querySelector('source').src = videoSrc;
    modalVideo.load();
    videoModal.classList.add('active');
    
    // Request fullscreen
    setTimeout(() => {
        if (modalVideo.requestFullscreen) {
            modalVideo.requestFullscreen();
        } else if (modalVideo.webkitRequestFullscreen) {
            modalVideo.webkitRequestFullscreen();
        } else if (modalVideo.msRequestFullscreen) {
            modalVideo.msRequestFullscreen();
        }
    }, 100);
}

function closeVideoModal() {
    videoModal.classList.remove('active');
    modalVideo.pause();
    modalVideo.currentTime = 0;
    
    // Exit fullscreen if active
    if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

function showNextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videoItems.length;
    openVideoModal(currentVideoIndex);
}

function showPrevVideo() {
    currentVideoIndex = (currentVideoIndex - 1 + videoItems.length) % videoItems.length;
    openVideoModal(currentVideoIndex);
}

videoItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openVideoModal(index);
    });
});

videoModalClose.addEventListener('click', closeVideoModal);

videoPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrevVideo();
});

videoNext.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextVideo();
});

// Close video modal when clicking outside
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        closeVideoModal();
    }
});

// Close video modal with Escape key and navigate with arrow keys
document.addEventListener('keydown', (e) => {
    if (videoModal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeVideoModal();
        } else if (e.key === 'ArrowRight') {
            showNextVideo();
        } else if (e.key === 'ArrowLeft') {
            showPrevVideo();
        }
    }
});

// ===== Register Service Worker for offline support =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(() => {
                // Service Worker registered successfully
            })
            .catch(() => {
                // Service Worker registration failed
            });
    });
}