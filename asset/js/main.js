// SINGLE PAGE ANIMATION


gsap.utils.toArray(".comparisonSection").forEach((section) => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "center center",
      end: () => "+=" + section.offsetWidth,
      scrub: true,
      pin: true,
      anticipatePin: 1,
    },
    defaults: { ease: "none" },
  });
  // animate the container one way...
  tl.fromTo(
    section.querySelector(".afterImage"),
    { xPercent: 100, x: 0 },
    { xPercent: 0 }
  )
    // ...and the image the opposite way (at the same time)
    .fromTo(
      section.querySelector(".afterImage img"),
      { xPercent: -100, x: 0 },
      { xPercent: 0 },
      0
    );
});

gsap.to(".animated-path", {
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
  attr: {
    d: "M600 50C650 90 700 180 690 260C680 340 630 420 620 490C610 560 640 640 600 680C560 720 480 700 410 710C340 720 280 760 220 740C160 720 100 650 80 590C60 530 90 480 100 420C110 360 90 300 80 240C70 180 60 110 100 70C140 30 220 30 290 30C360 30 420 10 480 20C540 30 600 10 600 50Z",
  },
});

document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll(".video-content");

  videos.forEach((video) => {
    video.addEventListener("click", function () {
      if (!document.fullscreenElement) {
        video.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });
  });
});



// HOMEPAGE 

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



document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.classList.add("highlight");
        setTimeout(() => {
          targetElement.classList.remove("highlight");
        }, 1000);

        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth"
        });
      }
    });
  });
});

const cvButton = document.querySelector('.cv-download');
let scrollTimer;
let buttonClicked = false; // Pour savoir si le bouton a été cliqué

// Comportement au scroll
window.addEventListener('scroll', () => {
  if (buttonClicked) return; // Si le bouton a été cliqué, on ne fait plus rien

  // Disparition immédiate
  cvButton.style.transform = 'translateY(100px)';
  cvButton.style.opacity = '0';

  clearTimeout(scrollTimer);

  // Réapparition après 1s sans scroll
  scrollTimer = setTimeout(() => {
    cvButton.style.transform = 'translateY(0)';
    cvButton.style.opacity = '1';
  }, 800);
});

// Comportement au clic
cvButton.addEventListener('click', () => {
  buttonClicked = true;
  cvButton.style.transform = 'translateY(100px)';
  cvButton.style.opacity = '0';
});

// Timeline Animation
document.addEventListener('DOMContentLoaded', function() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }
    });
  }, {
    threshold: 0.5
  });

  timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = item.classList.contains('timeline-item--left') ? 'translateX(-50px)' : 'translateX(50px)';
    item.style.transition = 'all 0.5s ease-out';
    observer.observe(item);
  });
});

// Timeline Background Animation
document.addEventListener('DOMContentLoaded', function() {
  const timelineContainer = document.querySelector('.timeline-container');
  if (!timelineContainer) return;

  // Create particles container
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles';
  timelineContainer.insertBefore(particlesContainer, timelineContainer.firstChild);

  // Create particles
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random size
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random animation duration
    const duration = Math.random() * 10 + 10;
    particle.style.animationDuration = `${duration}s`;
    
    // Random delay
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    particlesContainer.appendChild(particle);
  }

  // GSAP animation for the background gradient
  gsap.to(timelineContainer, {
    backgroundPosition: '100% 50%',
    duration: 15,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
});

// About Section Background Animation
document.addEventListener('DOMContentLoaded', function() {
  const aboutSection = document.querySelector('#about');
  if (!aboutSection) return;

  // Create particles container
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles';
  aboutSection.insertBefore(particlesContainer, aboutSection.firstChild);

  // Create particles
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random size
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random animation duration
    const duration = Math.random() * 10 + 10;
    particle.style.animationDuration = `${duration}s`;
    
    // Random delay
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    particlesContainer.appendChild(particle);
  }

  // GSAP animation for the background gradient
  gsap.to(aboutSection, {
    backgroundPosition: '100% 50%',
    duration: 15,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
});

