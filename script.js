// --- DATABASE PRODOTTI ---
const products = [
  { id: 1, name: "Retro Jordan 1 High Mocha", category: "sneakers", price: "€650", desc: "Iconica silhouette high-top in pelle premium. Colorway esclusiva. Deadstock condition.", img: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, name: "Oversized Heavy Hoodie", category: "hoodies", price: "€320", desc: "Cotone 600gsm pesante. Taglio boxy fit oversize con spalle scese. Lavaggio vintage black.", img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, name: "Tech Cargo Pants V2", category: "pants", price: "€280", desc: "Pantaloni tecnici in nylon ripstop. 6 tasche utility e fit regolabile alla caviglia.", img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, name: "Dunk Low Panda", category: "sneakers", price: "€240", desc: "Il classico streetwear. Bianco e nero, versatile, pelle di alta qualità.", img: "https://images.unsplash.com/photo-1633966887768-64f9a421a7b5?q=80&w=1000&auto=format&fit=crop" },
  { id: 5, name: "Silver Chain Cuban", category: "accessories", price: "€150", desc: "Catena a maglia cubana in acciaio inossidabile placcato argento. Chiusura a scatto industriale.", img: "https://images.unsplash.com/photo-1576020799627-aeac74358708?q=80&w=1000&auto=format&fit=crop" },
  { id: 6, name: "Graffiti Spray Tee", category: "hoodies", price: "€180", desc: "T-shirt bianca oversize con stampa graffiti artistica sul retro. Cotone organico.", img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop" },
  { id: 7, name: "Yeezy Slide Pure", category: "sneakers", price: "€190", desc: "Comfort futuristico. Schiuma EVA iniettata per una leggerezza assoluta.", img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop" },
  { id: 8, name: "Tactical Vest Black", category: "accessories", price: "€210", desc: "Gilet tattico ispirazione military. Multi-pocket, ideale per layering.", img: "https://images.unsplash.com/photo-1559563458-52c695292a74?q=80&w=1000&auto=format&fit=crop" },
  { id: 9, name: "Tracksuit Acetate", category: "pants", price: "€450", desc: "Pantalone tuta in acetato con bande laterali. Stile retro anni 90 rivisitato luxury.", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" },
  { id: 10, name: "Beanie Logo Wool", category: "accessories", price: "€95", desc: "Berretto in lana merino a coste con patch logo gommata frontale.", img: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=1000&auto=format&fit=crop" }
];

// VARIABILI GLOBALI
const homeView = document.getElementById("home-view");
const productView = document.getElementById("single-product-page");
const grid = document.getElementById("products-grid");
const noResults = document.getElementById("no-results");
const searchInput = document.getElementById("searchInput");
const popup = document.getElementById("popup");

// 1. NIGHT MODE CHECK (AUTOMATICO)
function checkDarkMode() {
    const hour = new Date().getHours();
    if (hour >= 19 || hour < 6) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}
checkDarkMode();

// 2. TOGGLE MANUALE
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// 3. GESTIONE RICERCA (ENTER KEY + VIEW SWITCH)
// Aggiungo l'ascolto sul tasto INVIO
searchInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Previene comportamenti strani dei form
        performSearch();
        searchInput.blur(); // Chiude la tastiera su mobile
    }
});

function performSearch() {
    const q = searchInput.value.toLowerCase().trim();
    const found = products.filter(p => p.name.toLowerCase().includes(q) || p.category.includes(q));
    
    // Renderizza i risultati
    renderProducts(found);

    // --- FIX IMPORTANTE: FORZA LA VISTA HOME ---
    // Se l'utente è dentro un prodotto, lo chiude e mostra la griglia risultati
    if (productView.style.display === 'block' || getComputedStyle(productView).display === 'block') {
        productView.style.display = 'none';
        homeView.style.display = 'block';
        window.scrollTo(0, 0); // Torna in cima alla pagina
    }
}

// 4. RENDER & FILTERS
function renderProducts(list) {
    grid.innerHTML = "";
    if (list.length === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
        list.forEach(p => {
            grid.innerHTML += `
                <div class="card" onclick="goToProductPage(${p.id})">
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
    searchInput.value = ""; // Pulisce la ricerca se cambi filtro
    if (cat === 'all') renderProducts(products);
    else renderProducts(products.filter(p => p.category === cat));
}

// 5. NAVIGATION
function goToProductPage(id) {
    const p = products.find(x => x.id === id);
    if(!p) return;

    document.getElementById("detail-img").src = p.img;
    document.getElementById("detail-title").innerText = p.name;
    document.getElementById("detail-category").innerText = p.category;
    document.getElementById("detail-price").innerText = p.price;
    document.getElementById("detail-desc").innerText = p.desc;

    homeView.style.display = 'none';
    productView.style.display = 'block';
    window.scrollTo(0, 0);
    // Aggiorna URL (opzionale, ma utile)
    history.pushState({view: 'product', id: id}, "", `?product=${id}`);
}

function goBackToHome() {
    // Se c'è uno stato nella cronologia, usalo, altrimenti forza la home
    if(history.state && history.state.view === 'product') {
        history.back();
    } else {
        showHomeView();
    }
}

function showHomeView() {
    productView.style.display = 'none';
    homeView.style.display = 'block';
    // Rimuove query string dall'URL per pulizia
    history.replaceState(null, "", window.location.pathname);
}

// Gestione tasto "Indietro" del browser
window.onpopstate = function(event) {
    if (!event.state || event.state.view !== 'product') {
        showHomeView();
    }
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

function goHome() { 
    searchInput.value=""; 
    filterProducts('all'); 
    showHomeView(); // Usa showHomeView per essere sicuri
}

// Init all'avvio
renderProducts(products);
