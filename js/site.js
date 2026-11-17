// Loads content.html into index.html and wires up small interactions.
(function () {
  const root = document.documentElement;
  const main = document.getElementById('content');

  function reveal() {
    root.classList.add('js');
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.rv').forEach(el => io.observe(el));
  }

  fetch('content.html', { cache: 'no-cache' })
    .then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })
    .then(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      main.innerHTML = doc.body.innerHTML;
      reveal();
      if (location.hash) {
        const t = document.querySelector(location.hash);
        if (t) t.scrollIntoView();
      }
    })
    .catch(() => {
      main.innerHTML = '<div class="wrap load-error"><p>Couldn\'t load the page content. ' +
        'If you opened this file directly, preview it with <code>python3 -m http.server</code> instead, ' +
        'or open <a href="content.html">content.html</a>.</p></div>';
    });

  const nav = document.getElementById('nav');
  addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 8), { passive: true });
  document.getElementById('yr').textContent = new Date().getFullYear();
})();
