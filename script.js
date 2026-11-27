"use strict";

const photoColumns = [
  {
    direction: "up",
    duration: 90,
    images: [
      "Media/BG/1.webp",
      "Media/BG/2.webp",
      "Media/BG/3.webp",
      "Media/BG/4.webp",
      "Media/BG/5.webp",
      "Media/BG/7.webp",
      "Media/BG/8.webp",
      "Media/BG/41.webp",
      "Media/BG/46.webp",
      "Media/BG/51.webp",
      "Media/BG/57.webp",
      "Media/BG/61.webp",
      "Media/BG/67.webp",
      "Media/BG/68.webp"
    ]
  },
  {
    direction: "down",
    duration: 160,
    images: [
      "Media/BG/9.webp",
      "Media/BG/62.webp",
      "Media/BG/10.webp",
      "Media/BG/11.webp",
      "Media/BG/12.webp",
      "Media/BG/13.webp",
      "Media/BG/14.webp",
      "Media/BG/15.webp",
      "Media/BG/16.webp",
      "Media/BG/47.webp",
      "Media/BG/52.webp",
      "Media/BG/36.webp",
    ]
  },
  {
    direction: "up",
    duration: 120,
    images: [
      "Media/BG/17.webp",
      "Media/BG/18.webp",
      "Media/BG/19.webp",
      "Media/BG/20.webp",
      "Media/BG/21.webp",
      "Media/BG/22.webp",
      "Media/BG/23.webp",
      "Media/BG/24.webp",
      "Media/BG/43.webp",
      "Media/BG/63.webp",
      "Media/BG/48.webp",
      "Media/BG/53.webp",
      "Media/BG/42.webp",
      "Media/BG/58.webp"
    ]
  },
  {
    direction: "down",
    duration: 155,
    images: [
      "Media/BG/25.webp",
      "Media/BG/26.webp",
      "Media/BG/27.webp",
      "Media/BG/28.webp",
      "Media/BG/29.webp",
      "Media/BG/30.webp",
      "Media/BG/31.webp",
      "Media/BG/32.webp",
      "Media/BG/44.webp",
      "Media/BG/64.webp",
      "Media/BG/49.webp",
      "Media/BG/54.webp",
      "Media/BG/35.webp",
      "Media/BG/59.webp"
    ]
  },
  {
    direction: "up",
    duration: 100,
    images: [
      "Media/BG/33.webp",
      "Media/BG/34.webp",
      "Media/BG/57.webp",
      "Media/BG/56.webp",
      "Media/BG/37.webp",
      "Media/BG/38.webp",
      "Media/BG/39.webp",
      "Media/BG/40.webp",
      "Media/BG/45.webp",
      "Media/BG/50.webp",
      "Media/BG/65.webp",
      "Media/BG/55.webp",
      "Media/BG/60.webp",
      "Media/BG/66.webp"
    ]
  }
];

const hero = document.querySelector(".hero");
const mosaic = document.querySelector("#photo-mosaic");
const portfolioToggle = document.querySelector("#portfolio-toggle");
const portfolioOptions = document.querySelector("#portfolio-options");
const motionToggle = document.querySelector("#motion-toggle");
const motionState = document.querySelector("#motion-state");
let portfolioOpen = false;
let previousScrollY = window.scrollY;
const scrollControlsPortfolio = Boolean(mosaic);

function createPhotoGroup(imageIds) {
  const group = document.createElement("div");
  group.className = "photo-column__group";

  imageIds.forEach((imageId) => {
    const image = document.createElement("img");
    image.src = imageId;
    image.alt = "";
    image.decoding = "async";
    group.append(image);
  });

  return group;
}

if (mosaic) {
  photoColumns.forEach(({ direction, duration, images }) => {
    const column = document.createElement("div");
    const track = document.createElement("div");
    const firstGroup = createPhotoGroup(images);
    const repeatedGroup = firstGroup.cloneNode(true);

    column.className = "photo-column";
    track.className = "photo-column__track";
    track.dataset.direction = direction;
    track.style.setProperty("--duration", `${duration}s`);
    repeatedGroup.setAttribute("aria-hidden", "true");
    track.append(firstGroup, repeatedGroup);
    column.append(track);
    mosaic.append(column);
  });
}

function syncPortfolioMenu() {
  hero.dataset.menuOpen = String(portfolioOpen);
  portfolioToggle.setAttribute("aria-expanded", String(portfolioOpen));
  portfolioOptions.hidden = !portfolioOpen;
}

function handleScroll() {
  const currentScrollY = window.scrollY;

  if (scrollControlsPortfolio && currentScrollY !== previousScrollY) {
    portfolioOpen = currentScrollY > previousScrollY;
  }

  previousScrollY = currentScrollY;
  syncPortfolioMenu();
}

portfolioToggle.addEventListener("click", () => {
  portfolioOpen = !portfolioOpen;
  syncPortfolioMenu();
});

if (motionToggle && motionState) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function setAnimationsEnabled(enabled) {
    hero.dataset.animations = enabled ? "on" : "off";
    motionToggle.setAttribute("aria-pressed", String(enabled));
    motionState.textContent = enabled ? "ON" : "OFF";
  }

  function syncReducedMotionPreference() {
    motionToggle.disabled = reducedMotion.matches;
    setAnimationsEnabled(!reducedMotion.matches);
  }

  motionToggle.addEventListener("click", () => {
    if (!reducedMotion.matches) {
      setAnimationsEnabled(hero.dataset.animations !== "on");
    }
  });

  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", syncReducedMotionPreference);
  } else {
    reducedMotion.addListener(syncReducedMotionPreference);
  }

  syncReducedMotionPreference();
}

window.addEventListener("scroll", handleScroll, { passive: true });
syncPortfolioMenu();
