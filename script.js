document.addEventListener("DOMContentLoaded", () => {
  // Nascondi tutte le sezioni all'inizio
  document.querySelectorAll('.sezione').forEach(s => s.style.display = 'none');
});

function showSection(id, event) {
  if(event) event.preventDefault(); // blocca default del pulsante
  // Nascondi tutte le sezioni
  document.querySelectorAll('.sezione').forEach(s => s.style.display = 'none');
  // Mostra solo la sezione selezionata
  const sec = document.getElementById(id);
  sec.style.display = 'block';
  // Scroll direttamente alla sezione
  sec.scrollIntoView({ behavior: 'smooth' });
}

function goHome() {
  // Nascondi tutte le sezioni
  document.querySelectorAll('.sezione').forEach(s => s.style.display = 'none');
  // Scrolla alla Home
  document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
}
