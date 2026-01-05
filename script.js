// --- DATABASE ---
const products = [
    // TRENDING
    { id: 1, name: "Jordan 1 Retro High OG Chicago L&F", category: "trending", price: 440, img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80", desc: "La colorway Chicago ritorna in versione Reimagined. Condizioni Deadstock (DS) garantite." },
    { id: 2, name: "Travis Scott x Jordan 1 Low Olive", category: "trending", price: 1150, img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=800&q=80", desc: "Ultima release della collaborazione con Cactus Jack. Box speciale incluso." },
    { id: 3, name: "Supreme Box Logo Hoodie Camo", category: "trending", price: 390, img: "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?auto=format&fit=crop&w=800&q=80", desc: "Felpa pesante in cotone con l'iconico logo Supreme ricamato sul petto." },
    { id: 4, name: "Adidas Yeezy Slide Pure", category: "trending", price: 160, img: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=800&q=80", desc: "Il massimo del comfort. Schiuma EVA iniettata. Vestibilità piccola, consigliata una taglia in più." },
    { id: 5, name: "Off-White Industrial Belt Yellow", category: "trending", price: 215, img: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&w=800&q=80", desc: "Cintura iconica gialla e nera. Lunghezza 200cm, regolabile." },

    // CINTURE
    { id: 101, name: "Gucci GG Marmont Black", category: "belts", price: 395, img: "https://images.unsplash.com/photo-1624223032773-772eb0462052?auto=format&fit=crop&w=800&q=80", desc: "Pelle liscia nera con fibbia in ottone anticato." },
    { id: 102, name: "Hermès H Belt Kit Gold", category: "belts", price: 780, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80", desc: "Fibbia H classica su pelle reversibile nera/gold." },
    { id: 104, name: "Ferragamo Gancini Reversible", category: "belts", price: 360, img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80", desc: "Pelle martellata, reversibile nero/marrone scuro." },

    // PORTAFOGLI
    { id: 201, name: "Louis Vuitton Pocket Organizer", category: "wallets", price: 330, img: "https://images.unsplash.com/photo-1627123424574-181ce90b94c0?auto=format&fit=crop&w=800&q=80", desc: "Tela Monogram Eclipse. Slot multipli per carte." },
    { id: 202, name: "Goyard Saint Sulpice Green", category: "wallets", price: 460, img: "https://images.unsplash.com/photo-1628149455676-e8d1a33753c1?auto=format&fit=crop&w=800&q=80", desc: "Colore verde Goyardine. Porta carte iconico." },

    // BORSE
    { id: 301, name: "Prada Re-Nylon Crossbody", category: "bags", price: 920, img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80", desc: "Nylon rigenerato con dettagli in pelle Saffiano. Tracolla regolabile." }
];

document.addEventListener("DOMContentLoaded", () => {
    loadSection('trending');
});

// --- CORE ---
function loadSection(category) {
    document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    
    let title = "";
    let filteredList = [];

    if (category === 'trending') {
        document.getElementById('btn-trending').classList.add('active');
        title = "In Evidenza";
        filteredList = products.filter(p => p.category === 'trending');
    } else if (category === 'belts') {
        document.getElementById('btn-belts').classList.add('active');
        title = "Cinture";
        filteredList = products.filter(p => p.category === 'belts');
    } else if (category === 'wallets') {
        document.getElementById('btn-wallets').classList.add('active');
        title = "Portafogli & SLG";
        filteredList = products.filter(p => p.category === 'wallets');
    } else if (category === 'bags') {
        document.getElementById('btn-bags').classList.add('active');
        title = "Borse & Accessori";
        filteredList = products.filter(p => p.category === 'bags');
    }

    document.getElementById('section-title').innerText = title;
    renderGrid(filteredList);
    
    document.getElementById('main-view').style.display = 'block';
    document.getElementById('single-product-page').style.display = 'none';
    
    // Gestione vuoto
    if (filteredList.length === 0) {
        document.getElementById('no-results').style.display = 'block';
        document.getElementById('products-grid').style.display = 'none';
    } else {
        document.getElementById('no-results').style.display = 'none';
        document.getElementById('products-grid').style.display = 'grid';
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
            <div class="badge-verified">✓ VERIFIED</div>
            <div class="card-img-container">
                <img src="${p.img}" alt="${p.name}">
            </div>
            <div class="card-details">
                <span class="card-sub">Nuovo / DS</span>
                <h3>${p.name}</h3>
                <div class="card-price">€${p.price}</div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    
    document.getElementById('section-title').innerText = `Risultati per "${query}"`;
    document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    
    renderGrid(filtered);
    closeSearchOverlay();
    
    document.getElementById('main-view').style.display = 'block';
    document.getElementById('single-product-page').style.display = 'none';
    
    if (filtered.length === 0) {
        document.getElementById('no-results').style.display = 'block';
        document.getElementById('products-grid').style.display = 'none';
    } else {
        document.getElementById('no-results').style.display = 'none';
        document.getElementById('products-grid').style.display = 'grid';
    }
}

// --- PRODUCT DETAIL ---
function openProduct(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    document.getElementById('detail-img').src = p.img;
    document.getElementById('detail-title').innerText = p.name;
    document.getElementById('detail-desc').innerText = p.desc;
    document.getElementById('detail-price').innerText = "€" + p.price;

    document.getElementById('main-view').style.display = 'none';
    document.getElementById('single-product-page').style.display = 'block';
    window.scrollTo(0,0);
}

function goBackToHome() {
    document.getElementById('single-product-page').style.display = 'none';
    document.getElementById('main-view').style.display = 'block';
}

function goHome() {
    loadSection('trending');
    window.scrollTo(0,0);
}

// --- MODALS ---
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
    const msg = `Sourcing Request:\nItem: ${model}\nSize: ${size}`;
    window.open(`https://ig.me/m/luxury.thread_?text=${encodeURIComponent(msg)}`, "_blank");
    closeSourcingModal();
}

function contactForProduct(type) {
    const title = document.getElementById('detail-title').innerText;
    let msg = type === 'buy' ? `Ciao, voglio acquistare: ${title}` : `Info richiesta: ${title}`;
    document.getElementById('popup-text').innerText = msg;
    document.getElementById('popup').style.display = 'flex';
}
function closePopup() { document.getElementById('popup').style.display = 'none'; }
function openInstagram() { window.open("https://instagram.com/luxury.thread_", "_blank"); closePopup(); }

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Enter Key Search
document.getElementById('searchInput').addEventListener("keyup", function(e) { if (e.key === "Enter") performSearch(); });
