document.addEventListener("DOMContentLoaded", function () {

    const buttons = document.querySelectorAll(".read-more-btn");
    let audioContext = null;

    function playSound() {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;

        if (!audioContext) {
            audioContext = new AudioCtx();
        }

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.type = "sine";
        oscillator.frequency.value = 660;

        gain.gain.setValueAtTime(0.08, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + 0.15
        );

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.15);
    }

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {

            const recipe = button.closest(".recipe");
            if (!recipe) return;

            const moreText = recipe.querySelector(".more-text");
            if (!moreText) return;

            const isHidden =
                window.getComputedStyle(moreText).display === "none";

            moreText.style.display = isHidden ? "block" : "none";
            button.textContent = isHidden ? "Read Less" : "Read More";

            playSound();
        });
    });



    const searchInput = document.getElementById("recipeSearch");
    const searchButton = document.getElementById("recipeSearchBtn");
    const resultsContainer = document.getElementById("recipeResults");
    const loadingElement = document.getElementById("recipeLoading");
    const errorElement = document.getElementById("recipeError");

    // Stop if API section does not exist
    if (!searchInput || !searchButton || !resultsContainer) {
        return;
    }

    const API_URL = "https://www.themealdb.com/api/json/v1/1";

    // ==========================================
    // SAVED RECIPES + LAST SEARCH (localStorage)
    // ==========================================

    const SAVED_KEY = "leAudaciSavedRecipes";
    const LAST_QUERY_KEY = "leAudaciRecipeQuery";

    const savedSection = document.getElementById("savedRecipesSection");
    const savedContainer = document.getElementById("savedRecipes");

    function readSavedRecipes() {
        try {
            const list = JSON.parse(localStorage.getItem(SAVED_KEY));
            return Array.isArray(list) ? list : [];
        } catch (error) {
            return [];
        }
    }

    function writeSavedRecipes(list) {
        try {
            localStorage.setItem(SAVED_KEY, JSON.stringify(list));
        } catch (error) {
            console.error("Could not save recipes:", error);
        }
    }

    function isRecipeSaved(id) {
        return readSavedRecipes().some(function (item) {
            return item.id === id;
        });
    }

    // Only http(s) links are allowed; otherwise fall back to the TheMealDB page
    function safeRecipeUrl(url, id) {
        return /^https?:\/\//i.test(url || "")
            ? url
            : "https://www.themealdb.com/meal/" + id;
    }

    // Add the recipe to the saved list, or remove it if it is already there
    function toggleSavedRecipe(meal) {
        const list = readSavedRecipes();
        const index = list.findIndex(function (item) {
            return item.id === meal.idMeal;
        });

        if (index >= 0) {
            list.splice(index, 1);
        } else {
            list.push({
                id: meal.idMeal,
                name: meal.strMeal,
                thumb: meal.strMealThumb,
                category: meal.strCategory || "Recipe",
                area: meal.strArea || "International",
                link: safeRecipeUrl(meal.strSource || meal.strYoutube, meal.idMeal)
            });
        }

        writeSavedRecipes(list);
    }

    // Update the look of one "Save" button
    function updateSaveButton(button) {
        const saved = isRecipeSaved(button.dataset.mealId);

        button.innerHTML = saved
            ? '<i class="bi bi-bookmark-fill me-1"></i>Saved'
            : '<i class="bi bi-bookmark me-1"></i>Save';
        button.setAttribute("aria-pressed", saved ? "true" : "false");
        button.classList.toggle("btn-danger", saved);
        button.classList.toggle("btn-outline-secondary", !saved);
    }

    function refreshSaveButtons() {
        resultsContainer.querySelectorAll("[data-meal-id]").forEach(updateSaveButton);
    }

    // Draw the "Saved recipes" list under the search results
    function renderSavedRecipes() {

        if (!savedSection || !savedContainer) return;

        const list = readSavedRecipes();

        savedContainer.innerHTML = "";
        savedSection.hidden = list.length === 0;

        list.forEach(function (item) {

            const col = document.createElement("div");
            col.className = "col-12 col-md-6 col-lg-4";

            const card = document.createElement("div");
            card.className = "glass-card h-100 p-3 d-flex gap-3 align-items-center";

            const image = document.createElement("img");
            image.src = item.thumb;
            image.alt = item.name;
            image.width = 72;
            image.height = 72;
            image.className = "rounded-3 flex-shrink-0";
            image.style.objectFit = "cover";
            image.onerror = function () {
                image.src = "images/placeholder.jpg";
            };

            const info = document.createElement("div");
            info.className = "flex-grow-1";

            const link = document.createElement("a");
            link.href = safeRecipeUrl(item.link, item.id);
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.className = "fw-semibold d-block";
            link.textContent = item.name;

            const meta = document.createElement("small");
            meta.className = "text-muted";
            meta.textContent = item.category + " \u2022 " + item.area;

            info.appendChild(link);
            info.appendChild(meta);

            const removeBtn = document.createElement("button");
            removeBtn.type = "button";
            removeBtn.className = "btn btn-outline-danger btn-sm";
            removeBtn.setAttribute("aria-label", "Remove " + item.name + " from saved recipes");
            removeBtn.innerHTML = '<i class="bi bi-trash"></i>';
            removeBtn.addEventListener("click", function () {
                writeSavedRecipes(readSavedRecipes().filter(function (saved) {
                    return saved.id !== item.id;
                }));
                renderSavedRecipes();
                refreshSaveButtons();
            });

            card.appendChild(image);
            card.appendChild(info);
            card.appendChild(removeBtn);
            col.appendChild(card);
            savedContainer.appendChild(col);
        });
    }

    function readLastQuery() {
        try {
            return localStorage.getItem(LAST_QUERY_KEY) || "";
        } catch (error) {
            return "";
        }
    }

    function writeLastQuery(query) {
        try {
            localStorage.setItem(LAST_QUERY_KEY, query);
        } catch (error) {
            // ignore: the search itself still works
        }
    }


    function showLoading() {
        loadingElement.hidden = false;
        errorElement.hidden = true;
        resultsContainer.innerHTML = "";
        searchButton.disabled = true;
    }

    function hideLoading() {
        loadingElement.hidden = true;
        searchButton.disabled = false;
    }

    function showError(message) {
        errorElement.textContent = message;
        errorElement.hidden = false;
    }


    async function searchRecipes(query) {

        if (!query.trim()) {
            showError("Please enter a recipe name.");
            resultsContainer.innerHTML = "";
            errorElement.hidden = false;
            return;
        }

        showLoading();

        try {

            const response = await fetch(
                `${API_URL}/search.php?s=${encodeURIComponent(query)}`
            );

            if (!response.ok) {
                throw new Error("Failed to connect to the recipe API.");
            }

            const data = await response.json();

            hideLoading();

            if (!data.meals) {
                showError("No recipes found. Try another search.");
                return;
            }

            errorElement.hidden = true;

            displayRecipes(data.meals);
            writeLastQuery(query.trim());

        } catch (error) {

            hideLoading();

            showError(
                "Something went wrong. Please check your internet connection and try again."
            );

            console.error("API Error:", error);
        }
    }



    function displayRecipes(meals) {

        resultsContainer.innerHTML = "";

        meals.forEach(function (meal) {

            const ingredients = [];

            for (let i = 1; i <= 20; i++) {

                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];

                if (ingredient && ingredient.trim()) {
                    ingredients.push(
                        `${measure ? measure.trim() : ""} ${ingredient.trim()}`
                    );
                }
            }

            const card = document.createElement("div");
            card.className = "col-12 col-md-6 col-lg-4";

            const image = document.createElement("img");
            image.src = meal.strMealThumb;
            image.alt = meal.strMeal;
            image.className = "img-fluid rounded-3 w-100";
            image.loading = "lazy";

            image.onerror = function () {
                image.alt = "Recipe image unavailable";
                image.src = "images/placeholder.jpg";
            };

            const title = document.createElement("h4");
            title.className = "mt-3";
            title.textContent = meal.strMeal;

            const category = document.createElement("p");
            category.className = "text-muted small";
            category.textContent =
                `${meal.strCategory || "Recipe"} • ${meal.strArea || "International"}`;

            const ingredientInfo = document.createElement("p");
            ingredientInfo.className = "small";
            ingredientInfo.textContent =
                "Ingredients: " + ingredients.slice(0, 5).join(", ");

            const details = document.createElement("details");
            details.className = "mt-2";

            const summary = document.createElement("summary");
            summary.className = "text-danger";
            summary.textContent = "View cooking instructions";

            const instructions = document.createElement("p");
            instructions.className = "small mt-2";
            instructions.textContent =
                meal.strInstructions || "Instructions unavailable.";

            details.appendChild(summary);
            details.appendChild(instructions);

            const recipeLink = document.createElement("a");
            recipeLink.href = safeRecipeUrl(meal.strSource || meal.strYoutube, meal.idMeal);
            recipeLink.target = "_blank";
            recipeLink.rel = "noopener noreferrer";
            recipeLink.className = "btn btn-outline-danger btn-sm mt-3";
            recipeLink.textContent = "Full Recipe";

            const content = document.createElement("div");
            content.className = "p-3";

            content.appendChild(title);
            content.appendChild(category);
            content.appendChild(ingredientInfo);
            content.appendChild(details);
            content.appendChild(recipeLink);

            // "Save" button: keeps the recipe in localStorage
            const saveBtn = document.createElement("button");
            saveBtn.type = "button";
            saveBtn.className = "btn btn-sm mt-3 ms-2";
            saveBtn.dataset.mealId = meal.idMeal;
            updateSaveButton(saveBtn);
            saveBtn.addEventListener("click", function () {
                toggleSavedRecipe(meal);
                updateSaveButton(saveBtn);
                renderSavedRecipes();
            });
            content.appendChild(saveBtn);

            const cardBody = document.createElement("div");
            cardBody.className = "glass-card h-100 overflow-hidden";

            cardBody.appendChild(image);
            cardBody.appendChild(content);

            card.appendChild(cardBody);

            resultsContainer.appendChild(card);
        });
    }



    searchButton.addEventListener("click", function () {
        searchRecipes(searchInput.value);
    });

    searchInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            searchRecipes(searchInput.value);
        }

    });


    const startQuery = readLastQuery() || "pasta";
    searchInput.value = startQuery;
    searchRecipes(startQuery);
    renderSavedRecipes();

});
