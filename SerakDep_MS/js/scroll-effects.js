// scroll-effects.js - Efectos de scroll para SerakDep MS

document.addEventListener("DOMContentLoaded", function () {
  initSmoothScroll();
  initActiveSection();
  initScrollProgress();
  initParallaxSections();
  initScrollReveal(); // Ahora se llama directamente
  initLayeredParallax(); // Ahora se llama directamente
});

// Scroll suave para enlaces internos
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Cambiar clase activa en navegación según sección visible
function initActiveSection() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const headerHeight = document.querySelector(".navbar").offsetHeight;

      if (window.scrollY >= sectionTop - headerHeight - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// Barra de progreso de scroll
function initScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.classList.add("scroll-progress");
  document.body.appendChild(progressBar);

  progressBar.style.position = "fixed";
  progressBar.style.top = "0";
  progressBar.style.left = "0";
  progressBar.style.height = "4px";
  progressBar.style.background = "linear-gradient(90deg, #2563eb, #10b981)";
  progressBar.style.width = "0%";
  progressBar.style.zIndex = "9999";
  progressBar.style.transition = "width 0.2s ease";

  window.addEventListener("scroll", function () {
    const windowHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
  });
}

// Efecto parallax para secciones
function initParallaxSections() {
  const parallaxSections = document.querySelectorAll(".hero");

  parallaxSections.forEach((section) => {
    window.addEventListener("scroll", function () {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      section.style.transform = `translateY(${rate}px)`;
    });
  });
}

// Efecto de aparición de elementos al hacer scroll
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    ".service-card, .project-card, .stat, .contact-item"
  );

  const elementIsInView = (el, scrollOffset = 0) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) -
        scrollOffset
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add("scrolled");
  };

  const hideScrollElement = (element) => {
    element.classList.remove("scrolled");
  };

  const handleScrollAnimation = () => {
    revealElements.forEach((el) => {
      if (elementIsInView(el, 100)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  };

  window.addEventListener("scroll", () => {
    handleScrollAnimation();
  });

  handleScrollAnimation();
}

// Efecto de profundidad con scroll (parallax para múltiples capas)
function initLayeredParallax() {
  const layeredElements = document.querySelectorAll("[data-depth]");

  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;

    layeredElements.forEach((element) => {
      const depth = element.getAttribute("data-depth");
      const movement = -(scrolled * depth);
      const transform = `translateY(${movement}px)`;

      element.style.transform = transform;
    });
  });
}

// Inicializar efectos de scroll
window.addEventListener("load", function () {
  initScrollReveal();
  initLayeredParallax();
});
