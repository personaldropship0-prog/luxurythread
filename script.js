// --- DATABASE ---
const products = [
    // TRENDING
    { id: 1, name: "Jordan 1 Chicago", category: "trending", price: 1850, img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80", desc: "La sneaker che ha iniziato tutto. Condizioni Deadstock." },
    { id: 2, name: "Travis Scott Low", category: "trending", price: 1200, img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=800&q=80", desc: "Reverse Mocha. Edizione limitata." },
    { id: 3, name: "Supreme Box Logo", category: "trending", price: 450, img: "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?auto=format&fit=crop&w=800&q=80", desc: "FW23 Camo Edition." },
    { id: 4, name: "Yeezy Slide", category: "trending", price: 140, img: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=800&q=80", desc: "Pure Colorway." },
    { id: 5, name: "Off-White Belt", category: "trending", price: 220, img: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&w=800&q=80", desc: "Industrial Yellow." },

    // CINTURE
    { id: 101, name: "Gucci Marmont", category: "belts", price: 395, img: "https://images.unsplash.com/photo-1624223032773-772eb0462052?auto=format&fit=crop&w=800&q=80", desc: "GG Black Leather." },
    { id: 102, name: "Hermès Kit", category: "belts", price: 780, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80", desc: "H Buckle Gold/Black." },
    { id: 103, name: "LV Damier", category: "belts", price: 450, img: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80", desc: "Graphite Canvas." },
    { id: 104, name: "Ferragamo", category: "belts", price: 350, img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80", desc: "Gancini Reversible." },
    { id: 105, name: "Bottega Veneta", category: "belts", price: 550, img: "https://images.unsplash.com/photo-1605763240004-7e93b172d754?auto=format&fit=crop&w=800&q=80", desc: "Intrecciato Parakeet." },
    { id: 106, name: "Diesel 1DR", category: "belts", price: 120, img: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=800&q=80", desc: "D Logo Leather." },

    // PORTAFOGLI
    { id: 201, name: "LV Organizer", category: "wallets", price: 320, img: "https://images.unsplash.com/photo-1627123424574-181ce90b94c0?auto=format&fit=crop&w=800&q=80", desc: "Pocket Eclipse." },
    { id: 202, name: "Goyard Holder", category: "wallets", price: 450, img: "https://images.unsplash.com/photo-1628149455676-e8d1a33753c1?auto=format&fit=crop&w=800&q=80", desc: "Saint Sulpice Green." },
    { id: 203, name: "Prada Wallet", category: "wallets", price: 480, img: "https://images.unsplash.com/photo-1550523412-40f46c6563e3?auto=format&fit=crop&w=800&q=80", desc: "Saffiano Triangle." },

    // BORSELLI
    { id: 301, name: "Prada Re-Nylon", category: "bags", price: 690, img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80", desc: "Crossbody Black." }
];

// --- INIT ---
document.addEventListener("DOMContentLoaded", () => {
    loadSection('trending');
});

// --- LOGIC ---
function loadSection(category) {
    document.querySelectorAll('.category-nav li').forEach(b => b.classList.remove('active'));
    
    let title = "";
    let filteredList = [];

    if (category === 'trending') {
        document.getElementById('btn-trending').classList.add('active');
        title = "DI TENDENZA";
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
        title = "BORSE / BORSELLI";
        filteredList = products.filter(p => p.category === 'bags');
    }

    document.getElementById('current-section-title').innerText = title;
    renderGrid(filteredList);
    
    document.getElementById('main-view').style.display = 'block';
    document.getElementById('single-product-page').style.display = 'none';
    
    const noRes = document.getElementById('no-results');
    noRes.style.display = (filteredList.length === 0) ? 'block' : 'none';
}

function renderGrid(list) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = "";
    
    list.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openProduct(p.id);
        card.innerHTML = `
            <img src="${p.img}" class="card-img" alt="${p.name}">
            <h3>${p.name}</h3>
            <div class="price">€${p.price}</div>
        `;
        grid.appendChild(card);
    });
}

function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    
    document.getElementById('current-section-title').innerText = "RISULTATI RICERCA";
    document.querySelectorAll('.category-nav li').forEach(b => b.classList.remove('active'));
    
    renderGrid(filtered);
    closeSearchOverlay();
    
    const noRes = document.getElementById('no-results');
    noRes.style.display = (filtered.length === 0) ? 'block' : 'none';
    
    document.getElementById('single-product-page').style.display = 'none';
    document.getElementById('main-view').style.display = 'block';
}

// --- PRODUCT & NAV ---
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

// --- OVERLAYS ---
function openSearchOverlay() {
    document.getElementById('search-overlay').classList.add('active');
    setTimeout(() => document.getElementById('searchInput').focus(), 100);
}
function closeSearchOverlay() {
    document.getElementById('search-overlay').classList.remove('active');
}

function openSourcingModal() { document.getElementById('sourcing-modal').style.display = 'flex'; }
function closeSourcingModal() { document.getElementById('sourcing-modal').style.display = 'none'; }
function sendSourcingRequest() {
    const model = document.getElementById('src-model').value;
    const size = document.getElementById('src-size').value;
    if(!model) return;
    const msg = `VIP Request: ${model} Size: ${size}`;
    window.open(`https://ig.me/m/luxury.thread_?text=${encodeURIComponent(msg)}`, "_blank");
    closeSourcingModal();
}

function contactForProduct(type) {
    const title = document.getElementById('detail-title').innerText;
    let msg = type === 'buy' ? `Ciao, interessato a: ${title}` : `Info su: ${title}`;
    document.getElementById('popup-text').innerText = msg;
    document.getElementById('popup').style.display = 'flex';
}
function closePopup() { document.getElementById('popup').style.display = 'none'; }
function openInstagram() { window.open("https://instagram.com/luxury.thread_", "_blank"); closePopup(); }

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('theme-toggle');
    if (document.body.classList.contains('dark-mode')) {
        btn.innerText = "MODALITÀ CHIARA";
    } else {
        btn.innerText = "MODALITÀ SCURA";
    }
}

// Event Listeners
document.getElementById('searchInput').addEventListener("keyup", function(e) { if (e.key === "Enter") performSearch(); });
