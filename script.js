// --- DATABASE STREET ---
const products = [
    // TRENDING (I 5 Pezzi Forti per la Home)
    { id: 1, name: "Jordan 1 High Chicago L&F", category: "trending", price: 450, img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80", desc: "La silhouette più iconica. Reimagined series. Condizioni DS." },
    { id: 2, name: "Travis Scott x Jordan 1 Low", category: "trending", price: 1250, img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=800&q=80", desc: "Reverse Mocha. Box speciale e lacci extra inclusi." },
    { id: 3, name: "Supreme Box Logo Hoodie", category: "trending", price: 380, img: "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?auto=format&fit=crop&w=800&q=80", desc: "FW23 Camo Edition. Heavyweight cotton crossgrain fleece." },
    { id: 4, name: "Yeezy Slide Pure", category: "trending", price: 140, img: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=800&q=80", desc: "EVA Foam construction. Massima comodità." },
    { id: 5, name: "Off-White Industrial Belt", category: "trending", price: 210, img: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&w=800&q=80", desc: "Yellow/Black iconic belt. 200cm length." },

    // CINTURE
    { id: 101, name: "Gucci GG Marmont", category: "belts", price: 395, img: "https://images.unsplash.com/photo-1624223032773-772eb0462052?auto=format&fit=crop&w=800&q=80", desc: "Pelle nera liscia con fibbia GG ottone." },
    { id: 102, name: "Hermès H Belt", category: "belts", price: 780, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80", desc: "Kit Reversibile Black/Gold 32mm." },
    { id: 103, name: "LV Initiales", category: "belts", price: 450, img: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80", desc: "Damier Graphite Canvas." },
    { id: 104, name: "Ferragamo Gancini", category: "belts", price: 350, img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80", desc: "Reversibile Nero/Hickory." },
    { id: 105, name: "Bottega Intrecciato", category: "belts", price: 550, img: "https://images.unsplash.com/photo-1605763240004-7e93b172d754?auto=format&fit=crop&w=800&q=80", desc: "Pelle intrecciata a mano. Parakeet Green." },

    // PORTAFOGLI
    { id: 201, name: "LV Pocket Organizer", category: "wallets", price: 320, img: "https://images.unsplash.com/photo-1627123424574-181ce90b94c0?auto=format&fit=crop&w=800&q=80", desc: "Monogram Eclipse. Compatto." },
    { id: 202, name: "Goyard Saint Sulpice", category: "wallets", price: 450, img: "https://images.unsplash.com/photo-1628149455676-e8d1a33753c1?auto=format&fit=crop&w=800&q=80", desc: "Classic Chevron pattern." },
    { id: 203, name: "Prada Saffiano Wallet", category: "wallets", price: 480, img: "https://images.unsplash.com/photo-1550523412-40f46c6563e3?auto=format&fit=crop&w=800&q=80", desc: "Pelle Saffiano Nera con logo triangolo." },

    // BORSELLI
    { id: 301, name: "Prada Re-Nylon Bag", category: "bags", price: 890, img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80", desc: "Tracolla in nylon rigenerato e pelle Saffiano." }
];

document.addEventListener("DOMContentLoaded", () => {
    loadSection('trending');
});

// --- CORE ---
function loadSection(category) {
    document.querySelectorAll('.nav-pill').forEach(b => b.classList.remove('active'));
    
    let title = "";
    let filteredList = [];

    if (category === 'trending') {
        document.getElementById('btn-trending').classList.add('active');
        title = "LATEST DROPS";
        filteredList = products.filter(p => p.category === 'trending');
    } else if (category === 'belts') {
        document.getElementById('btn-belts').classList.add('active');
        title = "CINTURE // BELTS";
        filteredList = products.filter(p => p.category === 'belts');
    } else if (category === 'wallets') {
        document.getElementById('btn-wallets').classList.add('active');
        title = "PORTAFOGLI // SLG";
        filteredList = products.filter(p => p.category === 'wallets');
    } else if (category === 'bags') {
        document.getElementById('btn-bags').classList.add('active');
        title = "BORSE // BAGS";
        filteredList = products.filter(p => p.category === 'bags');
    }

    document.getElementById('section-title').innerText = title;
    renderGrid(filteredList);
    
    document.getElementById('main-view').style.display = 'block';
    document.getElementById('single-product-page').style.display = 'none';
    
    // Gestione No Results
    document.getElementById('no-results').style.display = (filteredList.length === 0) ? 'block' : 'none';
    document.getElementById('products-grid').style.display = (filteredList.length === 0) ? 'none' : 'grid';
}

function renderGrid(list) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = "";
    
    list.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => openProduct(p.id);
        card.innerHTML = `
            <div class="card-img-wrap">
                <img src="${p.img}" alt="${p.name}">
            </div>
            <div class="card-info">
                <span class="card-cat">LT // ${p.category.toUpperCase()}</span>
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
    
    document.getElementById('section-title').innerText = `SEARCH: "${query}"`;
    document.querySelectorAll('.nav-pill').forEach(b => b.classList.remove('active'));
    
    renderGrid(filtered);
    closeSearchOverlay();
    
    const noRes = document.getElementById('no-results');
    const grid = document.getElementById('products-grid');
    
    if (filtered.length === 0) {
        noRes.style.display = 'block';
        grid.style.display = 'none';
    } else {
        noRes.style.display = 'none';
        grid.style.display = 'grid';
    }
    
    goBackToHome(false); // Stay on main view
}

// --- NAV & MODALS ---
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

function goBackToHome(reset = true) {
    document.getElementById('single-product-page').style.display = 'none';
    document.getElementById('main-view').style.display = 'block';
    if(reset) window.scrollTo(0,0);
}

function goHome() {
    loadSection('trending');
    window.scrollTo(0,0);
}

// Overlay Functions
function openSearchOverlay() {
    const ov = document.getElementById('search-overlay');
    ov.style.display = 'flex';
    setTimeout(() => document.getElementById('searchInput').focus(), 100);
}
function closeSearchOverlay() { document.getElementById('search-overlay').style.display = 'none'; }

function openSourcingModal() { document.getElementById('sourcing-modal').style.display = 'flex'; }
function closeSourcingModal() { document.getElementById('sourcing-modal').style.display = 'none'; }

function sendSourcingRequest() {
    const model = document.getElementById('src-model').value;
    const size = document.getElementById('src-size').value;
    if(!model) return;
    const msg = `SOURCING REQUEST:\nModel: ${model}\nSize: ${size}`;
    window.open(`https://ig.me/m/luxury.thread_?text=${encodeURIComponent(msg)}`, "_blank");
    closeSourcingModal();
}

function contactForProduct(type) {
    const title = document.getElementById('detail-title').innerText;
    let msg = type === 'buy' ? `WTB (Buy Request): ${title}` : `INFO Request: ${title}`;
    document.getElementById('popup-text').innerText = msg;
    document.getElementById('popup').style.display = 'flex';
}
function closePopup() { document.getElementById('popup').style.display = 'none'; }
function openInstagram() { window.open("https://instagram.com/luxury.thread_", "_blank"); closePopup(); }

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('theme-btn');
    if (document.body.classList.contains('dark-mode')) {
        btn.innerText = "DARK_MODE [ON]";
    } else {
        btn.innerText = "DARK_MODE [OFF]";
    }
}

document.getElementById('searchInput').addEventListener("keyup", function(e) { if (e.key === "Enter") performSearch(); });
