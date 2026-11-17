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
            recipeLink.href = meal.strSource || meal.strYoutube || "#";
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


    searchRecipes("pasta");

});
