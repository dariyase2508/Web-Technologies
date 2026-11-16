(document).ready(function() {
    // ==========================================
    // 1. ДАННЫЕ И ФИЛЬТРАЦИЯ КАРТОЧЕК МЕНЮ
    // ==========================================
    const featuredMenuItems = [
        {
            name: "Spaghetti Carbonara",
    $        category: "pasta",
            price: 14,
            description: "Classic Roman pasta prepared with egg yolks, Pecorino Romano, black pepper, and crispy guanciale.",
            image: "images/carbonara.jpg", // <-- Проверь названия этих 4 файлов в папке images/
            badge: "Chef's Choice",
            featured: true
        },
       {
            name: "Margherita Pizza",
            category: "pizza",
            price: 15,
            description: "Traditional Neapolitan wood-fired pizza with San Marzano crushed tomatoes, fresh mozzarella, and basil.",
            image: "images/pizza.jpg", // исправлено с margherita.jpg
            badge: "Traditional",
            featured: true
        },
        {
            name: "Tagliatelle al Ragù",
            category: "pasta",
            price: 16,
            description: "Handmade egg tagliatelle served with slow-cooked Bolognese beef and veal ragù.",
            image: "images/pasta.jpg", // исправлено с tagliatelle.jpg
            badge: "House Special",
            featured: true
        },
        {
            name: "Tiramisu",
            category: "dolce",
            price: 9,
            description: "Classic Italian dessert made of savoiardi dipped in coffee, layered with whipped mixture of egg yolks and mascarpone.",
            image: "images/tiramisu.jpg",
            badge: "Dessert",
            featured: true
        }
    ];

    const container = document.getElementById('menu-container');
    const categoryLinks = document.querySelectorAll('.category-link');

    function renderMenu(items) {
        if (!container) return;

        if (items.length === 0) {
            container.innerHTML = '<p class="text-center text-muted">No dishes found in this category.</p>';
            return;
        }

        container.innerHTML = items.map(item => `
            <div class="col-12 col-md-6 col-lg-4">
                <article class="card h-100 glass-card border-0 shadow-sm">
                    <img src="${item.image}" class="card-img-top" style="height: 200px; object-fit: cover;" alt="${item.name}">
                    <div class="card-body d-flex flex-column p-4">
                        <span class="badge bg-danger mb-2 w-auto align-self-start">${item.badge}</span>
                        <h3 class="card-title h5 mb-2">${item.name}</h3>
                        <p class="card-text text-muted mb-3">${item.description}</p>
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <span class="h5 mb-0 text-danger fw-bold">$${item.price}</span>
                            <button type="button" class="btn btn-outline-danger btn-sm px-3">Order Now</button>
                        </div>
                    </div>
                </article>
            </div>
        `).join('');
    }

    function filterByCategory(categoryName) {
        let filteredItems = [];

        switch (categoryName) {
            case 'featured':
                filteredItems = featuredMenuItems.filter(item => item.featured);
                break;
            case 'antipasti':
                filteredItems = featuredMenuItems.filter(item => item.category === 'antipasti');
                break;
            case 'pasta':
                filteredItems = featuredMenuItems.filter(item => item.category === 'pasta');
                break;
            case 'pizza':
                filteredItems = featuredMenuItems.filter(item => item.category === 'pizza');
                break;
            case 'dolce':
                filteredItems = featuredMenuItems.filter(item => item.category === 'dolce');
                break;
            default:
                filteredItems = featuredMenuItems;
        }

        renderMenu(filteredItems);
    }

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const selectedCategory = link.getAttribute('data-category');
            filterByCategory(selectedCategory);
        });
    });

    filterByCategory('featured');

    // ==========================================
    // 2. ПОИСК, ПОДСВЕТКА И АВТОКОМПЛИТ С КЛАВИАТУРОЙ
    // ==========================================
    const $input = $('#searchInput');
    const $list = $('#autocomplete-list');
    $list.attr('role', 'listbox');

    const searchableDishes = [
        { name: "Bruschetta al Pomodoro", category: "Antipasti", target: "#antipasti" },
        { name: "Caprese Salad", category: "Antipasti", target: "#antipasti" },
        { name: "Arancini Siciliani", category: "Antipasti", target: "#antipasti" },
        { name: "Spaghetti Carbonara", category: "Pasta", target: "#pasta" },
        { name: "Tagliatelle al Ragù Bolognese", category: "Pasta", target: "#pasta" },
        { name: "Penne all'Arrabbiata", category: "Pasta", target: "#pasta" },
        { name: "Pizza Margherita", category: "Pizza", target: "#pizza" },
        { name: "Quattro Formaggi", category: "Pizza", target: "#pizza" },
        { name: "Prosciutto e Funghi", category: "Pizza", target: "#pizza" },
        { name: "Classic Tiramisù", category: "Dolce", target: "#dolce" },
        { name: "Vanilla Panna Cotta", category: "Dolce", target: "#dolce" },
        { name: "Sicilian Cannoli", category: "Dolce", target: "#dolce" }
    ];

    let currentMatches = [];
    let activeIndex = -1;

    function highlightSearchTerm(keyword) {
        $('.menu-item h3, .menu-item p').each(function() {
            const $this = $(this);
            $this.html($this.text());
        });

        if (!keyword || keyword.trim() === '') return;

        const escapedKeyword = keyword.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp('(' + escapedKeyword + ')', 'gi');

        $('.menu-item h3, .menu-item p').each(function() {
            const $element = $(this);
            const originalText = $element.text();

            if (regex.test(originalText)) {
                const newHtml = originalText.replace(regex, '<mark class="search-highlight">$1</mark>');
                $element.html(newHtml);
            }
        });
    }

    function selectAutocompleteItem(item) {
        $input.val(item.name);
        $list.hide();
        activeIndex = -1;
        highlightSearchTerm(item.name);

        const $target = $(item.target);
        if ($target.length) {
            $('html, body').animate({
                scrollTop: $target.offset().top - 80
            }, 500);
        }
    }

    function updateActiveItem($items) {
        $items.removeClass('active bg-light').attr('aria-selected', 'false');
        if (activeIndex >= 0 && activeIndex < $items.length) {
            $items.eq(activeIndex).addClass('active bg-light').attr('aria-selected', 'true');
        }
    }

    // Единый обработчик input (ловит ввод с клавиатуры, вставку мышью и очистку)
    $input.on('input', function() {
        const rawValue = $(this).val();
        const query = rawValue.toLowerCase().trim();

        highlightSearchTerm(rawValue);
        $list.empty();
        activeIndex = -1;

        if (query.length === 0) {
            currentMatches = [];
            $list.hide();
            return;
        }

        currentMatches = searchableDishes.filter(item => item.name.toLowerCase().includes(query));

        if (currentMatches.length > 0) {
            currentMatches.forEach((item, index) => {
                const $div = $(`<div class="autocomplete-item" role="option" aria-selected="false" data-index="${index}"><strong>${item.name}</strong> <span class="text-muted small">(${item.category})</span></div>`);

                $div.on('click', function() {
                    selectAutocompleteItem(item);
                });

                $list.append($div);
            });
            $list.show();
        } else {
            $list.hide();
        }
    });

    // Навигация по подсказкам с клавиатуры (Стрелки Вверх/Вниз, Enter, Escape)
    $input.on('keydown', function(e) {
        const $items = $list.find('.autocomplete-item');

        if (e.key === 'Escape') {
            $list.hide();
            activeIndex = -1;
            return;
        }

        if (!$list.is(':visible') || $items.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            activeIndex = (activeIndex + 1) % $items.length;
            updateActiveItem($items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            activeIndex = (activeIndex - 1 + $items.length) % $items.length;
            updateActiveItem($items);
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            e.preventDefault();
            selectAutocompleteItem(currentMatches[activeIndex]);
        }
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('.search-section').length) {
            $list.hide();
            activeIndex = -1;
        }
    });
});