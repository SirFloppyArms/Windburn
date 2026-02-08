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

function initPhoneMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".phone-menu");
  const header = document.querySelector(".site-header");

  if (!toggle || !menu || !header) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");

    header.classList.toggle("is-menu-open", isOpen);

    toggle.setAttribute("aria-expanded", isOpen);
    menu.setAttribute("aria-hidden", !isOpen);

    toggle.textContent = isOpen ? "✕" : "☰";

    /* Prevent body scroll when menu is open */
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 950) {
      menu.classList.remove("is-open");
      header.classList.remove("is-menu-open");
      toggle.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
      toggle.textContent = "☰";

      /* Restore body scroll on resize to desktop */
      document.body.style.overflow = "";
    }
  });
}

/* ===============================
   Set Active Navigation Link
================================ */
function setActiveNavLink(currentPage) {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("data-page") === currentPage) {
      link.classList.add("active");
    }
  });
}

/* ===============================
   Get Current Page Name
================================ */
function getCurrentPageName() {
  const path = window.location.pathname;
  const filename = path.split("/").pop() || "index.html";
  return filename.replace(".html", "");
}