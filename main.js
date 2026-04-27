// Global JavaScript for Shanlink Medical Clinic

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Year
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });

    // 2. Global Dark Mode
    const themeToggleButtons = document.querySelectorAll('[aria-label="Toggle Dark Mode"], .theme-toggle');
    const html = document.documentElement;

    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        html.classList.add('dark');
    } else if (savedTheme === 'light') {
        html.classList.remove('dark');
    } else {
        // System preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            html.classList.add('dark');
        }
    }

    themeToggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            html.classList.toggle('dark');
            const isDark = html.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    });

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

    if (mobileMenuTrigger && mobileMenu) {
        mobileMenuTrigger.addEventListener('click', () => {
            console.log('Mobile menu trigger clicked');
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        const closeMenu = () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            document.body.style.overflow = ''; // Restore scrolling
        };

        closeMobileMenu?.addEventListener('click', closeMenu);

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
