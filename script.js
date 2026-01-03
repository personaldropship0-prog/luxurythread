document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.sezione').forEach(s => s.style.display = 'none');
});

function showSection(id, event) {
  if(event) event.preventDefault();
  document.querySelectorAll('.sezione').forEach(s => s.style.display = 'none');
  const sec = document.getElementById(id);
  sec.style.display = 'block';
  sec.scrollIntoView({ behavior: 'smooth' });
}

function goHome() {
  document.querySelectorAll('.sezione').forEach(s => s.style.display = 'none');
  document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
}
