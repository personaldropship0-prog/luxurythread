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

function renderProducts(list) {
  container.innerHTML = "";
  list.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <button onclick="goHome()">← Torna alla Home</button>
        <a href="https://ig.me/m/luxury.thread_?text=${encodeURIComponent("Ciao Luxury Thread! Vorrei informazioni su: " + p.name)}" target="_blank">Instagram</a>
      </div>
    `;
  });
}

function filterProducts(cat) {
  hero.style.display = "none";
  filters.style.display = "none";
  searchSection.style.display = "none";

  const list = cat === "all" ? products : products.filter(p => p.category === cat);
  renderProducts(list);
  container.scrollIntoView({ behavior: "smooth" });
}

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
          <a href="https://ig.me/m/luxury.thread_?text=${encodeURIComponent("Ciao Luxury Thread! Vorrei informazioni su: " + p.name)}" target="_blank">Instagram</a>
        </div>
      `;
    });
  }

  searchSection.style.display = "block";
  searchSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function sendRequest() {
  const product = document.getElementById("requestInput").value.trim();
  const note = document.getElementById("requestNote").value.trim();

  if(!product) { alert("Inserisci il nome del prodotto"); return; }

  const message = `Ciao Luxury Thread 👋%0ASto cercando questo prodotto:%0A👉 ${encodeURIComponent(product)}${note ? `%0ANote:%0A${encodeURIComponent(note)}` : ''}%0AGrazie!`;

  if(navigator.userAgent.includes("Mobi")) {
    // mobile → apre Instagram con DM pronto
    window.open(`https://ig.me/m/luxury.thread_?text=${message}`, "_blank");
  } else {
    // desktop → copia testo e mostra popup
    navigator.clipboard.writeText(decodeURIComponent(message)).then(() => {
      popupText.innerText = decodeURIComponent(message);
      popup.style.display = "flex";
      window.open("https://www.instagram.com/direct/inbox/", "_blank");
    });
  }
}

function closePopup() {
  popup.style.display = "none";
}

function goHome() {
  hero.style.display = "flex";
  filters.style.display = "flex";
  searchSection.style.display = "none";
  requestBox.style.display = "none";
  popup.style.display = "none";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

renderProducts(products);
