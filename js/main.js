document.addEventListener("DOMContentLoaded", function () {

    
const navLinks = Array.from(document.querySelectorAll(".main-nav a"));

document.addEventListener("keydown", function (event) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

    const modal = document.getElementById("newsletterModal");
    const isModalOpen = modal && (
        modal.classList.contains("active") ||
        modal.getAttribute("aria-hidden") === "false"
    );
    if (isModalOpen || event.target.matches("input, textarea, select") || navLinks.length === 0) return;

    let i = navLinks.indexOf(document.activeElement);   // -1, если фокус не в меню
    i = event.key === "ArrowRight"
        ? (i + 1) % navLinks.length
        : (i <= 0 ? navLinks.length - 1 : i - 1);

    event.preventDefault();
    navLinks[i].focus();
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