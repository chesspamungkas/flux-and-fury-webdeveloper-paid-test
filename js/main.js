/**
 * DROP ZERO DIGITAL - Web Developer Paid Test
 * Main JavaScript
 * 
 * Features:
 * 1. Brand Tab Switching
 * 2. Mobile Navigation
 * 3. Video Player Controls
 * 4. Scroll Animations
 * 
 * Integration Notes:
 * - This file uses vanilla JavaScript with no external dependencies
 * - All selectors use data attributes for flexibility
 * - The brand switching uses the hidden attribute for accessibility
 * - URL hash changes are supported for direct linking to brands
 */

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================
    const CONFIG = {
        selectors: {
            brandTabs: '.brand-tab',
            caseStudies: '.case-study',
            mobileMenuToggle: '.mobile-menu-toggle',
            header: '.site-header',
            playButton: '.play-button',
            video: '#testimonial-video'
        },
        classes: {
            active: 'active',
            menuOpen: 'menu-open'
        },
        animation: {
            duration: 400
        }
    };

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    
    /**
     * Safely query an element
     * @param {string} selector - CSS selector
     * @param {Element} context - Parent element (defaults to document)
     * @returns {Element|null}
     */
    function $(selector, context = document) {
        return context.querySelector(selector);
    }

    /**
     * Safely query all elements
     * @param {string} selector - CSS selector
     * @param {Element} context - Parent element (defaults to document)
     * @returns {NodeList}
     */
    function $$(selector, context = document) {
        return context.querySelectorAll(selector);
    }

    /**
     * Add event listener with error handling
     * @param {Element|NodeList} elements - Target element(s)
     * @param {string} event - Event type
     * @param {Function} handler - Event handler
     */
    function on(elements, event, handler) {
        if (!elements) return;
        
        if (elements instanceof NodeList || Array.isArray(elements)) {
            elements.forEach(el => el.addEventListener(event, handler));
        } else {
            elements.addEventListener(event, handler);
        }
    }

    // ============================================
    // BRAND TAB SWITCHING
    // ============================================
    
    /**
     * BrandSwitcher Module
     * Handles switching between different brand case studies
     * 
     * Usage:
     * - Click on brand tabs to switch content
     * - Direct link via URL hash: #wateranywhere, #fromental
     * - Programmatic: BrandSwitcher.switchTo('wateranywhere')
     */
    const BrandSwitcher = {
        tabs: null,
        panels: null,
        currentBrand: 'jamali-garden',

        /**
         * Initialize the brand switcher
         */
        init() {
            this.tabs = $$(CONFIG.selectors.brandTabs);
            this.panels = $$(CONFIG.selectors.caseStudies);

            if (!this.tabs.length || !this.panels.length) {
                console.warn('BrandSwitcher: Required elements not found');
                return;
            }

            this.bindEvents();
            this.checkUrlHash();
        },

        /**
         * Bind click events to tabs
         */
        bindEvents() {
            this.tabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    e.preventDefault();
                    const brand = tab.dataset.brand;
                    if (brand) {
                        this.switchTo(brand);
                        this.updateUrlHash(brand);
                    }
                });
            });

            // Listen for hash changes (browser back/forward)
            window.addEventListener('hashchange', () => {
                this.checkUrlHash();
            });
        },

        /**
         * Switch to a specific brand
         * @param {string} brandId - The brand identifier
         */
        switchTo(brandId) {
            if (this.currentBrand === brandId) return;

            // Update tabs
            this.tabs.forEach(tab => {
                const isActive = tab.dataset.brand === brandId;
                tab.classList.toggle(CONFIG.classes.active, isActive);
                tab.setAttribute('aria-selected', isActive);
            });

            // Update panels with animation
            this.panels.forEach(panel => {
                const isTarget = panel.dataset.brand === brandId;
                
                if (isTarget) {
                    panel.hidden = false;
                    // Use requestAnimationFrame to avoid forced reflow
                    requestAnimationFrame(() => {
                        panel.style.animation = 'fadeIn 0.4s ease-out forwards';
                    });
                } else {
                    panel.hidden = true;
                    panel.style.animation = '';
                }
            });

            this.currentBrand = brandId;

            // Scroll to case study section
            const targetPanel = $(`[data-brand="${brandId}"]`);
            if (targetPanel) {
                setTimeout(() => {
                    targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        },

        /**
         * Update URL hash for direct linking
         * @param {string} brandId - The brand identifier
         */
        updateUrlHash(brandId) {
            if (brandId === 'jamali-garden') {
                // Remove hash for default brand
                history.replaceState(null, null, window.location.pathname);
            } else {
                history.replaceState(null, null, `#${brandId}`);
            }
        },

        /**
         * Check URL hash on page load
         */
        checkUrlHash() {
            const hash = window.location.hash.slice(1);
            if (hash && ['jamali-garden', 'wateranywhere', 'fromental'].includes(hash)) {
                this.switchTo(hash);
            }
        }
    };

    // ============================================
    // MOBILE NAVIGATION
    // ============================================
    
    /**
     * MobileNav Module
     * Handles mobile navigation toggle
     */
    const MobileNav = {
        toggle: null,
        header: null,
        isOpen: false,

        init() {
            this.toggle = $(CONFIG.selectors.mobileMenuToggle);
            this.header = $(CONFIG.selectors.header);

            if (!this.toggle || !this.header) return;

            this.bindEvents();
        },

        bindEvents() {
            this.toggle.addEventListener('click', () => {
                this.isOpen = !this.isOpen;
                this.header.classList.toggle(CONFIG.classes.menuOpen, this.isOpen);
                this.toggle.setAttribute('aria-expanded', this.isOpen);
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (this.isOpen && !this.header.contains(e.target)) {
                    this.close();
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            });
        },

        close() {
            this.isOpen = false;
            this.header.classList.remove(CONFIG.classes.menuOpen);
            this.toggle.setAttribute('aria-expanded', false);
        }
    };

    // ============================================
    // VIDEO PLAYER
    // ============================================
    
    /**
     * VideoPlayer Module
     * Handles video play/pause functionality and responsive poster
     */
    const VideoPlayer = {
        /**
         * Update video poster based on screen size
         * Since HTML5 video poster attribute doesn't support srcset,
         * we use JavaScript to set the appropriate poster image
         */
        updatePoster() {
            // Use requestAnimationFrame to batch DOM updates and avoid forced reflow
            requestAnimationFrame(() => {
                const videos = $$('video[poster]');
                const width = window.innerWidth;
                const isMobile = width <= 768;
                
                videos.forEach(video => {
                    // Ensure we are only targeting the DZD logo video poster
                    if (video.id === 'testimonial-video') {
                        let targetPoster;
                        
                        if (isMobile) {
                            // Mobile: use mobile version (570×228 px)
                            targetPoster = '/assets/DZD_logo_colored_transparent-mobile.webp';
                        } else {
                            // Desktop: use desktop version (1125×450 px)
                            // File: DZD_logo_colored_transparent.webp (no suffix)
                            targetPoster = '/assets/DZD_logo_colored_transparent.webp';
                        }
                        
                        // Only update if different to avoid unnecessary changes
                        if (video.poster !== targetPoster) {
                            video.poster = targetPoster;
                        }
                    }
                });
            });
        },

        init() {
            const playButtons = $$(CONFIG.selectors.playButton);

            playButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const wrapper = button.closest('.video-wrapper');
                    const video = $('video', wrapper);

                    if (video) {
                        if (video.paused) {
                            video.play();
                            button.style.opacity = '0';
                            button.style.pointerEvents = 'none';
                        }
                    }
                });
            });

            // Set responsive poster on init and window resize
            this.updatePoster();
            
            // Throttle resize events to avoid excessive calls
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    this.updatePoster();
                }, 150);
            }, { passive: true });

            // Show play button again when video ends or pauses
            const videos = $$('video');
            videos.forEach(video => {
                // Handle video load errors gracefully
                video.addEventListener('error', (e) => {
                    console.warn('Video failed to load:', video.src, e);
                    const wrapper = video.closest('.video-wrapper');
                    const button = $(CONFIG.selectors.playButton, wrapper);
                    if (button) {
                        // Keep play button visible if video fails to load
                        button.style.opacity = '1';
                        button.style.pointerEvents = 'none';
                        button.style.cursor = 'not-allowed';
                        button.setAttribute('title', 'Video unavailable');
                    }
                });

                // Log video loading state for debugging
                video.addEventListener('loadstart', () => {
                    console.log('Video loading started:', video.src);
                });

                video.addEventListener('canplay', () => {
                    console.log('Video can play:', video.src);
                });

                video.addEventListener('pause', () => {
                    const wrapper = video.closest('.video-wrapper');
                    const button = $(CONFIG.selectors.playButton, wrapper);
                    if (button) {
                        button.style.opacity = '1';
                        button.style.pointerEvents = 'auto';
                    }
                });

                video.addEventListener('ended', () => {
                    const wrapper = video.closest('.video-wrapper');
                    const button = $(CONFIG.selectors.playButton, wrapper);
                    if (button) {
                        button.style.opacity = '1';
                        button.style.pointerEvents = 'auto';
                    }
                });

                // Click on video to pause
                video.addEventListener('click', () => {
                    if (!video.paused) {
                        video.pause();
                    }
                });
            });
        }
    };

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    
    /**
     * ScrollAnimations Module
     * Adds entrance animations as elements come into view
     */
    const ScrollAnimations = {
        observer: null,

        init() {
            if (!('IntersectionObserver' in window)) return;

            this.observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate-in');
                            this.observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                }
            );

            // Observe animated elements
            const animatedElements = $$('.results-content, .stats-card, .timeline-item, .gallery-content, .video-content');
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                this.observer.observe(el);
            });
        }
    };

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    
    /**
     * SmoothScroll Module
     * Handles smooth scrolling for anchor links
     */
    const SmoothScroll = {
        init() {
            const anchors = $$('a[href^="#"]');
            
            anchors.forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const targetId = anchor.getAttribute('href');
                    if (targetId === '#') return;

                    const target = $(targetId);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    };

    // ============================================
    // HEADER SCROLL MODULE
    // ============================================
    
    /**
     * HeaderScroll Module
     * Changes header background on scroll
     */
    const HeaderScroll = {
        header: null,
        scrollThreshold: 50,
        ticking: false,

        init() {
            this.header = $(CONFIG.selectors.header);
            if (!this.header) return;

            this.bindEvents();
            this.checkScroll(); // Check initial scroll position
        },

        bindEvents() {
            window.addEventListener('scroll', () => {
                if (!this.ticking) {
                    window.requestAnimationFrame(() => {
                        this.checkScroll();
                        this.ticking = false;
                    });
                    this.ticking = true;
                }
            }, { passive: true });
        },

        checkScroll() {
            // Batch DOM updates to avoid forced reflow
            const shouldScroll = window.scrollY > this.scrollThreshold;
            const hasScrolled = this.header.classList.contains('scrolled');
            
            // Only update if state changed
            if (shouldScroll && !hasScrolled) {
                this.header.classList.add('scrolled');
            } else if (!shouldScroll && hasScrolled) {
                this.header.classList.remove('scrolled');
            }
        }
    };

    // ============================================
    // INITIALIZATION
    // ============================================
    
    /**
     * Initialize all modules when DOM is ready
     */
    function init() {
        BrandSwitcher.init();
        MobileNav.init();
        VideoPlayer.init();
        ScrollAnimations.init();
        SmoothScroll.init();
        HeaderScroll.init();

        // console.log('Drop Zero Digital - Web Developer Paid Test Initialized');
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================
    // PUBLIC API
    // ============================================
    
    /**
     * Expose certain functions for external use
     * This allows other scripts to interact with the case studies
     * 
     * Usage:
     * window.DZD.switchBrand('wateranywhere');
     */
    window.DZD = {
        switchBrand: (brandId) => BrandSwitcher.switchTo(brandId),
        getCurrentBrand: () => BrandSwitcher.currentBrand
    };

})();

