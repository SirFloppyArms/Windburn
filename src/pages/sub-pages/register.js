/* ===============================
   REGISTER PAGE - JAVASCRIPT
================================ */

/* ===============================
   COUNTDOWN TIMER
================================ */
function initCountdown() {
  const countdownElement = document.getElementById('countdown');
  if (!countdownElement) return;

  // Target date: August 15, 2026 at 00:00 local time
  const targetDate = new Date(2026, 7, 15, 0, 0, 0, 0); 
  // Month is 0-based (7 = August)

  let intervalId = null;

  function updateCountdown() {
    const now = Date.now();
    const distance = targetDate.getTime() - now;

    const items = countdownElement.querySelectorAll('.countdown-item');
    if (items.length < 4) return;

    if (distance <= 0) {
      // Lock at zero once reached
      items.forEach(item => {
        item.querySelector('.countdown-number').textContent = '00';
      });
      clearInterval(intervalId);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    items[0].querySelector('.countdown-number').textContent = String(days).padStart(2, '0');
    items[1].querySelector('.countdown-number').textContent = String(hours).padStart(2, '0');
    items[2].querySelector('.countdown-number').textContent = String(minutes).padStart(2, '0');
    items[3].querySelector('.countdown-number').textContent = String(seconds).padStart(2, '0');
  }

  // Initial render
  updateCountdown();

  // Tick every second
  intervalId = setInterval(updateCountdown, 1000);
}

/* ===============================
   TIER REGISTRATION BUTTONS
================================ */
function initTierButtons() {
  const tierButtons = document.querySelectorAll('.tier-register-btn');

  tierButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add visual feedback
      const originalText = button.textContent;
      button.textContent = 'Redirecting...';
      
      // In a real implementation, this would redirect to an actual registration system
      // For now, we'll show an alert and then redirect after a brief delay
      setTimeout(() => {
        // You can replace this URL with your actual registration platform URL
        window.location.href = 'https://example.com/register'; // Replace with actual registration URL
      }, 1000);
    });
  });
}

/* ===============================
   SMOOTH SCROLL ENHANCEMENT
================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ===============================
   PAGE INITIALIZATION
================================ */
document.addEventListener('DOMContentLoaded', function() {
  initCountdown();
  initTierButtons();
  initSmoothScroll();
});
