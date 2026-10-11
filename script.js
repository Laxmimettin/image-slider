const carousel = document.getElementById("carousel");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const indicatorsContainer = document.getElementById("indicators");
const slideCount = document.getElementById("slideCount");

let currentIndex = 0;
let autoPlayTimer;
const AUTO_PLAY_DELAY = 3000;

// Create one indicator for every slide
slides.forEach((slide, index) => {
  const indicator = document.createElement("button");

  indicator.classList.add("indicator");
  indicator.setAttribute("aria-label", `Go to slide ${index + 1}`);
  indicator.addEventListener("click", () => {
    showSlide(index);
    restartAutoPlay();
  });

  indicatorsContainer.appendChild(indicator);
});

const indicators = document.querySelectorAll(".indicator");

// Display the selected slide
function showSlide(index) {
  currentIndex = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentIndex);
  });

  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === currentIndex);
    indicator.setAttribute(
      "aria-current",
      i === currentIndex ? "true" : "false",
    );
  });

  slideCount.textContent =
    `${String(currentIndex + 1).padStart(2, "0")} / ` +
    `${String(slides.length).padStart(2, "0")}`;
}

// Move to the next slide
function nextSlide() {
  showSlide(currentIndex + 1);
}

// Move to the previous slide
function previousSlide() {
  showSlide(currentIndex - 1);
}

// Start automatic rotation
function startAutoPlay() {
  clearInterval(autoPlayTimer);

  if (
    !carousel.matches(":hover") &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    autoPlayTimer = setInterval(nextSlide, AUTO_PLAY_DELAY);
  }
}

// Restart timer after manual navigation
function restartAutoPlay() {
  startAutoPlay();
}

nextBtn.addEventListener("click", () => {
  nextSlide();
  restartAutoPlay();
});

prevBtn.addEventListener("click", () => {
  previousSlide();
  restartAutoPlay();
});

// Pause while mouse is over the carousel
carousel.addEventListener("mouseenter", () => {
  clearInterval(autoPlayTimer);
});

// Resume when the mouse leaves the carousel
carousel.addEventListener("mouseleave", startAutoPlay);

// Pause when the browser tab is hidden
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    clearInterval(autoPlayTimer);
  } else {
    startAutoPlay();
  }
});

// Initialize carousel
showSlide(0);
startAutoPlay();
