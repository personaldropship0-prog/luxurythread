// --- DATABASE BOUTIQUE ---
const products = [
    // TRENDING
    { id: 1, name: "Jordan 1 Retro High Chicago", category: "trending", price: 1850, img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80", desc: "Lost & Found Edition. La sneaker che ha fatto la storia. Condizioni: Nuovo/DS con scatola originale e scontrino." },
    { id: 2, name: "Travis Scott x Jordan 1 Low", category: "trending", price: 1250, img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=800&q=80", desc: "Reverse Mocha. La collaborazione più desiderata dell'anno. Include set di lacci extra." },
    { id: 3, name: "Supreme Box Logo Hoodie", category: "trending", price: 450, img: "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?auto=format&fit=crop&w=800&q=80", desc: "FW23 Camo. Cotone pesante, vestibilità oversize. Un classico dello streetwear." },
    { id: 4, name: "Yeezy Slide Pure", category: "trending", price: 140, img: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=800&q=80", desc: "Massimo comfort con schiuma EVA iniettata. Taglia piccola, si consiglia una misura in più." },
    
    // CINTURE
    { id: 101, name: "Gucci GG Marmont Belt", category: "belts", price: 395, img: "https://images.unsplash.com/photo-1624223032773-772eb0462052?auto=format&fit=crop&w=800&q=80", desc: "Pelle nera con fibbia ottonata. Altezza 4cm. Scatola e dustbag incluse." },
    { id: 102, name: "Hermès H Belt Kit", category: "belts", price: 780, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80", desc: "Reversibile Nero/Gold. Fibbia spazzolata. Il massimo dell'eleganza." },
    { id: 103, name: "LV Initiales Damier", category: "belts", price: 450, img: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80", desc: "Damier Graphite Canvas. Interno in pelle nubuck. Classico moderno." },
    
    // PORTAFOGLI
    { id: 201, name: "LV Pocket Organizer", category: "wallets", price: 320, img: "https://images.unsplash.com/photo-1627123424574-181ce90b94c0?auto=format&fit=crop&w=800&q=80", desc: "Tela Monogram Eclipse. 3 tasche per carte, 5 tasche interne." },
    { id: 202, name: "Goyard Saint Sulpice", category: "wallets", price: 450, img: "https://images.unsplash.com/photo-1628149455676-e8d1a33753c1?auto=format&fit=crop&w=800&q=80", desc: "Colore verde iconico. Tela Goyardine dipinta a mano." },
    
    // BORSE
    { id: 301, name: "Prada Re-Nylon Bag", category: "bags", price: 890, img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80", desc: "Tracolla in nylon rigenerato con dettagli in pelle Saffiano. Logo triangolo smaltato." }
];

document.addEventListener("DOMContentLoaded", () => {
    loadSection('trending');
});

function loadSection(category) {
    document.querySelectorAll('.cat-nav button').forEach(b => b.classList.remove('active'));
    
    let title = "";
    let filteredList = [];

    if (category === 'trending') {
        document.getElementById('btn-trending').classList.add('active');
        title = "NUOVI ARRIVI & BEST SELLER";
        filteredList = products.filter(p => p.category === 'trending');
    } else if (category === 'belts') {
        document.getElementById('btn-belts').classList.add('active');
        title = "COLLEZIONE CINTURE";
        filteredList = products.filter(p => p.category === 'belts');
    } else if (category === 'wallets') {
        document.getElementById('btn-wallets').classList.add('active');
        title = "ACCESSORI & SLG";
        filteredList = products.filter(p => p.category === 'wallets');
    } else if (category === 'bags') {
        document.getElementById('btn-bags').classList.add('active');
        title = "BORSE & ZAINI";
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
        card.className = 'product-card';
        card.onclick = () => openProduct(p.id);
        card.innerHTML = `
            <div class="card-img">
                <img src="${p.img}" alt="${p.name}">
            </div>
            <span class="card-brand">LUXURY THREAD</span>
            <div class="card-title">${p.name}</div>
            <div class="stars">★★★★★</div>
            <div class="card-price">€${p.price}</div>
        `;
        grid.appendChild(card);
    });
}

function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    
    document.getElementById('section-title').innerText = `RISULTATI PER: "${query}"`;
    document.querySelectorAll('.cat-nav button').forEach(b => b.classList.remove('active'));
    
    renderGrid(filtered);
    closeSearchOverlay();
    
    document.getElementById('main-view').style.display = 'block';
    document.getElementById('single-product-page').style.display = 'none';
    
    // Se siamo nel single product, torniamo indietro per vedere i risultati
    window.scrollTo(0, document.getElementById('products-grid').offsetTop - 100);
}

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

function scrollToGrid() {
    document.getElementById('products-grid').scrollIntoView({ behavior: 'smooth' });
}

// OVERLAYS
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
    const msg = `RICHIESTA VIP:\nModello: ${model}\nTaglia: ${size}`;
    window.open(`https://ig.me/m/luxury.thread_?text=${encodeURIComponent(msg)}`, "_blank");
    closeSourcingModal();
}

function contactForProduct(type) {
    const title = document.getElementById('detail-title').innerText;
    let msg = type === 'buy' ? `Buongiorno, vorrei acquistare: ${title}` : `Buongiorno, info su: ${title}`;
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
