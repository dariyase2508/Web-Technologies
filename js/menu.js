
$(document).ready(function () {

    // ==========================================
    // 1. MENU CATEGORY FILTERING
    // ==========================================

    const categories = ['featured', 'antipasti', 'pasta', 'pizza', 'dolce'];

    let activeCategory = 'all';

    const categoryLinks = $('.category-link');

    const sidebarLinks = $(
        '.sidebar a[href="#featured"], ' +
        '.sidebar a[href="#antipasti"], ' +
        '.sidebar a[href="#pasta"], ' +
        '.sidebar a[href="#pizza"], ' +
        '.sidebar a[href="#dolce"]'
    );

    // Show all categories or only the selected category
    function showCategory(category) {

        activeCategory = category;

        if (category === 'all') {

            categories.forEach(function (name) {
                $('#' + name).show();
            });

        } else if (categories.includes(category)) {

            categories.forEach(function (name) {
                $('#' + name).toggle(name === category);
            });

        } else {
            return;
        }

        categoryLinks.removeClass('active');

        categoryLinks
            .filter('[data-category="' + category + '"]')
            .addClass('active');
    }

    // Top category navigation
    categoryLinks.on('click', function (e) {

        e.preventDefault();

        const category = $(this).data('category');

        showCategory(category);
        applyMenuSearch($input.val());
    });

    // Sidebar category navigation
    sidebarLinks.on('click', function (e) {

        e.preventDefault();

        const category = $(this).attr('href').substring(1);

        showCategory(category);
        applyMenuSearch($input.val());

        const target = $('#' + category);

        if (target.length) {

            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 400);

        }
    });

    // Show all menu categories by default
    showCategory('all');


    // ==========================================
    // 2. SEARCH AUTOCOMPLETE
    // ==========================================

    const $input = $('#searchInput');
    const $list = $('#autocomplete-list');
    const $searchButton = $('#menuSearchBtn');
    const $noResults = $('#menuNoResults');

    const searchableDishes = [

        { name: "Bruschetta al Pomodoro", category: "Antipasti", target: "antipasti" },
        { name: "Caprese Salad", category: "Antipasti", target: "antipasti" },
        { name: "Arancini Siciliani", category: "Antipasti", target: "antipasti" },

        { name: "Spaghetti Carbonara", category: "Pasta", target: "pasta" },
        { name: "Tagliatelle al Ragù Bolognese", category: "Pasta", target: "pasta" },
        { name: "Penne all'Arrabbiata", category: "Pasta", target: "pasta" },

        { name: "Pizza Margherita", category: "Pizza", target: "pizza" },
        { name: "Quattro Formaggi", category: "Pizza", target: "pizza" },
        { name: "Prosciutto e Funghi", category: "Pizza", target: "pizza" },

        { name: "Classic Tiramisù", category: "Dolce", target: "dolce" },
        { name: "Vanilla Panna Cotta", category: "Dolce", target: "dolce" },
        { name: "Sicilian Cannoli", category: "Dolce", target: "dolce" }

    ];

    let currentMatches = [];
    let activeIndex = -1;


    // ==========================================
    // 3. SEARCH HIGHLIGHTING
    // ==========================================

    function highlightSearchTerm(keyword) {

        $('.menu-item h3, .menu-item p, .menu-card h3, .menu-card p').each(function () {

            const originalText = $(this).text();

            // Restore original text before highlighting
            $(this).text(originalText);

            if (!keyword || !keyword.trim()) {
                return;
            }

            // Escape special regular expression characters
            const escapedKeyword = keyword.trim().replace(
                /[.*+?^${}()|[\]\\]/g,
                '\\$&'
            );

            const regex = new RegExp('(' + escapedKeyword + ')', 'gi');

            if (regex.test(originalText)) {

                const highlightedText = originalText.replace(
                    regex,
                    '<mark class="search-highlight">$1</mark>'
                );

                $(this).html(highlightedText);
            }

        });
    }


    // ==========================================
    // 4. SELECT AUTOCOMPLETE SUGGESTION
    // ==========================================

    function selectAutocompleteItem(item) {

        $input.val(item.name);

        $list.hide();

        activeIndex = -1;

        // Open the category containing the selected dish
        showCategory(item.target);

        const target = $('#' + item.target);

        if (target.length) {

            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 400);

        }

        highlightSearchTerm(item.name);
        applyMenuSearch(item.name);
    }


    // ==========================================
    // 5. KEYBOARD NAVIGATION
    // ==========================================

    function updateActiveItem() {

        const $items = $list.find('.autocomplete-item');

        $items
            .removeClass('active bg-light')
            .attr('aria-selected', 'false');

        if (activeIndex >= 0 && activeIndex < $items.length) {

            $items.eq(activeIndex)
                .addClass('active bg-light')
                .attr('aria-selected', 'true');

        }
    }


    // ==========================================
    // 6. SEARCH INPUT
    // ==========================================

    $input.on('input', function () {

        const query = $(this).val().toLowerCase().trim();

        $list.empty();

        activeIndex = -1;

        highlightSearchTerm(query);
        applyMenuSearch(query);

        if (query.length === 0) {

            currentMatches = [];

            $list.hide();

            return;
        }

        // Find matching dishes
        currentMatches = searchableDishes.filter(function (item) {

            return item.name.toLowerCase().includes(query);

        });

        if (currentMatches.length === 0) {

            $list.hide();

            return;
        }

        // Create autocomplete suggestions
        currentMatches.forEach(function (item, index) {

            const $option = $('<div>', {

                class: 'autocomplete-item',
                role: 'option',
                'aria-selected': 'false',
                'data-index': index

            });

            $('<strong>')
                .text(item.name)
                .appendTo($option);

            $('<span>', {

                class: 'text-muted small'

            })
                .text(' (' + item.category + ')')
                .appendTo($option);

            // Select suggestion when clicked
            $option.on('click', function () {

                selectAutocompleteItem(item);

            });

            $list.append($option);

        });

        $list.show();

    });

    // Search button
    $searchButton.on('click', function () {

        applyMenuSearch($input.val());

        $list.hide();

    });


    // ==========================================
    // 7. KEYBOARD EVENTS
    // ==========================================

    $input.on('keydown', function (e) {

        const $items = $list.find('.autocomplete-item');

        // Close suggestions with Escape
        if (e.key === 'Escape') {

            $list.hide();

            activeIndex = -1;

            return;
        }

        if (!$list.is(':visible') || !$items.length) {
            return;
        }

        // Move down through suggestions
        if (e.key === 'ArrowDown') {

            e.preventDefault();

            activeIndex = (activeIndex + 1) % $items.length;

            updateActiveItem();

        }

        // Move up through suggestions
        else if (e.key === 'ArrowUp') {

            e.preventDefault();

            activeIndex = (activeIndex - 1 + $items.length) % $items.length;

            updateActiveItem();

        }

        // Select suggestion with Enter
        else if (e.key === 'Enter' && activeIndex >= 0) {

            e.preventDefault();

            selectAutocompleteItem(currentMatches[activeIndex]);

        }

        else if (e.key === 'Enter') {

            applyMenuSearch($input.val());

            $list.hide();

        }

    });


    // ==========================================
    // 8. CLOSE AUTOCOMPLETE WHEN CLICKING OUTSIDE
    // ==========================================

    $(document).on('click', function (e) {

        if (!$(e.target).closest('.search-section').length) {

            $list.hide();

            activeIndex = -1;

        }

    });


    // ==========================================
    // MENU SEARCH FILTERING
    // ==========================================

    function applyMenuSearch(query) {

        const keyword = query.toLowerCase().trim();

        let visibleCount = 0;

        categories.forEach(function (category) {

            const section = $('#' + category);

            // Check whether this category should be visible
            const categoryAllowed =
                activeCategory === 'all' ||
                activeCategory === category;

            if (!categoryAllowed) {
                section.hide();
                return;
            }

            section.show();

            // Find all dishes inside the category
            const items = category === 'featured'
                ? section.find('.menu-card')
                : section.find('.menu-item');

            items.each(function () {

                const itemText = $(this).text().toLowerCase();

                const matches = itemText.includes(keyword);

                $(this).toggle(matches);

                if (matches) {
                    visibleCount++;
                }

            });

            // Hide category if it has no matching dishes
            if (items.length > 0) {

                const hasVisibleItems = items.filter(':visible').length > 0;

                section.toggle(hasVisibleItems);

            }

        });

        // Display message if nothing was found
        $noResults.prop('hidden', !keyword || visibleCount > 0);

        // Highlight matching text
        highlightSearchTerm(keyword);
    }


});