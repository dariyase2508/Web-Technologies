document.addEventListener('DOMContentLoaded', () => {
    // 1. Полный массив объектов меню
    const menuItems = [
        {
            name: "Spaghetti Carbonara",
            category: "pasta",
            price: 14,
            description: "Classic Roman pasta prepared with egg yolks, Pecorino Romano, black pepper, and crispy guanciale.",
            image: "images/carbonara.jpg",
            badge: "Chef's Choice",
            featured: true
        },
        {
            name: "Margherita Pizza",
            category: "pizza",
            price: 15,
            description: "Traditional Neapolitan wood-fired pizza with San Marzano crushed tomatoes, fresh mozzarella, and basil.",
            image: "images/margherita.jpg",
            badge: "Traditional",
            featured: true
        },
        {
            name: "Tagliatelle al Ragù",
            category: "pasta",
            price: 16,
            description: "Handmade egg tagliatelle served with slow-cooked Bolognese beef and veal ragù.",
            image: "images/tagliatelle.jpg",
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

    // Функция рендеринга карточек
    function renderMenu(items) {
        if (!container) return;
        container.innerHTML = '';

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
                            <button class="btn btn-outline-danger btn-sm px-3">Order Now</button>
                        </div>
                    </div>
                </article>
            </div>
        `).join('');
    }

    // 2. Функция фильтрации с использованием конструкции switch
    function filterByCategory(categoryName) {
        let filteredItems = [];

        switch (categoryName) {
            case 'featured':
                filteredItems = menuItems.filter(item => item.featured);
                break;
            case 'antipasti':
                filteredItems = menuItems.filter(item => item.category === 'antipasti');
                break;
            case 'pasta':
                filteredItems = menuItems.filter(item => item.category === 'pasta');
                break;
            case 'pizza':
                filteredItems = menuItems.filter(item => item.category === 'pizza');
                break;
            case 'dolce':
                filteredItems = menuItems.filter(item => item.category === 'dolce');
                break;
            default:
                filteredItems = menuItems; // Если категория не найдена, выводим все
        }

        renderMenu(filteredItems);
    }

    // 3. Установка слушателей событий на кнопки категорий (без inline скриптов)
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Управление классом active для подсветки активной категории
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Получаем категорию из дата-атрибута и вызываем фильтрацию
            const selectedCategory = link.getAttribute('data-category');
            filterByCategory(selectedCategory);
        });
    });

    // Инициализация при загрузке страницы (показываем Featured)
    filterByCategory('featured');
});
$(document).ready(function() {
    const $input = $('#searchInput');
    const $list = $('#autocomplete-list');

    
    const menuItems = [
        // Starters / Antipasti
        { name: "Bruschetta al Pomodoro", category: "Antipasti", target: "#antipasti" },
        { name: "Caprese Salad", category: "Antipasti", target: "#antipasti" },
        { name: "Arancini Siciliani", category: "Antipasti", target: "#antipasti" },
        
        // Primi Piatti / Pasta
        { name: "Spaghetti Carbonara", category: "Pasta", target: "#pasta" },
        { name: "Tagliatelle al Ragù Bolognese", category: "Pasta", target: "#pasta" },
        { name: "Penne all'Arrabbiata", category: "Pasta", target: "#pasta" },
        
        // Wood-Fired Pizza
        { name: "Pizza Margherita", category: "Pizza", target: "#pizza" },
        { name: "Quattro Formaggi", category: "Pizza", target: "#pizza" },
        { name: "Prosciutto e Funghi", category: "Pizza", target: "#pizza" },
        
        // Desserts / Dolce
        { name: "Classic Tiramisù", category: "Dolce", target: "#dolce" },
        { name: "Vanilla Panna Cotta", category: "Dolce", target: "#dolce" },
        { name: "Sicilian Cannoli", category: "Dolce", target: "#dolce" }
    ];

    $input.on('keyup', function() {
        const query = $(this).val().toLowerCase().trim();
        $list.empty();

        if (query.length === 0) {
            $list.hide(); 
            return;
        }

        
        const matches = menuItems.filter(item => item.name.toLowerCase().includes(query));

        if (matches.length > 0) {
            matches.forEach(item => {
                $div = $(`<div class="autocomplete-item"><strong>${item.name}</strong> <span class="text-muted small">(${item.category})</span></div>`);
                
               
                $div.on('click', function() {
                    $input.val(item.name);
                    $list.hide();
                    // Плавный скролл к нужной секции меню
                    $('html, body').animate({
                        scrollTop: $(item.target).offset().top - 80
                    }, 500);
                });

                $list.append($div);
            });
            $list.show(); 
        } else {
            $list.hide();
        }
    });

    
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.search-section').length) {
            $list.hide();
        }
    });
});

$(document).ready(function() {
    const $input = $('#searchInput');

    
    function highlightSearchTerm(keyword) {
        
        $('.menu-item h3, .menu-item p').each(function() {
            var $this = $(this);
         
            $this.html($this.text());
        });

        if (!keyword || keyword.trim() === '') return;
        
        var escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        var regex = new RegExp('(' + escapedKeyword + ')', 'gi');

        $('.menu-item h3, .menu-item p').each(function() {
            var $element = $(this);
            var originalText = $element.text();

            if (regex.test(originalText)) {
               
                var newHtml = originalText.replace(regex, '<mark class="search-highlight">$1</mark>');
                $element.html(newHtml);
            }
        });
    }
    $input.on('keyup', function() {
        var keyword = $(this).val();
        highlightSearchTerm(keyword);
    });
});