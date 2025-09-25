// Intro
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");
  const main = document.getElementById("main-content");

  setTimeout(() => {
    intro.classList.add("fade-out");
    setTimeout(() => {
      intro.style.display = "none";
      main.style.display = "block";
      main.style.opacity = "0";
      main.style.transition = "opacity 1s ease";
      requestAnimationFrame(() => {
        main.style.opacity = "1";
      });
    }, 1000);
  }, 7000);
});

const canvasIntro = document.getElementById("intro-stars");
const ctxIntro = canvasIntro.getContext("2d");
canvasIntro.width = window.innerWidth;
canvasIntro.height = window.innerHeight;

class StarIntro {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvasIntro.width;
    this.y = -10;
    this.size = Math.random() * 2 + 1;
    this.speed = Math.random() * 4 + 2;
  }
  update() {
    this.y += this.speed;
    if (this.y > canvasIntro.height) this.reset();
  }
  draw() {
    ctxIntro.fillStyle = "white";
    ctxIntro.beginPath();
    ctxIntro.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctxIntro.fill();
  }
}

let introStars = Array.from({ length: 50 }, () => new StarIntro());

function animateIntroStars() {
  ctxIntro.clearRect(0, 0, canvasIntro.width, canvasIntro.height);
  introStars.forEach(star => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animateIntroStars);
}
animateIntroStars();

window.addEventListener("resize", () => {
  canvasIntro.width = window.innerWidth;
  canvasIntro.height = window.innerHeight;
});

// Bintang
function createStar() {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.left = Math.random() * window.innerWidth + "px";
  const duration = Math.random() * 3 + 2;
  star.style.animationDuration = duration + "s";

  document.getElementById("stars").appendChild(star);
  setTimeout(() => {
    star.remove();
  }, duration * 1000);
}

setInterval(createStar, 250);

// Hamburger
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".navbar-nav");
const overlay = document.querySelector(".overlay");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  navMenu.classList.remove("active");
  overlay.classList.remove("active");
});

// Navbar
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  const navbarHeight = navbar.offsetHeight;
  const footerTop = footer.offsetTop;
  const scrollY = window.scrollY;

  if (scrollY > header.offsetHeight - 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  if (scrollY + navbarHeight >= footerTop) {
    navbar.style.transform = `translateY(${footerTop - (scrollY + navbarHeight)}px)`;
  } else {
    navbar.style.transform = "translateY(0)";
  }
});

// Banner
const slides = document.querySelectorAll(".slide");
const wrapper = document.querySelector(".slider-wrapper");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let index = 0;
function showSlide(i) {
  if(i < 0) index = slides.length - 1;
  else if(i >= slides.length) index = 0;
  else index = i;

  wrapper.style.transform = `translateX(-${index * 100}%)`;
}

next.addEventListener("click", () => {
  showSlide(index + 1);
});

prev.addEventListener("click", () => {
  showSlide(index - 1);
});

setInterval(() => {
  showSlide(index + 1);
}, 5000);

let startX = 0;
wrapper.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

wrapper.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  if(startX - endX > 50) showSlide(index + 1);
  else if(endX - startX > 50) showSlide(index - 1);
});

// FAQ
const faqCards = document.querySelectorAll('.faq-card');

faqCards.forEach(card => {
  card.addEventListener('click', () => {
    faqCards.forEach(c => {
      if (c !== card) {
        c.classList.remove('active');
        c.querySelector('.arrow').style.transform = 'rotate(0deg)';
      }
    });

    card.classList.toggle('active');

    const arrow = card.querySelector('.arrow');
    if (card.classList.contains('active')) {
      arrow.style.transform = 'rotate(180deg)';
    } else {
      arrow.style.transform = 'rotate(0deg)';
    }
  });
});