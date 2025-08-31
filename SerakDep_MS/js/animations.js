// animations.js - Control de animaciones para SerakDep MS

document.addEventListener("DOMContentLoaded", function () {
  initParticles();
  initAnimations();
  initScrollAnimations();
  initTypingEffect();
  initRevealOnScroll(); // Ahora se llama directamente
  initParallaxEffect(); // Ahora se llama directamente
});

// Configuración de partículas
function initParticles() {
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#ffffff",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1,
            },
          },
          push: {
            particles_nb: 4,
          },
        },
      },
      retina_detect: true,
    });
  }
}

// Inicializar animaciones GSAP
function initAnimations() {
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".hero-title", {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.to(".hero-description", {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay: 0.3,
      ease: "power3.out",
    });

    gsap.to(".hero-buttons", {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay: 0.6,
      ease: "power3.out",
    });
  }
}

// Animaciones basadas en scroll
function initScrollAnimations() {
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.utils.toArray(".service-card").forEach((card) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    gsap.utils.toArray(".project-card").forEach((card) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    gsap.to(".about-content", {
      opacity: 1,
      x: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".about",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    gsap.to(".about-image", {
      opacity: 1,
      x: 0,
      duration: 1,
      delay: 0.3,
      scrollTrigger: {
        trigger: ".about",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    ScrollTrigger.create({
      trigger: ".stats-container",
      start: "top 80%",
      onEnter: () => initStatsCounter(),
      once: true,
    });
  }
}

// Efecto de escritura para el título principal
function initTypingEffect() {
  const heroTitle = document.querySelector(".hero-title");
  if (!heroTitle) return;

  const originalText = heroTitle.textContent;
  heroTitle.textContent = "";

  let i = 0;
  const typingInterval = setInterval(() => {
    if (i < originalText.length) {
      heroTitle.textContent += originalText.charAt(i);
      i++;
    } else {
      clearInterval(typingInterval);
    }
  }, 50);
}

// Efecto parallax para elementos de fondo
function initParallaxEffect() {
  window.addEventListener("scroll", function () {
    const scrollPosition = window.pageYOffset;

    document.querySelectorAll("[data-parallax]").forEach((element) => {
      const speed = parseFloat(element.getAttribute("data-parallax"));
      element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
  });
}

// Efecto de revelación gradual de elementos
function initRevealOnScroll() {
  const revealElements = document.querySelectorAll(
    ".service-card, .project-card, .stat"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

// Inicializar animaciones al cargar la página
window.addEventListener("load", function () {
  initRevealOnScroll();
  initParallaxEffect();
});

// Eliminadas las líneas de export que causaban el error
