// Apply the saved light/dark choice before first paint.
// Copy into the product's public/ folder and load it in <head> as an external script,
// so the Content-Security-Policy can keep forbidding inline scripts.
try {
  var t = localStorage.getItem('theme');
  var dark = t ? t === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', dark);
} catch (e) {}
