document.addEventListener("DOMContentLoaded", () => {
  // Nascondi tutte le sezioni all'inizio
  document.querySelectorAll('.sezione').forEach(s => s.style.display = 'none');
});

function showSection(id) {
  // Nascondi tutte le sezioni
  document.querySelectorAll('.sezione').forEach(s => s.style.display = 'none');
  // Mostra solo quella cliccata
  document.getElementById(id).style.display = 'block';
  // Non scrollare verso la home
  window.scrollTo({ top: 0, behavior: 'auto' }); // rapido
}

function goHome() {
  // Nascondi tutte le sezioni
  document.querySelectorAll('.sezione').forEach(s => s.style.display = 'none');
  // Scrolla in cima alla Home
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
