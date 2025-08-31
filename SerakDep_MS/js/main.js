// main.js - Funcionalidad principal para SerakDep MS

document.addEventListener("DOMContentLoaded", function () {
  initLoader();
  initNavbar();
  initMobileMenu();
  initCurrentYear();
  initScrollToTop();
  initStatsCounter();
});

// Loader
function initLoader() {
  const loader = document.querySelector(".loader");

  window.addEventListener("load", function () {
    setTimeout(function () {
      loader.style.opacity = "0";
      setTimeout(function () {
        loader.style.display = "none";
      }, 500);
    }, 1000);
  });
}

// Navegación fija con cambio de estilo al hacer scroll
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(30, 58, 138, 0.95)";
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
      navbar.style.padding = "0.7rem 0";
    } else {
      navbar.style.background = "rgba(30, 58, 138, 0.95)";
      navbar.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05)";
      navbar.style.padding = "1rem 0";
    }

    if (window.scrollY > lastScrollY && window.scrollY > 200) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScrollY = window.scrollY;
  });
}

// Menú móvil - ACTUALIZADO
function initMobileMenu() {
  const toggleButton = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (toggleButton && navMenu) {
    toggleButton.addEventListener("click", function (e) {
      e.stopPropagation();
      navMenu.classList.toggle("active");
      toggleButton.classList.toggle("active");

      // Prevenir el scroll del body cuando el menú está abierto
      if (navMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    // Cerrar menú al hacer clic en enlaces
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        toggleButton.classList.remove("active");
        document.body.style.overflow = "";
      });
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener("click", function (e) {
      if (
        navMenu.classList.contains("active") &&
        !navMenu.contains(e.target) &&
        !toggleButton.contains(e.target)
      ) {
        navMenu.classList.remove("active");
        toggleButton.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    // Prevenir que el clic dentro del menú se propague
    navMenu.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }
}

// Actualizar año actual en el footer
function initCurrentYear() {
  const yearElement = document.querySelector(".footer-bottom p");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace("2023", currentYear);
  }
}

// Botón de scroll to top
function initScrollToTop() {
  const scrollButton = document.createElement("button");
  scrollButton.innerHTML = "↑";
  scrollButton.classList.add("scroll-to-top");
  scrollButton.setAttribute("aria-label", "Volver arriba");
  document.body.appendChild(scrollButton);

  scrollButton.style.position = "fixed";
  scrollButton.style.bottom = "30px";
  scrollButton.style.right = "30px";
  scrollButton.style.width = "50px";
  scrollButton.style.height = "50px";
  scrollButton.style.borderRadius = "50%";
  scrollButton.style.background = "linear-gradient(135deg, #2563eb, #10b981)";
  scrollButton.style.color = "white";
  scrollButton.style.border = "none";
  scrollButton.style.cursor = "pointer";
  scrollButton.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
  scrollButton.style.opacity = "0";
  scrollButton.style.visibility = "hidden";
  scrollButton.style.transition = "all 0.3s ease";
  scrollButton.style.zIndex = "1000";
  scrollButton.style.fontSize = "1.2rem";
  scrollButton.style.fontWeight = "bold";

  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      scrollButton.style.opacity = "1";
      scrollButton.style.visibility = "visible";
    } else {
      scrollButton.style.opacity = "0";
      scrollButton.style.visibility = "hidden";
    }
  });

  scrollButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Función para el contador de estadísticas
function initStatsCounter() {
  const counters = document.querySelectorAll(".stat-number");
  const speed = 200;

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-count");
    const count = +counter.innerText;
    const increment = Math.ceil(target / speed);

    if (count < target) {
      counter.innerText = Math.min(count + increment, target);
      setTimeout(() => initStatsCounter(), 1);
    }
  });
}
