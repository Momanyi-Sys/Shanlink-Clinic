// Global JavaScript for Shanlink Medical Clinic

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Year
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });

    // 2. Dark Mode Disabled — always use light mode
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('theme');

    // 3. Search Functionality
    const searchButtons = document.querySelectorAll('[aria-label="Search"], .search-trigger');
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');
    const searchSubmit = searchInput?.nextElementSibling; // The button next to input

    const searchMap = {
        'home': 'index.html',
        'clinic': 'index.html',
        'hospital': 'index.html',
        'about': 'about.html',
        'us': 'about.html',
        'vision': 'about.html',
        'mission': 'about.html',
        'story': 'about.html',
        'services': 'services.html',
        'care': 'services.html',
        'treatment': 'services.html',
        'doctors': 'doctors.html',
        'physicians': 'doctors.html',
        'specialists': 'doctors.html',
        'team': 'doctors.html',
        'staff': 'doctors.html',
        'appointments': 'appointments.html',
        'book': 'appointments.html',
        'booking': 'appointments.html',
        'emergency': 'appointments.html',
        'urgent': 'appointments.html',
        'pharmacy': 'pharmacy.html',
        'medicine': 'pharmacy.html',
        'drugs': 'pharmacy.html',
        'medication': 'pharmacy.html',
        'contact': 'contact.html',
        'reviews': 'contact.html',
        'feedback': 'contact.html',
        'location': 'contact.html',
        'address': 'contact.html',
        'phone': 'contact.html',
        'email': 'contact.html'
    };

    const performSearch = () => {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) return;

        console.log('Searching for:', query);

        let found = false;
        // Search for exact keyword match first, then partial
        for (const [key, url] of Object.entries(searchMap)) {
            if (query === key || query.includes(key) || key.includes(query)) {
                console.log('Match found:', key, '->', url);
                window.location.href = url;
                found = true;
                break;
            }
        }

        if (!found) {
            console.log('No match found for:', query);
            alert('Search result for "' + query + '" not found. Returning to Home.');
            window.location.href = 'index.html';
        }
    };

    if (searchButtons && searchOverlay) {
        searchButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                searchOverlay.classList.remove('hidden');
                searchOverlay.classList.add('flex');
                setTimeout(() => {
                    if (searchInput) {
                        searchInput.value = ''; // Clear previous search
                        searchInput.focus();
                    }
                }, 100);
            });
        });

        closeSearch?.addEventListener('click', () => {
            searchOverlay.classList.add('hidden');
            searchOverlay.classList.remove('flex');
        });

        // Search execution
        searchInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        searchSubmit?.addEventListener('click', () => {
            performSearch();
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !searchOverlay.classList.contains('hidden')) {
                searchOverlay.classList.add('hidden');
                searchOverlay.classList.remove('flex');
            }
        });
    }

    // 4. Mobile Menu Functionality
    const mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenu = document.getElementById('close-mobile-menu');
    const mobileLinks = mobileMenu?.querySelectorAll('nav a');

    // Create backdrop
    const menuBackdrop = document.createElement('div');
    menuBackdrop.id = 'menu-backdrop';
    menuBackdrop.style.cssText = 'position:fixed;inset:0;z-index:69;background:rgba(0,0,0,0.35);backdrop-filter:blur(2px);display:none;opacity:0;transition:opacity 0.25s ease';
    document.body.appendChild(menuBackdrop);

    // Slide-in styles
    if (mobileMenu) {
        mobileMenu.style.transform = 'translateX(100%)';
        mobileMenu.style.transition = 'transform 0.3s cubic-bezier(0.4,0,0.2,1)';
    }

    if (mobileMenuTrigger && mobileMenu) {
        const openMenu = () => {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            menuBackdrop.style.display = 'block';
            requestAnimationFrame(() => {
                mobileMenu.style.transform = 'translateX(0)';
                menuBackdrop.style.opacity = '1';
            });
        };

        const closeMenu = () => {
            mobileMenu.style.transform = 'translateX(100%)';
            menuBackdrop.style.opacity = '0';
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                menuBackdrop.style.display = 'none';
            }, 300);
        };

        mobileMenuTrigger.addEventListener('click', openMenu);
        closeMobileMenu?.addEventListener('click', closeMenu);
        menuBackdrop.addEventListener('click', closeMenu);

        // Close on link click
        mobileLinks?.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                closeMenu();
            }
        });
    }

    // 5. Nav Scroll Effect
    const mainHeader = document.getElementById('main-header');
    if (mainHeader) {
        const updateNav = () => {
            if (window.scrollY > 20) {
                mainHeader.classList.add('nav-scrolled');
            } else {
                mainHeader.classList.remove('nav-scrolled');
            }
        };
        window.addEventListener('scroll', updateNav, { passive: true });
        updateNav(); // Run on load
    }
});
