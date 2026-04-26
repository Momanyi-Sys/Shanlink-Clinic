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

    if (searchButtons && searchOverlay) {
        searchButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                searchOverlay.classList.remove('hidden');
                searchOverlay.classList.add('flex');
                setTimeout(() => {
                    document.getElementById('search-input')?.focus();
                }, 100);
            });
        });

        closeSearch?.addEventListener('click', () => {
            searchOverlay.classList.add('hidden');
            searchOverlay.classList.remove('flex');
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !searchOverlay.classList.contains('hidden')) {
                searchOverlay.classList.add('hidden');
                searchOverlay.classList.remove('flex');
            }
        });
    }
});
