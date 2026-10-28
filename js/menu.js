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