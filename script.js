const products = [
  { name: "Signature Leather", category: "scarpe", description: "Scarpe in pelle premium" },
  { name: "Essential Knit", category: "maglie", description: "Maglia sartoriale elegante" },
  { name: "Tailored Urban", category: "pantaloni", description: "Pantaloni moderni" }
];

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".sezione").forEach(s => s.style.display = "none");
});

function showSection(id, event) {
  if (event) event.preventDefault();
  hideAll();
  document.getElementById(id).style.display = "block";
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

function goHome() {
  hideAll();
  document.getElementById("home").scrollIntoView({ behavior: "smooth" });
}

function hideAll() {
  document.querySelectorAll(".sezione").forEach(s => s.style.display = "none");
}

function searchProduct() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const results = products.filter(p =>
    p.name.toLowerCase().includes(input) ||
    p.category.toLowerCase().includes(input)
  );

  hideAll();

  const container = document.getElementById("results-container");
  const title = document.getElementById("search-title");
  container.innerHTML = "";

  if (results.length === 0) {
    title.innerText = "Prodotto non trovato";
    container.innerHTML = "<p style='margin-top:20px'>Nessun risultato. Prova un altro termine.</p>";
  } else {
    title.innerText = "Risultati ricerca";
    results.forEach(p => {
      container.innerHTML += `
        <div class="card">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <a class="btn" href="#">Contattaci su Instagram</a>
        </div>
      `;
    });
  }

  document.getElementById("search-results").style.display = "block";
  document.getElementById("search-results").scrollIntoView({ behavior: "smooth" });
}
