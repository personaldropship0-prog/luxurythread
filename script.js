// --- DATABASE URBAN ARMOUR ---
const products = [
    // LATEST / TRENDING
    { id: 1, name: "JORDAN 1 HIGH CHICAGO L&F", category: "trending", price: 440, img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80", desc: "ICONIC SILHOUETTE. REIMAGINED SERIES. DEADSTOCK CONDITION. INCLUDES ORIGINAL BOX AND LACES." },
    { id: 2, name: "TRAPSTAR SHOOTERS TRACKSUIT", category: "trending", price: 280, img: "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?auto=format&fit=crop&w=800&q=80", desc: "BLACKOUT EDITION. CHENILLE LOGO DECODED. HEAVYWEIGHT COTTON BLEND." },
    { id: 3, name: "NIKE NOCTA GLIDE BLACK", category: "trending", price: 220, img: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=800&q=80", desc: "DRAKE COLLABORATION. ZOOM FLIGHT INSPIRED. 3M REFLECTIVE DETAILS." },
    { id: 4, name: "CORTEIZ ALCATRAZ HOODIE", category: "trending", price: 250, img: "https://images.unsplash.com/photo-1556906781-9a412961d28c?auto=format&fit=crop&w=800&q=80", desc: "RULES THE WORLD. GREY/BLACK COLORWAY. LIMITED DROP RELEASE." },
    { id: 5, name: "YEEZY SLIDE ONYX", category: "trending", price: 150, img: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=800&q=80", desc: "PURE EVA FOAM. TEXTURED SURFACE. SIZE UP RECOMMENDED." },

    // BELTS
    { id: 101, name: "LV INITIALES 40MM", category: "belts", price: 450, img: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80", desc: "DAMIER GRAPHITE CANVAS. MATTE BLACK BUCKLE." },
    { id: 102, name: "FERRAGAMO GANCINI REV", category: "belts", price: 360, img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80", desc: "REVERSIBLE LEATHER. BLACK AND HICKORY. ADJUSTABLE." },

    // ACCESSORIES (Wallets)
    { id: 201, name: "GOYARD SAINT SULPICE", category: "wallets", price: 460, img: "https://images.unsplash.com/photo-1628149455676-e8d1a33753c1?auto=format&fit=crop&w=800&q=80", desc: "GREEN CHEVRON CANVAS. 4 CARD SLOTS. CENTRAL POCKET." },
    
    // BAGS
    { id: 301, name: "SUPREME SHOULDER BAG", category: "bags", price: 180, img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80", desc: "CORDURA FABRIC. WATER RESISTANT. BOX LOGO PATCH." }
];

document.addEventListener("DOMContentLoaded", () => {
    loadSection('trending');
});

// --- NAVIGATION & GRID ---
function loadSection(category) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    
    let title = "";
    let filteredList = [];

    if (category === 'trending') {
        document.getElementById('btn-trending').classList.add('active');
        title = "LATEST ARRIVALS";
        filteredList = products.filter(p => p.category === 'trending');
    } else if (category === 'belts') {
        document.getElementById('btn-belts').classList.add('active');
        title = "BELTS & STRAPS";
        filteredList = products.filter(p => p.category === 'belts');
    } else if (category === 'wallets') {
        document.getElementById('btn-wallets').classList.add('active');
        title = "SMALL LEATHER GOODS";
        filteredList = products.filter(p => p.category === 'wallets');
    } else if (category === 'bags') {
        document.getElementById('btn-bags').classList.add('active');
        title = "BAGS & CARRIERS";
        filteredList = products.filter(p => p.category === 'bags');
    }

    document.getElementById('section-title').innerText = title;
    renderGrid(filteredList);
    
    // Switch View
    document.getElementById('main-view').style.display = 'block';
    document.getElementById('single-product-page').style.display = 'none';
    
    // Empty State Handling
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
        card.className = 'prod-card';
        card.onclick = () => openProduct(p.id);
        card.innerHTML = `
            <div class="prod-img">
                <img src="${p.img}" alt="${p.name}">
            </div>
            <div class="prod-info">
                <h4>${p.name}</h4>
                <p>DS / NEW</p>
                <div class="prod-price">€${p.price}</div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function scrollToGrid() {
    const grid = document.querySelector('.cat-scroller');
    grid.scrollIntoView({behavior: 'smooth'});
}

// --- SEARCH ENGINE ---
function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    
    document.getElementById('section-title').innerText = `SEARCH: ${query.toUpperCase()}`;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    
    renderGrid(filtered);
    closeSearchOverlay();
    
    document.getElementById('main-view').style.display = 'block';
    document.getElementById('single-product-page').style.display = 'none';
    scrollToGrid();

    if(filtered.length === 0){
        document.getElementById('products-grid').style.display = 'none';
        document.getElementById('no-results').style.display = 'block';
    } else {
        document.getElementById('products-grid').style.display = 'grid';
        document.getElementById('no-results').style.display = 'none';
    }
}

// --- PRODUCT DETAILS ---
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

// --- INTERACTION & MODALS ---
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
    
    // No Emojis here
    const msg = `STOCK REQUEST - URGENT\nMODEL: ${model}\nSIZE: ${size}`;
    window.open(`https://ig.me/m/luxury.thread_?text=${encodeURIComponent(msg)}`, "_blank");
    closeSourcingModal();
}

function contactForProduct(type) {
    const title = document.getElementById('detail-title').innerText;
    let msg = "";
    if(type === 'buy') {
        msg = `I WANT TO BUY: ${title}`;
    } else {
        msg = `INFO REQUEST: ${title}`;
    }
    
    document.getElementById('popup-text').innerText = msg;
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() { document.getElementById('popup').style.display = 'none'; }
function openInstagram() { window.open("https://instagram.com/luxury.thread_", "_blank"); closePopup(); }

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('theme-btn');
    if(document.body.classList.contains('dark-mode')){
        btn.innerText = "VIEW: LIGHT";
    } else {
        btn.innerText = "VIEW: DARK";
    }
}

// Keyboard Listener
document.getElementById('searchInput').addEventListener("keyup", function(e) { if (e.key === "Enter") performSearch(); });
