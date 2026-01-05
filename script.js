// --- DATABASE LUXURY ---
const products = [
    // TRENDING
    { id: 1, name: "Jordan 1 High Chicago", category: "trending", price: 1850, img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80", desc: "La sneaker per eccellenza. Condizioni Deadstock verificate." },
    { id: 2, name: "Travis Scott x Jordan 1", category: "trending", price: 1250, img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=800&q=80", desc: "Collaborazione esclusiva. Include tutti gli accessori originali." },
    { id: 3, name: "Supreme Box Logo", category: "trending", price: 450, img: "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?auto=format&fit=crop&w=800&q=80", desc: "L'iconica felpa Supreme. Collezione FW23." },
    { id: 4, name: "Yeezy Slide Pure", category: "trending", price: 140, img: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=800&q=80", desc: "Minimalismo e comfort. Colore Pure." },
    { id: 5, name: "Off-White Belt", category: "trending", price: 210, img: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&w=800&q=80", desc: "Cintura Industrial. Il classico streetwear moderno." },

    // CINTURE
    { id: 101, name: "Gucci GG Marmont", category: "belts", price: 395, img: "https://images.unsplash.com/photo-1624223032773-772eb0462052?auto=format&fit=crop&w=800&q=80", desc: "Pelle di vitello nera con fibbia Doppia G." },
    { id: 102, name: "Hermès H Kit", category: "belts", price: 780, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80", desc: "L'eleganza senza tempo. Reversibile." },
    { id: 103, name: "LV Initiales", category: "belts", price: 450, img: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80", desc: "Tela Damier Graphite iconica." },
    { id: 104, name: "Ferragamo Gancini", category: "belts", price: 350, img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80", desc: "Fibbia Gancini in metallo palladio." },
    { id: 105, name: "Bottega Veneta", category: "belts", price: 550, img: "https://images.unsplash.com/photo-1605763240004-7e93b172d754?auto=format&fit=crop&w=800&q=80", desc: "Lavorazione Intrecciato, firma della maison." },

    // PORTAFOGLI
    { id: 201, name: "LV Pocket Org", category: "wallets", price: 320, img: "https://images.unsplash.com/photo-1627123424574-181ce90b94c0?auto=format&fit=crop&w=800&q=80", desc: "Compatto e funzionale. Monogram Eclipse." },
    { id: 202, name: "Goyard St. Sulpice", category: "wallets", price: 450, img: "https://images.unsplash.com/photo-1628149455676-e8d1a33753c1?auto=format&fit=crop&w=800&q=80", desc: "L'esclusività della tela Goyardine." },
    { id: 203, name: "Prada Saffiano", category: "wallets", price: 480, img: "https://images.unsplash.com/photo-1550523412-40f46c6563e3?auto=format&fit=crop&w=800&q=80", desc: "Pelle Saffiano resistente con logo triangolo." },

    // BORSELLI
    { id: 301, name: "Prada Re-Nylon", category: "bags", price: 890, img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80", desc: "Sostenibilità e lusso. Nylon rigenerato." }
];

document.addEventListener("DOMContentLoaded", () => {
    loadSection('trending');
});

// --- CORE ---
function loadSection(category) {
    document.querySelectorAll('.boutique-nav button').forEach(b => b.classList.remove('active'));
    
    let title = "";
    let filteredList = [];

    if (category === 'trending') {
        document.getElementById('btn-trending').classList.add('active');
        title = "SELEZIONE DEL MESE";
        filteredList = products.filter(p => p.category === 'trending');
    } else if (category === 'belts') {
        document.getElementById('btn-belts').classList.add('active');
        title = "CINTURE DISPONIBILI";
        filteredList = products.filter(p => p.category === 'belts');
    } else if (category === 'wallets') {
        document.getElementById('btn-wallets').classList.add('active');
        title = "PICCOLA PELLETTERIA";
        filteredList = products.filter(p => p.category === 'wallets');
    } else if (category === 'bags') {
        document.getElementById('btn-bags').classList.add('active');
        title = "BORSE E ACCESSORI";
        filteredList = products.filter(p => p.category === 'bags');
    }

    document.getElementById('section-title').innerText = title;
    renderGrid(filteredList);
    
    document.getElementById('main-view').style.display = 'block';
    document.getElementById('single-product-page').style.display = 'none';
    
    const noRes = document.getElementById('no-results');
    const grid = document.getElementById('products-grid');
    if (filteredList.length === 0) {
        noRes.style.display = 'block';
        grid.style.display = 'none';
    } else {
        noRes.style.display = 'none';
        grid.style.display = 'grid';
    }
}

function renderGrid(list) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = "";
    
    list.forEach(p => {
        const card = document.createElement('div');
        card.className = 'prod-card';
        card.onclick = () => openProduct(p.id);
        card.innerHTML = `
            <div class="prod-img-wrap">
                <img src="${p.img}" alt="${p.name}">
            </div>
            <div class="prod-info">
                <span class="prod-cat">${p.category === 'trending' ? 'FEATURED' : 'LUXURY THREAD'}</span>
                <div class="prod-title">${p.name}</div>
                <div class="prod-price">€${p.price}</div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    
    document.getElementById('section-title').innerText = `RISULTATI PER: "${query}"`;
    document.querySelectorAll('.boutique-nav button').forEach(b => b.classList.remove('active'));
    
    renderGrid(filtered);
    closeSearchOverlay();
    
    document.getElementById('main-view').style.display = 'block';
    document.getElementById('single-product-page').style.display = 'none';
}

// --- PRODUCT PAGE & MODALS ---
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

// Overlays
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
    const msg = `Richiesta VIP Sourcing:\nModello: ${model}\nTaglia: ${size}`;
    window.open(`https://ig.me/m/luxury.thread_?text=${encodeURIComponent(msg)}`, "_blank");
    closeSourcingModal();
}

function contactForProduct(type) {
    const title = document.getElementById('detail-title').innerText;
    let msg = type === 'buy' ? `Ciao, desidero acquistare: ${title}` : `Salve, vorrei informazioni su: ${title}`;
    document.getElementById('popup-text').innerText = msg;
    document.getElementById('popup').style.display = 'flex';
}
function closePopup() { document.getElementById('popup').style.display = 'none'; }
function openInstagram() { window.open("https://instagram.com/luxury.thread_", "_blank"); closePopup(); }

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('theme-toggle');
    btn.innerText = document.body.classList.contains('dark-mode') ? "MODALITÀ GIORNO" : "MODALITÀ NOTTE";
}

document.getElementById('searchInput').addEventListener("keyup", function(e) { if (e.key === "Enter") performSearch(); });
