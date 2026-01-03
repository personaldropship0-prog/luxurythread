const products = [
  { name:"Signature Leather", category:"scarpe", desc:"Scarpe in pelle premium" },
  { name:"Essential Knit", category:"maglie", desc:"Maglia sartoriale elegante" },
  { name:"Tailored Urban", category:"pantaloni", desc:"Pantaloni moderni" }
];

const hero = document.getElementById("hero");
const filters = document.getElementById("filters");
const container = document.getElementById("products");
const searchSection = document.getElementById("search-results");
const results = document.getElementById("results");
const searchTitle = document.getElementById("search-title");
const requestBox = document.getElementById("request-box");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");

// Render prodotti
function renderProducts(list, category="all") {
  container.dataset.category = category;
  container.innerHTML = "";
  list.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <button onclick="goHome()">← Torna alla Home</button>
      </div>
    `;
  });
}

// Filtri
function filterProducts(cat) {
  hero.style.display = "none";
  filters.style.display = "none";
  searchSection.style.display = "none";

  const list = cat === "all" ? products : products.filter(p => p.category === cat);
  renderProducts(list, cat);
  container.scrollIntoView({ behavior: "smooth" });
}

// Ricerca
function searchProduct() {
  const q = document.getElementById("searchInput").value.toLowerCase().trim();
  results.innerHTML = "";

  hero.style.display = "none";
  filters.style.display = "none";

  const found = products.filter(p =>
    p.name.toLowerCase().includes(q) || p.category.includes(q)
  );

  if(found.length === 0) {
    searchTitle.innerText = "Prodotto non disponibile";
    requestBox.style.display = "block";
  } else {
    searchTitle.innerText = "Risultati ricerca";
    requestBox.style.display = "none";
    found.forEach(p => {
      results.innerHTML += `
        <div class="card">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <button onclick="goHome()">← Torna alla Home</button>
        </div>
      `;
    });
  }

  searchSection.style.display = "block";
  searchSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Mostra popup richiesta
function showRequestPopup() {
  const product = document.getElementById("requestInput").value.trim();
  const note = document.getElementById("requestNote").value.trim();

  if(!product) { alert("Inserisci il nome del prodotto"); return; }

  const message = `Ciao Luxury Thread 👋\nSto cercando questo prodotto:\n👉 ${product}${note ? `\nNote:\n${note}` : ''}\nGrazie!`;

  popupText.innerText = message;
  popup.style.display = "flex";
}

// Copia e apri Instagram
function copyAndOpenInstagram() {
  const text = popupText.innerText;
  navigator.clipboard.writeText(text).then(() => {
    window.open("https://ig.me/m/luxury.thread_", "_blank");
    closePopup();
  });
}

// Chiudi popup
function closePopup() { popup.style.display = "none"; }

// Torna home
function goHome() {
  hero.style.display = "flex";
  filters.style.display = "flex";
  searchSection.style.display = "none";
  requestBox.style.display = "none";
  popup.style.display = "none";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Render iniziale
renderProducts(products);
