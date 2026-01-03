const products = [
  { name:"Signature Leather", category:"scarpe", desc:"Scarpe in pelle premium" },
  { name:"Essential Knit", category:"maglie", desc:"Maglia sartoriale elegante" },
  { name:"Tailored Urban", category:"pantaloni", desc:"Pantaloni moderni" }
];

const container = document.getElementById("products");
const searchSection = document.getElementById("search-results");
const results = document.getElementById("results");
const searchTitle = document.getElementById("search-title");

function renderProducts(list) {
  container.innerHTML = "";
  list.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <a href="https://ig.me/m/luxury.thread_" target="_blank">
          Contattaci su Instagram
        </a>
      </div>
    `;
  });
}

function filterProducts(cat) {
  searchSection.style.display = "none";
  const filtered = cat === "all" ? products : products.filter(p => p.category === cat);
  renderProducts(filtered);
}

function searchProduct() {
  const q = document.getElementById("searchInput").value.toLowerCase();
  const found = products.filter(p =>
    p.name.toLowerCase().includes(q) || p.category.includes(q)
  );

  results.innerHTML = "";
  if(found.length === 0) {
    searchTitle.innerText = "Prodotto non trovato";
  } else {
    searchTitle.innerText = "Risultati ricerca";
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
  searchSection.scrollIntoView({behavior:"smooth"});
}

function goHome() {
  searchSection.style.display = "none";
  window.scrollTo({top:0,behavior:"smooth"});
}

renderProducts(products);
