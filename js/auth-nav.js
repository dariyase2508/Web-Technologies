document.addEventListener("DOMContentLoaded", function () {

    let currentUser = null;
    try {
        currentUser = JSON.parse(localStorage.getItem("leAudaciCurrentUser"));
    } catch (e) {
        localStorage.removeItem("leAudaciCurrentUser");   // повреждённые данные
    }

    const greeting = document.getElementById("greeting");
    if (greeting && currentUser) {
        greeting.textContent = "Welcome back, " + currentUser.name + "!";
    }

    const authMenu = document.getElementById("auth-menu-items");
    if (!authMenu) return;

    if (currentUser) {

        authMenu.innerHTML = `
            <li>
                <a class="dropdown-item" href="profile.html">
                    <i class="bi bi-person me-2"></i> My Profile
                </a>
            </li>

            <li><hr class="dropdown-divider"></li>

            <li>
                <a class="dropdown-item" href="#" id="nav-logout">
                    <i class="bi bi-box-arrow-right me-2"></i> Logout
                </a>
            </li>
        `;

        document.getElementById("nav-logout")
            .addEventListener("click", function (event) {

                event.preventDefault();

                localStorage.removeItem("leAudaciCurrentUser");

                window.location.href = "index.html";

            });

    } else {

        authMenu.innerHTML = `
            <li>
                <a class="dropdown-item" href="register.html">
                    <i class="bi bi-person-plus me-2"></i> Register
                </a>
            </li>

            <li>
                <a class="dropdown-item" href="login.html">
                    <i class="bi bi-box-arrow-in-right me-2"></i> Login
                </a>
            </li>
        `;

    }

});

