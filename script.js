// --- DATABASE 10 PRODOTTI STREETWEAR LUXURY ---
const products = [
  { 
    id: 1, 
    name: "Retro Jordan 1 High", 
    category: "sneakers", 
    price: "€650",
    desc: "Iconica silhouette high-top in pelle premium. Colorway esclusiva 'Mocha'. Deadstock condition.", 
    img: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: 2, 
    name: "Oversized Heavy Hoodie", 
    category: "hoodies", 
    price: "€320",
    desc: "Cotone 600gsm pesante. Taglio boxy fit oversize con spalle scese. Lavaggio vintage black.", 
    img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: 3, 
    name: "Tech Cargo Pants V2", 
    category: "pants", 
    price: "€280",
    desc: "Pantaloni tecnici in nylon ripstop. 6 tasche utility e fit regolabile alla caviglia. Water resistant.", 
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: 4, 
    name: "Dunk Low Panda", 
    category: "sneakers", 
    price: "€240",
    desc: "Il classico streetwear. Bianco e nero, versatile, pelle di alta qualità. Must have.", 
    img: "https://images.unsplash.com/photo-1633966887768-64f9a421a7b5?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: 5, 
    name: "Silver Chain Cuban", 
    category: "accessories", 
    price: "€150",
    desc: "Catena a maglia cubana in acciaio inossidabile placcato argento. Chiusura a scatto industriale.", 
    img: "https://images.unsplash.com/photo-1576020799627-aeac74358708?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: 6, 
    name: "Graffiti Spray Tee", 
    category: "hoodies", 
    price: "€180",
    desc: "T-shirt bianca oversize con stampa graffiti artistica sul retro. Cotone organico.", 
    img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: 7, 
    name: "Yeezy Slide Pure", 
    category: "sneakers", 
    price: "€190",
    desc: "Comfort futuristico. Schiuma EVA iniettata per una leggerezza assoluta. Colore sabbia.", 
    img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: 8, 
    name: "Tactical Vest Black", 
    category: "accessories", 
    price: "€210",
    desc: "Gilet tattico ispirazione military. Multi-pocket, ideale per layering su hoodie.", 
    img: "https://images.unsplash.com/photo-1559563458-52c695292a74?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: 9, 
    name: "Tracksuit Acetate", 
    category: "pants", 
    price: "€450",
    desc: "Pantalone tuta in acetato con bande laterali. Stile retro anni 90 rivisitato luxury.", 
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: 10, 
    name: "Beanie Logo Wool", 
    category: "accessories", 
    price: "€95",
    desc: "Berretto in lana merino a coste con patch logo gommata frontale. Caldo e minimal.", 
    img: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=1000&auto=format&fit=crop" 
  }
];

// --- LOGICA IDENTICA AL CODICE ORIGINALE ---

const grid = document.getElementById("products");
const searchSection = document.getElementById("search-results");
const resultsDiv = document.getElementById("results");
const requestBox = document.getElementById("request-box");
const searchTitle = document.getElementById("search-title");

// Render iniziale
function renderProducts(list, target = grid) {
  target.innerHTML = "";
  list.forEach(p => {
    target.innerHTML += `
      <div class="card" onclick="openModal(${p.id})">
        <img src="${p.img}" class="card-img" alt="${p.name}">
        <div class="card-details">
          <h3>${p.name}</h3>
          <div class="price">${p.price}</div>
        </div>
      </div>
    `;
  });
}

// Filtri
function filterProducts(cat) {
  document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  
  searchSection.style.display = 'none';
  grid.style.display = 'grid';

  if(cat === 'all') renderProducts(products);
  else renderProducts(products.filter(p => p.category === cat));
}

// Ricerca
function searchProduct() {
  const q = document.getElementById("searchInput").value.toLowerCase();
  grid.style.display = 'none';
  searchSection.style.display = 'block';
  
  const found = products.filter(p => p.name.toLowerCase().includes(q) || p.category.includes(q));
  
  if(found.length > 0) {
    searchTitle.innerText = "RISULTATI:";
    requestBox.style.display = 'none';
    renderProducts(found, resultsDiv);
  } else {
    searchTitle.innerText = "NESSUN RISULTATO";
    resultsDiv.innerHTML = "";
    requestBox.style.display = 'block';
  }
}

function goHome() {
  grid.style.display = 'grid';
  searchSection.style.display = 'none';
  document.getElementById("searchInput").value = "";
  renderProducts(products);
}

// Modal
const modal = document.getElementById("product-modal");
function openModal(id) {
  const p = products.find(x => x.id === id);
  document.getElementById("modal-img-src").src = p.img;
  document.getElementById("modal-title").innerText = p.name;
  document.getElementById("modal-category").innerText = p.category;
  document.getElementById("modal-price").innerText = p.price;
  document.getElementById("modal-desc").innerText = p.desc;
  modal.classList.add("open");
}
function closeProductModal() { modal.classList.remove("open"); }

// Contact & Popup
function contactForProduct() {
  const name = document.getElementById("modal-title").innerText;
  const price = document.getElementById("modal-price").innerText;
  copyText(`Ciao! Vorrei acquistare: ${name} (${price})`);
}

function showRequestPopup() {
  const item = document.getElementById("requestInput").value;
  const note = document.getElementById("requestNote").value;
  copyText(`Richiesta Sourcing:\nProdotto: ${item}\nNote: ${note}`);
}

function copyText(text) {
  document.getElementById("popup-text").innerText = text;
  document.getElementById("popup").style.display = 'flex';
}

function copyAndOpenInstagram() {
  navigator.clipboard.writeText(document.getElementById("popup-text").innerText).then(() => {
    window.open("https://ig.me/m/luxury.thread_", "_blank");
    document.getElementById("popup").style.display = 'none';
  });
}

function closePopup() { document.getElementById("popup").style.display = 'none'; }

// Init
renderProducts(products);
