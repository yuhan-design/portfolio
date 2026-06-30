// Hero animations for index.html
// Rotating label in the chip
(function() {
  'use strict';

  var initRotatingLabel = function() {
    var $label = document.querySelector('.fi-rotating-label');
    if (!$label) return;

    var textString = $label.getAttribute('data-texts') || '年設計經驗|設計專案|客戶案例|創意解決';
    var texts = textString.split('|');
    var currentIndex = 0;
    var rotationInterval = 4000; // Change text every 4 seconds
    var animationDuration = 200; // Match CSS animation duration

    var rotateText = function() {
      var nextIndex = (currentIndex + 1) % texts.length;
      
      // Add exit animation class
      $label.classList.add('rotate-out');
      
      // Change text after animation completes
      setTimeout(function() {
        $label.classList.remove('rotate-out');
        $label.textContent = texts[nextIndex];
        currentIndex = nextIndex;
      }, animationDuration);
    };

    // Start rotation after initial delay
    setInterval(rotateText, rotationInterval);
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRotatingLabel);
  } else {
    initRotatingLabel();
  }
})();
