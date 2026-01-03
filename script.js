document.addEventListener("DOMContentLoaded", () => {

  const products = [
    { name:"Signature Leather", category:"scarpe", desc:"Scarpe in pelle premium" },
    { name:"Essential Knit", category:"maglie", desc:"Maglia sartoriale elegante" },
    { name:"Tailored Urban", category:"pantaloni", desc:"Pantaloni moderni" }
  ];

  const container = document.getElementById("products");
  const searchSection = document.getElementById("search-results");
  const results = document.getElementById("results");
  const searchTitle = document.getElementById("search-title");
  const requestBox = document.getElementById("request-box");
  const searchInput = document.getElementById("searchInput");

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

  window.filterProducts = function(cat) {
    searchSection.style.display = "none";
    requestBox.style.display = "none";

    const filtered =
      cat === "all"
        ? products
        : products.filter(p => p.category === cat);

    renderProducts(filtered);
  };

  window.searchProduct = function() {
    const q = searchInput.value.toLowerCase().trim();
    results.innerHTML = "";

    if (q === "") {
      searchSection.style.display = "none";
      requestBox.style.display = "none";
      return;
    }

    const found = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
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
    searchSection.scrollIntoView({ behavior: "smooth" });
  };

  window.sendRequest = function() {
    const product = document.getElementById("requestInput").value.trim();
    const note = document.getElementById("requestNote").value.trim();

    if (!product) {
      alert("Inserisci il nome del prodotto");
      return;
    }

    const message =
      `Ciao Luxury Thread 👋%0A` +
      `Sto cercando questo prodotto:%0A` +
      `👉 ${product}%0A` +
      (note ? `Dettagli:%0A${note}%0A` : "") +
      `%0AGrazie!`;

    window.open(
      `https://ig.me/m/luxury.thread_?text=${message}`,
      "_blank"
    );
  };

  window.goHome = function() {
    searchSection.style.display = "none";
    requestBox.style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  renderProducts(products);
});
