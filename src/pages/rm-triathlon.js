/* ===============================
   RM TRIATHLON PAGE - JAVASCRIPT
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
   FAQ ACCORDION FUNCTIONALITY
================================ */
function initFAQs() {
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const faqItem = this.closest('.faq-item');
      const faqContent = faqItem.querySelector('.faq-content');
      
      // Close all other FAQs
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('active');
          item.querySelector('.faq-content').style.display = 'none';
        }
      });

      // Toggle current FAQ
      faqItem.classList.toggle('active');
      
      if (faqItem.classList.contains('active')) {
        faqContent.style.display = 'block';
        // Smooth scroll to FAQ
        setTimeout(() => {
          faqItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      } else {
        faqContent.style.display = 'none';
      }
    });
  });
}

/* ===============================
   COURSE MAPS TAB FUNCTIONALITY
================================ */
function initCourseMaps() {
  const tabButtons = document.querySelectorAll('.course-tab-btn');
  const tabContents = document.querySelectorAll('.course-tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const selectedTab = this.getAttribute('data-tab');

      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // Remove active class from all contents
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Add active class to corresponding content
      const activeContent = document.querySelector(`.course-tab-content[data-tab="${selectedTab}"]`);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });
}

/* ===============================
   PAGE INITIALIZATION
================================ */
document.addEventListener('DOMContentLoaded', function() {
  initCountdown();
  initFAQs();
  initCourseMaps();
});
