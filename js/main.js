document.addEventListener("DOMContentLoaded", function () {

    const navLinks = document.querySelectorAll(".main-nav a");
    let currentIndex = -1;

    document.addEventListener("keydown", function (event) {
        if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(event.key)) {
            return;
        }


        const modal = document.getElementById("newsletterModal");
        const isModalOpen = modal && (modal.classList.contains("active") || modal.getAttribute("aria-hidden") === "false");
        if (isModalOpen || event.target.matches("input, textarea, select")) {
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

    // Opening hours badge (Mon-Sun 12:00-23:30, Rome time)
    const openBadge = document.getElementById("openStatusBadge");
    if (openBadge) {
        const parts = new Intl.DateTimeFormat("en-GB", {
            timeZone: "Europe/Rome", hour: "2-digit", minute: "2-digit", hour12: false
        }).formatToParts(new Date());
        const h = Number(parts.find(p => p.type === "hour").value) % 24;
        const min = Number(parts.find(p => p.type === "minute").value);
        const minutes = h * 60 + min;
        const isOpen = minutes >= 12 * 60 && minutes < 23 * 60 + 30;
        openBadge.textContent = isOpen ? "OPEN NOW" : "CLOSED";
        openBadge.className = isOpen
            ? "badge bg-success-subtle text-success border border-success-subtle rounded-pill small px-2"
            : "badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill small px-2";
    }
});

if (window.jQuery) {
    $(document).ready(function () {
        console.log("jQuery is ready!");
    });
}