/* =================================================================
   MOON JOURNEY — script.js
   Handles: loading sequence, intro, slide generation & navigation,
   background video/music, blessing + letter screens, replay/reset.
================================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     DATA — one entry per year. Add/edit freely; everything
     below (chapter numbers, moon image src, progress count)
     is derived automatically from this array's length.
  --------------------------------------------------------- */
  const JOURNEY_DATA = [
    { year: 2009, phase: "Waning Gibbous",  illumination: "90%",  title: "Where It Began",       wish: "A story started quietly, and heaven was already smiling." },
    { year: 2010, phase: "First Quarter",   illumination: "50%",  title: "Small Wonders",         wish: "Every small step you took was already part of something bigger." },
    { year: 2011, phase: "First Quarter",   illumination: "50%",  title: "Learning to Shine",     wish: "Light doesn't need to be loud to be seen." },
    { year: 2012, phase: "Full Moon",       illumination: "100%", title: "Roots and Wings",       wish: "Growing steady, reaching further than you knew." },
    { year: 2013, phase: "Waning Gibbous",  illumination: "93%",  title: "Gentle Seasons",        wish: "Even the quiet years were shaping something beautiful." },
    { year: 2014, phase: "Waxing Crescent", illumination: "12%",  title: "Braver Than You Knew",  wish: "Courage looked good on you, even when you didn't feel it." },
    { year: 2015, phase: "Waxing Crescent", illumination: "12%",  title: "Held Through It All",   wish: "Some years test us — and still, grace carried you." },
    { year: 2016, phase: "First Quarter",   illumination: "50%",  title: "New Horizons",          wish: "The world opened wider, and you walked toward it." },
    { year: 2017, phase: "First Quarter",   illumination: "50%",  title: "Quiet Strength",        wish: "Not every strength roars. Some simply stays." },
    { year: 2018, phase: "Waxing Gibbous",  illumination: "78%",  title: "Becoming",              wish: "You were never finished — only ever becoming." },
    { year: 2019, phase: "Waxing Gibbous",  illumination: "65%",  title: "Faith Over Fear",       wish: "Even on uncertain nights, you chose to trust the light." },
    { year: 2020, phase: "Full Moon",       illumination: "100%", title: "Still Standing",        wish: "The world paused, but your spirit never stopped shining." },
    { year: 2021, phase: "Waxing Crescent", illumination: "20%",  title: "Rebuilding, Gently",    wish: "Healing takes time, and you gave yourself that grace." },
    { year: 2022, phase: "Waxing Crescent", illumination: "45%",  title: "Rediscovery",           wish: "You found pieces of yourself you thought you'd lost." },
    { year: 2023, phase: "Waxing Gibbous",  illumination: "65%",  title: "Deeper Roots",          wish: "Steadier, wiser, more fully yourself than ever." },
    { year: 2024, phase: "New Moon",        illumination: "3%",   title: "Radiant",               wish: "Something in you finally caught up to how bright you've always been." },
    { year: 2025, phase: "Waxing Gibbous",  illumination: "78%",  title: "Fully Alive",           wish: "This was a year you lived, not just survived." },
    { year: 2026, phase: "Waxing Gibbous",  illumination: "63%",  title: "This Year, Beloved",    wish: "And now, this year — may it be your brightest yet." }
  ];

  const TOTAL_SLIDES = JOURNEY_DATA.length;

  /* ---------------------------------------------------------
     STATE
  --------------------------------------------------------- */
  let currentSlide = 0;
  let musicPlaying = false;
  let touchStartX = null;
  let touchStartY = null;

  /* ---------------------------------------------------------
     DOM REFERENCES
  --------------------------------------------------------- */
  const loadingScreen   = document.getElementById("loading-screen");
  const introScreen     = document.getElementById("intro-screen");
  const journey         = document.getElementById("journey");
  const slidesTrack     = document.getElementById("slides-track");
  const blessingScreen  = document.getElementById("blessing-screen");
  const letterScreen    = document.getElementById("letter-screen");

  const bgVideo   = document.getElementById("bg-video");
  const bgAudio   = document.getElementById("bg-audio");
  const musicBtn  = document.getElementById("music-toggle");

  const beginBtn        = document.getElementById("begin-btn");
  const navPrev         = document.getElementById("nav-prev");
  const navNext         = document.getElementById("nav-next");
  const progressCurrent = document.getElementById("progress-current");
  const progressTotal   = document.getElementById("progress-total");
  const lastMessageBtn  = document.getElementById("last-message-btn");
  const replayBtn       = document.getElementById("replay-btn");

  /* ---------------------------------------------------------
     INIT
  --------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    progressTotal.textContent = String(TOTAL_SLIDES).padStart(2, "0");
    buildSlides();
    attachEvents();

    // Loading screen is visible by default and fades itself out via CSS
    // (animation defined in style.css). We reveal the intro screen once
    // that fade has had time to complete.
    window.setTimeout(() => {
      loadingScreen.classList.add("hidden");
      introScreen.classList.remove("hidden");
    }, 3000);
  }

  /* ---------------------------------------------------------
     BUILD SLIDES
  --------------------------------------------------------- */
  function buildSlides() {
    const fragment = document.createDocumentFragment();

    JOURNEY_DATA.forEach((entry, index) => {
      const chapterNumber = String(index + 1).padStart(2, "0");
      const isLast = index === TOTAL_SLIDES - 1;

      const slide = document.createElement("div");
      slide.className = "slide";
      slide.dataset.index = String(index);

      slide.innerHTML = `
        <div class="slide-card">
          <p class="slide-chapter">Chapter ${chapterNumber}</p>
          <p class="slide-date">${chapterNumber} of ${TOTAL_SLIDES} &middot; A Year of the Journey</p>
          <h2 class="slide-year">${entry.year}</h2>

          <div class="moon-frame">
            <div class="moon-frame-glow"></div>
            <img src="${entry.year}.png" alt="Moon, ${entry.year}"
                 onerror="this.style.opacity='0.15';">
          </div>

          <div class="moon-meta">
            <span>Phase &middot; <b>${entry.phase}</b></span>
            <span>Illumination &middot; <b>${entry.illumination}</b></span>
          </div>

          <h3 class="slide-title">${entry.title}</h3>
          <p class="slide-wish">${entry.wish}</p>

          ${
            isLast
              ? `<div class="slide-cross" id="final-cross" role="button" aria-label="Continue">✝️</div>`
              : `<p class="slide-hint">Swipe &bull; Tap Next →</p>`
          }
        </div>
      `;

      fragment.appendChild(slide);
    });

    slidesTrack.appendChild(fragment);
  }

  /* ---------------------------------------------------------
     EVENTS
  --------------------------------------------------------- */
  function attachEvents() {
    beginBtn.addEventListener("click", beginJourney);
    musicBtn.addEventListener("click", toggleMusic);

    navPrev.addEventListener("click", () => goToSlide(currentSlide - 1));
    navNext.addEventListener("click", () => goToSlide(currentSlide + 1));

    // Tap anywhere on the active (non-final) slide to advance
    slidesTrack.addEventListener("click", (e) => {
      const slideEl = e.target.closest(".slide");
      if (!slideEl) return;
      if (e.target.closest("#final-cross")) return; // handled separately
      const isLastSlide = currentSlide === TOTAL_SLIDES - 1;
      if (!isLastSlide) goToSlide(currentSlide + 1);
    });

    // Final cross tap -> blessing screen
    slidesTrack.addEventListener("click", (e) => {
      if (e.target.closest("#final-cross")) {
        showBlessing();
      }
    });

    // Swipe navigation
    slidesTrack.addEventListener("touchstart", onTouchStart, { passive: true });
    slidesTrack.addEventListener("touchend", onTouchEnd, { passive: true });

    lastMessageBtn.addEventListener("click", showLetter);
    replayBtn.addEventListener("click", replayJourney);
  }

  function onTouchStart(e) {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }

  function onTouchEnd(e) {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;

    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        goToSlide(currentSlide + 1);
      } else {
        goToSlide(currentSlide - 1);
      }
    }
    touchStartX = null;
    touchStartY = null;
  }

  /* ---------------------------------------------------------
     INTRO -> JOURNEY
  --------------------------------------------------------- */
  function beginJourney() {
    introScreen.classList.add("screen-exit");

    window.setTimeout(() => {
      introScreen.classList.add("hidden");
      introScreen.classList.remove("screen-exit");

      journey.classList.remove("hidden");
      musicBtn.classList.remove("hidden");

      startBackgroundVideo();
      startMusic();
      renderSlide(0);
    }, 650);
  }

  function startBackgroundVideo() {
    bgVideo.currentTime = 0;
    bgVideo.classList.add("active");
    const playPromise = bgVideo.play();
    if (playPromise && playPromise.catch) {
      playPromise.catch(() => {
        /* Autoplay may be blocked until user interacts; the tap that
           triggered beginJourney counts as that interaction on most
           browsers, but we fail silently otherwise. */
      });
    }
  }

  function startMusic() {
    bgAudio.volume = 0.85;
    const playPromise = bgAudio.play();
    if (playPromise && playPromise.then) {
      playPromise
        .then(() => {
          musicPlaying = true;
          musicBtn.classList.remove("paused");
        })
        .catch(() => {
          musicPlaying = false;
          musicBtn.classList.add("paused");
        });
    }
  }

  function toggleMusic() {
    if (musicPlaying) {
      bgAudio.pause();
      musicPlaying = false;
      musicBtn.classList.add("paused");
    } else {
      bgAudio.play().then(() => {
        musicPlaying = true;
        musicBtn.classList.remove("paused");
      }).catch(() => {});
    }
  }

  /* ---------------------------------------------------------
     SLIDE NAVIGATION
  --------------------------------------------------------- */
  function goToSlide(index) {
    if (index < 0 || index > TOTAL_SLIDES - 1) return;
    renderSlide(index);
  }

  function renderSlide(index) {
    currentSlide = index;

    const allSlides = slidesTrack.querySelectorAll(".slide");
    allSlides.forEach((el) => el.classList.remove("active"));
    allSlides[index].classList.add("active");

    progressCurrent.textContent = String(index + 1).padStart(2, "0");

    navPrev.disabled = index === 0;
    navNext.disabled = index === TOTAL_SLIDES - 1;
  }

  /* ---------------------------------------------------------
     BLESSING / LETTER
  --------------------------------------------------------- */
  function showBlessing() {
    journey.classList.add("hidden");
    blessingScreen.classList.remove("hidden");
  }

  function showLetter() {
    blessingScreen.classList.add("hidden");
    letterScreen.classList.remove("hidden");
  }

  /* ---------------------------------------------------------
     REPLAY / RESET
  --------------------------------------------------------- */
  function replayJourney() {
    // Stop media
    bgAudio.pause();
    bgAudio.currentTime = 0;
    musicPlaying = false;
    musicBtn.classList.add("paused");

    bgVideo.pause();
    bgVideo.currentTime = 0;
    bgVideo.classList.remove("active");

    // Hide everything except intro
    letterScreen.classList.add("hidden");
    blessingScreen.classList.add("hidden");
    journey.classList.add("hidden");
    musicBtn.classList.add("hidden");

    // Reset progress
    currentSlide = 0;
    renderSlide(0);

    // Show intro again
    introScreen.classList.remove("hidden");
  }
})();
     
