(function () {
	var THRESHOLD = 1000;

	var btn = document.createElement('button');
	btn.type = 'button';
	btn.className = 'fi-back-to-top';
	btn.setAttribute('aria-label', '回到頂端');
	btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>';
	document.body.appendChild(btn);

	var ticking = false;
	function update() {
		ticking = false;
		if (window.scrollY > THRESHOLD) btn.classList.add('is-visible');
		else btn.classList.remove('is-visible');
	}
	window.addEventListener('scroll', function () {
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(update);
	}, { passive: true });
	update();

	btn.addEventListener('click', function () {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
})();
