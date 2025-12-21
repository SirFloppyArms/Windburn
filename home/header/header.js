function initStickyHeader() {
  if (window.innerWidth <= 950) return;

  const header = document.querySelector(".header-bottom");
  if (!header) return;

  /* ===============================
     Spacer
  ================================ */
  const spacer = document.createElement("div");
  spacer.style.height = "0px";
  spacer.style.display = "none";
  spacer.setAttribute("aria-hidden", "true");
  header.after(spacer);

  /* ===============================
     Config
  ================================ */
  const STICKY_DELAY = 20;   // px after stick before glass
  const SCROLL_RANGE = 100; // px to full effect

  let stickyTrigger = 0;
  let resizeTimeout = null;

  /* ===============================
     Measurements
  ================================ */
  function calculateStickyTrigger() {
    // Force header into natural flow for measurement
    header.classList.remove("is-sticky");
    spacer.style.display = "none";
    spacer.style.height = "0px";

    const rect = header.getBoundingClientRect();
    stickyTrigger = window.scrollY + rect.top;
  }

  /* ===============================
     Update loop
  ================================ */
  function update() {
    const scrollY = window.scrollY;

    if (scrollY >= stickyTrigger) {
      if (!header.classList.contains("is-sticky")) {
        spacer.style.height = `${header.offsetHeight}px`;
        spacer.style.display = "block";
        header.classList.add("is-sticky");
      }

      const distance = scrollY - stickyTrigger;

      if (distance <= STICKY_DELAY) {
        header.style.setProperty("--sticky-progress", "0");
        return;
      }

      const progress = Math.min(
        (distance - STICKY_DELAY) / SCROLL_RANGE,
        1
      );

      header.style.setProperty(
        "--sticky-progress",
        progress.toFixed(3)
      );
    } else {
      header.classList.remove("is-sticky");
      spacer.style.display = "none";
      spacer.style.height = "0px";
      header.style.setProperty("--sticky-progress", "0");
    }
  }

  /* ===============================
     Resize handler (debounced)
  ================================ */
  function onResize() {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
      calculateStickyTrigger();
      update();
    }, 150);
  }

  /* ===============================
     Init
  ================================ */
  calculateStickyTrigger();
  update();

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", onResize);
}