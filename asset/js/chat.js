const chat = document.querySelector(".chat");

// Fonction pour démarrer l'animation lorsque l'utilisateur fait défiler la page
let scrollTimeout;
window.addEventListener("scroll", () => {
  chat.style.animation = "marche 0.3s steps(7) infinite"; // Démarre l'animation de marche

  // Si l'utilisateur arrête de faire défiler, on change l'image après 500 ms
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    chat.style.animation = "assis 0.2s steps(3) forwards"; // Démarre l'animation assise
  }, 500);
});

const waves = document.querySelectorAll("#mes-sites svg path");

waves.forEach((wave, index) => {
  gsap.to(wave, {
    y: 10,
    duration: 1 + index * 0.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
});

const modals = document.querySelectorAll(".myModal");
const btns = document.querySelectorAll(".openModal");
const closes = document.querySelectorAll(".close");

// Fonction pour ouvrir le modal avec animation GSAP sur SVG et UL
btns.forEach((btn, index) => {
  btn.addEventListener("click", function (event) {
    event.preventDefault();
    const modal = modals[index];

    // Afficher le modal
    modal.style.display = "flex";

    // Sélection des éléments à animer
    const svg = modal.querySelector("svg");
    const ul = modal.querySelector(".social ul");

    // Reset des animations
    gsap.set([svg, ul], { opacity: 0, y: 20 });

    // Animation GSAP (SVG et UL)
    gsap.to(svg, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.2,
    });
    gsap.to(ul, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.4,
    });
  });
});

// Fonction pour fermer le modal
closes.forEach((close, index) => {
  close.addEventListener("click", function () {
    const modal = close.closest(".myModal");

    // Animation de fermeture sur SVG et UL uniquement
    const svg = modal.querySelector("svg");
    const ul = modal.querySelector(".social ul");

    gsap.to([svg, ul], {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => (modal.style.display = "none"),
    });
  });
});

window.addEventListener("click", function (event) {
  modals.forEach((modal) => {
    if (event.target === modal) {
      const svg = modal.querySelector("svg");
      const ul = modal.querySelector(".social ul");

      gsap.to([svg, ul], {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => (modal.style.display = "none"),
      });
    }
  });
});

// Fonction pour faire défiler le texte de l'élément h2

document.addEventListener("DOMContentLoaded", function () {
  function typeWriter(element, speed) {
    let spans = Array.from(element.querySelectorAll("span"));
    let textArray = spans.map((span) => span.dataset.text || span.textContent);

    spans.forEach((span) => {
      span.dataset.text = span.textContent; // Stocke le texte original
      span.style.width = span.offsetWidth + "px";
      span.textContent = "";
      span.style.visibility = "visible";
      span.style.display = "inline-block";
    });

    let i = 0, j = 0;

    function write() {
      if (j < textArray[i].length) {
        spans[i].textContent += textArray[i].charAt(j);
        j++;
        setTimeout(write, speed);
      } else if (i < spans.length - 1) {
        i++;
        j = 0;
        setTimeout(write, speed);
      }
    }

    write();
  }

  let h2 = document.querySelector("h2");

  let observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          typeWriter(h2, 80);
        }
      });
    },
    { threshold: 0.5 } // Déclenche l'animation quand 50% de l'élément est visible
  );

  observer.observe(h2);
});
