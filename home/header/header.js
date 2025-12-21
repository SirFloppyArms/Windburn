function initStickyHeader() {
  if (window.innerWidth <= 950) return;

  const headerBottom = document.querySelector(".header-bottom");
  if (!headerBottom) return;

  // Spacer to prevent layout jump
  const spacer = document.createElement("div");
  spacer.style.height = "0px";
  spacer.style.display = "none";
  headerBottom.after(spacer);

  const DIVIDER_OFFSET = 18; // nav-menu::before top offset
  let stickyTrigger = 0;

  function calculateTrigger() {
    const rect = headerBottom.getBoundingClientRect();

    // Divider is at top of header-bottom
    const dividerOffset = 0;

    stickyTrigger = window.scrollY + rect.top + dividerOffset;

    // Tell CSS how far to offset the fixed header
    headerBottom.style.setProperty(
      "--sticky-divider-offset",
      `${dividerOffset}px`
    );
  }

  calculateTrigger();
  window.addEventListener("resize", calculateTrigger);

  window.addEventListener("scroll", () => {
    if (window.scrollY >= stickyTrigger) {
      if (!headerBottom.classList.contains("is-sticky")) {
        spacer.style.height = `${headerBottom.offsetHeight}px`;
        spacer.style.display = "block";
        headerBottom.classList.add("is-sticky");
      }
    } else {
      if (headerBottom.classList.contains("is-sticky")) {
        spacer.style.height = "0px";
        spacer.style.display = "none";
        headerBottom.classList.remove("is-sticky");
      }
    }
  });
}