// DATI PRODOTTI
const products = [
  { name: "Signature Leather", category: "scarpe", desc: "Scarpe in pelle premium" },
  { name: "Essential Knit", category: "maglie", desc: "Maglia sartoriale elegante" },
  { name: "Tailored Urban", category: "pantaloni", desc: "Pantaloni moderni" }
];

// ELEMENTI DOM
const container = document.getElementById("products");
const searchSection = document.getElementById("search-results");
const results = document.getElementById("results");
const searchTitle = document.getElementById("search-title");
const requestBox = document.getElementById("request-box");

// RENDER
function renderProducts(list) {
  container.innerHTML = "";
  list.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <a href="https://ig.me/m/luxury.thread_" target="_blank">Instagram</a>
      </div>
    `;
  });
}

// FILTRI
function filterProducts(cat) {
  searchSection.style.display = "none";
  requestBox.style.display = "none";

  if (cat === "all") {
    renderProducts(products);
  } else {
    renderProducts(products.filter(p => p.category === cat));
  }
}

// CERCA
function searchProduct() {
  const q = document.getElementById("searchInput").value.toLowerCase();
  results.innerHTML = "";

  const found = products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.includes(q)
  );

  if (found.length === 0) {
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
        </div>
      `;
    });
  }

  searchSection.style.display = "block";
}

// RICHIESTA
function sendRequest() {
  const product = document.getElementById("requestInput").value;
  const note = document.getElementById("requestNote").value;

  const text =
    `Ciao Luxury Thread 👋%0A` +
    `Sto cercando:%0A👉 ${product}%0A${note}`;

  window.open(`https://ig.me/m/luxury.thread_?text=${text}`, "_blank");
}

// HOME
function goHome() {
  searchSection.style.display = "none";
  window.scrollTo(0,0);
}

// INIT
renderProducts(products);
