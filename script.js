// --- DATABASE PRODOTTI (CON STATUS) ---
const products = [
  { id: 1, name: "Retro Jordan 1 High Mocha", category: "sneakers", price: "€650", status: "new", desc: "Iconica silhouette high-top in pelle premium. Colorway esclusiva.", img: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, name: "Oversized Heavy Hoodie", category: "hoodies", price: "€320", status: "available", desc: "Cotone 600gsm pesante. Taglio boxy fit oversize.", img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, name: "Tech Cargo Pants V2", category: "pants", price: "€280", status: "sold_out", desc: "Pantaloni tecnici in nylon ripstop. 6 tasche utility.", img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, name: "Dunk Low Panda", category: "sneakers", price: "€240", status: "available", desc: "Il classico streetwear. Bianco e nero, versatile.", img: "https://images.unsplash.com/photo-1633966887768-64f9a421a7b5?q=80&w=1000&auto=format&fit=crop" },
  { id: 5, name: "Silver Chain Cuban", category: "accessories", price: "€150", status: "available", desc: "Catena a maglia cubana in acciaio inossidabile.", img: "https://images.unsplash.com/photo-1576020799627-aeac74358708?q=80&w=1000&auto=format&fit=crop" },
  { id: 6, name: "Graffiti Spray Tee", category: "hoodies", price: "€180", status: "new", desc: "T-shirt bianca oversize con stampa graffiti artistica.", img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop" },
  { id: 7, name: "Yeezy Slide Pure", category: "sneakers", price: "€190", status: "sold_out", desc: "Comfort futuristico. Schiuma EVA iniettata.", img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop" },
  { id: 8, name: "Tactical Vest Black", category: "accessories", price: "€210", status: "available", desc: "Gilet tattico ispirazione military. Multi-pocket.", img: "https://images.unsplash.com/photo-1559563458-52c695292a74?q=80&w=1000&auto=format&fit=crop" },
  { id: 9, name: "Tracksuit Acetate", category: "pants", price: "€450", status: "available", desc: "Pantalone tuta in acetato con bande laterali.", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" },
  { id: 10, name: "Beanie Logo Wool", category: "accessories", price: "€95", status: "available", desc: "Berretto in lana merino a coste con patch logo.", img: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=1000&auto=format&fit=crop" }
];

const homeView = document.getElementById("home-view");
const productView = document.getElementById("single-product-page");
const grid = document.getElementById("products-grid");
const noResults = document.getElementById("no-results");
const searchInput = document.getElementById("searchInput");
const popup = document.getElementById("popup");

// 1. NIGHT MODE CHECK
function checkDarkMode() {
    const hour = new Date().getHours();
    if (hour >= 19 || hour < 6) document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
}
checkDarkMode();

// 2. TOGGLE MANUALE
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// 3. GESTIONE RICERCA (ENTER KEY)
searchInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        performSearch();
        searchInput.blur();
    }
});

function performSearch() {
    const q = searchInput.value.toLowerCase().trim();
    const found = products.filter(p => p.name.toLowerCase().includes(q) || p.category.includes(q));
    
    // Mostra risultati
    renderProducts(found);
    
    // Chiudi pagina prodotto se aperta e torna in cima
    if (productView.style.display === 'block' || getComputedStyle(productView).display === 'block') {
        productView.style.display = 'none';
        homeView.style.display = 'block';
    }
    window.scrollTo(0, 0);
}

// 4. RENDER & FILTERS (CON ANIMAZIONI E BADGE)
function renderProducts(list) {
    grid.innerHTML = "";
    if (list.length === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
        list.forEach((p, index) => {
            
            let badgeHTML = "";
            let soldClass = "";
            let clickAction = `onclick="goToProductPage(${p.id})"`;
            
            if (p.status === "new") {
                badgeHTML = `<div class="status-badge badge-new">NEW DROP</div>`;
            } else if (p.status === "sold_out") {
                badgeHTML = `<div class="status-badge badge-sold">SOLD OUT</div>`;
                soldClass = "is-sold-out";
                clickAction = ""; // Disabilita click
            }

            // Animazione cascata (delay incrementale)
            let animStyle = `animation-delay: ${index * 0.1}s`;

            grid.innerHTML += `
                <div class="card ${soldClass}" ${clickAction} style="${animStyle}">
                    ${badgeHTML}
                    <img src="${p.img}" class="card-img" alt="${p.name}">
                    <div class="card-details">
                        <h3>${p.name}</h3>
                        <div class="price">${p.price}</div>
                    </div>
                </div>
            `;
        });
    }
}

function filterProducts(cat) {
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    searchInput.value = ""; 
    if (cat === 'all') renderProducts(products);
    else renderProducts(products.filter(p => p.category === cat));
}

// 5. NAVIGATION
function goToProductPage(id) {
    const p = products.find(x => x.id === id);
    if(!p || p.status === 'sold_out') return; 

    document.getElementById("detail-img").src = p.img;
    document.getElementById("detail-title").innerText = p.name;
    document.getElementById("detail-category").innerText = p.category;
    document.getElementById("detail-price").innerText = p.price;
    document.getElementById("detail-desc").innerText = p.desc;

    homeView.style.display = 'none';
    productView.style.display = 'block';
    window.scrollTo(0, 0);
    history.pushState({view: 'product', id: id}, "", `?product=${id}`);
}

function goBackToHome() {
    if(history.state && history.state.view === 'product') history.back();
    else showHomeView();
}

function showHomeView() {
    productView.style.display = 'none';
    homeView.style.display = 'block';
    history.replaceState(null, "", window.location.pathname);
}

window.onpopstate = function(event) {
    if (!event.state || event.state.view !== 'product') showHomeView();
};

// 6. CONTACTS & SOURCING
function contactForProduct(type) {
    const name = document.getElementById("detail-title").innerText;
    const price = document.getElementById("detail-price").innerText;
    let msg = type === 'buy' ? 
        `Ciao! Voglio acquistare: ${name} (${price}).` : 
        `Ciao! Cerco informazioni su: ${name}.`;
    
    document.getElementById("popup-text").innerText = msg;
    popup.style.display = 'flex';
}

function contactForSourcing() {
    const searchTerm = searchInput.value;
    let msg = `Ciao! Sto cercando "${searchTerm}" ma non è sul sito. Potete trovarlo?`;
    if(searchTerm === "") msg = "Ciao! Vorrei fare una richiesta di sourcing per un prodotto.";
    document.getElementById("popup-text").innerText = msg;
    popup.style.display = 'flex';
}

function openInstagram() {
    navigator.clipboard.writeText(document.getElementById("popup-text").innerText).then(() => {
        window.open("https://ig.me/m/luxury.thread_", "_blank");
        popup.style.display = 'none';
    });
}
function closePopup() { popup.style.display = 'none'; }
function goHome() { searchInput.value=""; filterProducts('all'); showHomeView(); }

// Init
renderProducts(products);
