
document.addEventListener("DOMContentLoaded", function () {

    // Get logged-in user
    const currentUser = JSON.parse(
        localStorage.getItem("leAudaciCurrentUser")
    );

    // If nobody is logged in, return to login page
    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    // Display user information
    document.getElementById("profile-name").textContent =
        "Welcome, " + currentUser.name + "!";

    document.getElementById("profile-fullname").textContent =
        currentUser.name;

    document.getElementById("profile-email").textContent =
        currentUser.email;

    document.getElementById("profile-phone").textContent =
        currentUser.phone;

    // Log out
    document.getElementById("logout-btn").addEventListener("click", function () {

        localStorage.removeItem("leAudaciCurrentUser");

        window.location.href = "login.html";

    });

});
