document.addEventListener("DOMContentLoaded", function () {

    
const navLinks = document.querySelectorAll(".main-nav a");
let currentIndex = 0;

document.addEventListener("keydown", function (event) {

    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
        return;
    }

    const modal = document.getElementById("newsletterModal");

    const isModalOpen = modal && (
        modal.classList.contains("active") ||
        modal.getAttribute("aria-hidden") === "false"
    );

    // Do not interfere with typing or an open modal
    if (
        isModalOpen ||
        event.target.matches("input, textarea, select") ||
        navLinks.length === 0
    ) {
        return;
    }

    if (event.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % navLinks.length;
    } else {
        currentIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
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