// --- DATABASE LUXURY THREAD (Technical) ---
const products = [
    // HIGHLIGHTS
    { id: 1, name: "Jordan 1 High Chicago L&F", category: "trending", price: 440, img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80", desc: "Modello iconico High-top. Pelle pieno fiore. Colorazione originale Chicago. Box e accessori originali inclusi." },
    { id: 2, name: "Travis Scott x Jordan 1 Low", category: "trending", price: 1150, img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=800&q=80", desc: "Collaborazione esclusiva. Swoosh inverso. Lacci cerati inclusi. Condizioni perfette (Deadstock)." },
    { id: 3, name: "Supreme Box Logo Hoodie", category: "trending", price: 390, img: "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?auto=format&fit=crop&w=800&q=80", desc: "Cotone Heavyweight Crossgrain. Ricamo Box Logo frontale. Vestibilità regolare." },
    { id: 4, name: "Yeezy Slide Pure", category: "trending", price: 160, img: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=800&q=80", desc: "Schiuma EVA iniettata. Suola dentellata per trazione. Comfort superiore. Si consiglia una taglia in più." },

    // ACCESSORI
    { id: 101, name: "Gucci GG Marmont Belt", category: "belts", price: 395, img: "https://images.unsplash.com/photo-1624223032773-772eb0462052?auto=format&fit=crop&w=800&q=80", desc: "Pelle liscia nera. Fibbia Doppia G in ottone anticato. Larghezza 4cm." },
    { id: 201, name: "LV Pocket Organizer", category: "wallets", price: 330, img: "https://images.unsplash.com/photo-1627123424574-181ce90b94c0?auto=format&fit=crop&w=800&q=80", desc: "Tela Monogram Eclipse. Fodera in vacchetta. 3 fessure per carte di credito. 5 tasche interne." },
    { id: 301, name: "Prada Re-Nylon Bag", category: "bags", price: 920, img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80", desc: "Nylon rigenerato. Dettagli in pelle Saffiano. Logo triangolo smaltato. Tracolla regolabile in nastro." }
];

document.addEventListener("DOMContentLoaded", () => {
    loadSection('trending');
});

function loadSection(category) {
    document.querySelectorAll('.filter-link').forEach(b => b.classList.remove('active'));
    
    let title = "";
    let filteredList = [];

    if (category === 'trending') {
        document.getElementById('btn-trending').classList.add('active');
        title = "HIGHLIGHTS";
        filteredList = products.filter(p => p.category === 'trending');
    } else if (category === 'belts') {
        document.getElementById('btn-belts').classList.add('active');
        title = "CINTURE";
        filteredList = products.filter(p => p.category === 'belts');
    } else if (category === 'wallets') {
        document.getElementById('btn-wallets').classList.add('active');
        title = "ACCESSORI";
        filteredList = products.filter(p => p.category === 'wallets');
    } else if (category === 'bags') {
        document.getElementById('btn-bags').classList.add('active');
        title = "BORSE";
        filteredList = products.filter(p => p.category === 'bags');
    }

    document.getElementById('section-title').innerText = title;
    document.getElementById('item-count').innerText = filteredList.length + " ARTICOLI";
    
    renderGrid(filteredList);
    
    document.getElementById('main-view').style.display = 'block';
    document.getElementById('single-product-page').style.display = 'none';
    document.getElementById('hero').style.display = category === 'trending' ? 'flex' : 'none';

    if(filteredList.length === 0){
        document.getElementById('products-grid').style.display = 'none';
        document.getElementById('no-results').style.display = 'block';
    } else {
        document.getElementById('products-grid').style.display = 'grid';
        document.getElementById('no-results').style.display = 'none';
    }
}

function renderGrid(list) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = "";
    
    list.forEach(p => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.onclick = () => openProduct(p.id);
        card.innerHTML = `
            <div class="img-wrapper">
                <img src="${p.img}" alt="${p.name}">
            </div>
            <div class="card-info">
                <span class="card-brand">LUXURY THREAD</span>
                <div class="card-title">${p.name}</div>
                <div class="card-price">€${p.price}</div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    
    document.getElementById('section-title').innerText = "RISULTATI RICERCA: " + query.toUpperCase();
    document.getElementById('item-count').innerText = filtered.length + " ARTICOLI";
    document.getElementById('hero').style.display = 'none';
    
    renderGrid(filtered);
    closeSearchOverlay();
    
    document.getElementById('main-view').style.display = 'block';
    document.getElementById('single-product-page').style.display = 'none';
    
    if(filtered.length === 0){
        document.getElementById('products-grid').style.display = 'none';
        document.getElementById('no-results').style.display = 'block';
    } else {
        document.getElementById('products-grid').style.display = 'grid';
        document.getElementById('no-results').style.display = 'none';
    }
}

function openProduct(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    document.getElementById('detail-img').src = p.img;
    document.getElementById('detail-title').innerText = p.name;
    document.getElementById('detail-desc').innerText = p.desc;
    document.getElementById('detail-price').innerText = "€" + p.price;
    document.getElementById('bread-name').innerText = p.name;

    document.getElementById('main-view').style.display = 'none';
    document.getElementById('hero').style.display = 'none';
    document.getElementById('single-product-page').style.display = 'block';
    window.scrollTo(0,0);
}

function goBackToHome() {
    document.getElementById('single-product-page').style.display = 'none';
    document.getElementById('main-view').style.display = 'block';
    // Mostra hero solo se siamo in trending
    if(document.getElementById('btn-trending').classList.contains('active')){
         document.getElementById('hero').style.display = 'flex';
    }
}

function goHome() {
    loadSection('trending');
    window.scrollTo(0,0);
}

function scrollToGrid() {
    document.getElementById('main-view').scrollIntoView({ behavior: 'smooth' });
}

// Modals
function openSearchOverlay() {
    document.getElementById('search-overlay').style.display = 'flex';
    setTimeout(() => document.getElementById('searchInput').focus(), 100);
}
function closeSearchOverlay() { document.getElementById('search-overlay').style.display = 'none'; }

function openSourcingModal() { document.getElementById('sourcing-modal').style.display = 'flex'; }
function closeSourcingModal() { document.getElementById('sourcing-modal').style.display = 'none'; }

function sendSourcingRequest() {
    const model = document.getElementById('src-model').value;
    const size = document.getElementById('src-size').value;
    if(!model) return;
    
    // Messaggio pulito
    const msg = `RICHIESTA SOURCING\nMODELLO: ${model}\nTAGLIA: ${size}`;
    window.open(`https://ig.me/m/luxury.thread_?text=${encodeURIComponent(msg)}`, "_blank");
    closeSourcingModal();
}

function contactForProduct(type) {
    const title = document.getElementById('detail-title').innerText;
    let msg = type === 'buy' ? `RICHIESTA ACQUISTO: ${title}` : `RICHIESTA INFORMAZIONI: ${title}`;
    
    document.getElementById('popup-text').innerText = msg;
    document.getElementById('popup').style.display = 'flex';
}
function closePopup() { document.getElementById('popup').style.display = 'none'; }
function openInstagram() { window.open("https://instagram.com/luxury.thread_", "_blank"); closePopup(); }

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('theme-btn');
    btn.innerText = document.body.classList.contains('dark-mode') ? "MODALITÀ CHIARA" : "MODALITÀ SCURA";
}

document.getElementById('searchInput').addEventListener("keyup", function(e) { if (e.key === "Enter") performSearch(); });
