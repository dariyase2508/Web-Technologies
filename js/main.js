document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".main-nav a");
    let currentIndex = -1;

    document.addEventListener("keydown", function (event) {
        if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(event.key)) {
            return;
        }

        if (event.target.matches("input, textarea, select")) {
            return;
        }

        if (navLinks.length === 0) {
            return;
        }

        const focusedIndex = Array.from(navLinks).indexOf(document.activeElement);

        if (focusedIndex !== -1) {
            currentIndex = focusedIndex;
        }

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            currentIndex = (currentIndex + 1) % navLinks.length;
        } else {
            currentIndex = currentIndex <= 0
                ? navLinks.length - 1
                : currentIndex - 1;
        }

        event.preventDefault();
        navLinks[currentIndex].focus();
    });

    const greeting = document.getElementById("greeting");

    if (greeting) {
        const hour = new Date().getHours();
        let message;

        switch (true) {
            case hour >= 5 && hour < 12:
                message = "Good Morning!";
                break;
            case hour >= 12 && hour < 18:
                message = "Good Afternoon!";
                break;
            default:
                message = "Good Evening!";
        }

        greeting.textContent = message;
    }
});
