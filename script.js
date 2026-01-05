// --- DATABASE PRODOTTI ---
// Ho tenuto solo i prodotti necessari per le sezioni richieste
const products = [
    // TRENDING (Questi appaiono nella HOME)
    { id: 1, name: "Jordan 1 High Chicago", category: "trending", price: 1850, img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80", desc: "Condizioni DS." },
    { id: 2, name: "Travis Scott x Jordan 1 Low", category: "trending", price: 1200, img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=800&q=80", desc: "Mocha colorway invertita." },
    { id: 3, name: "Supreme Box Logo Camo", category: "trending", price: 450, img: "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?auto=format&fit=crop&w=800&q=80", desc: "FW23 release." },
    { id: 4, name: "Yeezy Slide Pure", category: "trending", price: 140, img: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=800&q=80", desc: "Comfort assoluto." },
    { id: 5, name: "Off-White Industrial Belt", category: "trending", price: 220, img: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&w=800&q=80", desc: "Gialla iconica." },

    // CINTURE (6 Prodotti)
    { id: 101, name: "Gucci GG Marmont", category: "belts", price: 395, img: "https://images.unsplash.com/photo-1624223032773-772eb0462052?auto=format&fit=crop&w=800&q=80", desc: "Pelle nera." },
    { id: 102, name: "Hermès H Belt Kit", category: "belts", price: 780, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80", desc: "Reversibile Black/Gold." },
    { id: 103, name: "LV Initiales Damier", category: "belts", price: 450, img: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80", desc: "Tela Damier Graphite." },
    { id: 104, name: "Ferragamo Gancini", category: "belts", price: 350, img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80", desc: "Reversibile." },
    { id: 105, name: "Bottega Veneta", category: "belts", price: 550, img: "https://images.unsplash.com/photo-1605763240004-7e93b172d754?auto=format&fit=crop&w=800&q=80", desc: "Pelle intrecciata." },
    { id: 106, name: "Diesel 1DR Belt", category: "belts", price: 120, img: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=800&q=80", desc: "Logo D in metallo." },

    // PORTAFOGLI (3 Prodotti)
    { id: 201, name: "LV Pocket Organizer", category: "wallets", price: 320, img: "https://images.unsplash.com/photo-1627123424574-181ce90b94c0?auto=format&fit=crop&w=800&q=80", desc: "Monogram Eclipse." },
    { id: 202, name: "Goyard Saint Sulpice", category: "wallets", price: 450, img: "https://images.unsplash.com/photo-1628149455676-e8d1a33753c1?auto=format&fit=crop&w=800&q=80", desc: "Tela Goyardine." },
    { id: 203, name: "Prada Saffiano", category: "wallets", price: 480, img: "https://images.unsplash.com/photo-1550523412-40f46c6563e3?auto=format&fit=crop&w=800&q=80", desc: "Pelle Saffiano nera." },

    // BORSELLI (1 Prodotto)
    { id: 301, name: "Prada Re-Nylon", category: "bags", price: 690, img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80", desc: "Nylon rigenerato." }
];

// INIT
document.addEventListener("DOMContentLoaded", () => {
    loadSection('trending'); // Carica la home di default
    
    // Header effect on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 50) {
            header.style.background = "rgba(255,255,255,0.98)";
            header.style.padding = "10px 30px";
        } else {
            header.style.background = "rgba(255,255,255,0.9)";
            header.style.padding = "15px 30px";
        }
    });
});

// --- CORE LOGIC ---
function loadSection(category) {
    // 1. Reset Active Button
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    
    // 2. Set Title & Filter Logic
    let title = "";
    let filteredList = [];

    if (category === 'trending') {
        document.getElementById('btn-trending').classList.add('active');
        title = "DI TENDENZA ADESSO";
        filteredList = products.filter(p => p.category === 'trending');
    } else if (category === 'belts') {
        document.getElementById('btn-belts').classList.add('active');
        title = "CINTURE DISPONIBILI";
        filteredList = products.filter(p => p.category === 'belts');
    } else if (category === 'wallets') {
        document.getElementById('btn-wallets').classList.add('active');
        title = "PORTAFOGLI";
        filteredList = products.filter(p => p.category === 'wallets');
    } else if (category === 'bags') {
        document.getElementById('btn-bags').classList.add('active');
        title = "BORSELLI";
        filteredList = products.filter(p => p.category === 'bags');
    }

    // 3. Render
    document.getElementById('current-section-title').innerText = title;
    renderGrid(filteredList);
    
    // Reset Views
    document.getElementById('main-view').style.display = 'block';
    document.getElementById('single-product-page').style.display = 'none';
    
    // Handle No Results
    const noRes = document.getElementById('no-results');
    noRes.style.display = (filteredList.length === 0) ? 'block' : 'none';
}

function renderGrid(list) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = ""; // Clean
    
    list.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openProduct(p.id);
        card.innerHTML = `
            <img src="${p.img}" class="card-img" alt="${p.name}">
            <div class="card-details">
                <h3>${p.name}</h3>
                <div class="price">€${p.price}</div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    
    document.getElementById('current-section-title').innerText = "RISULTATI RICERCA";
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    
    renderGrid(filtered);
    closeSearchOverlay();
    
    const noRes = document.getElementById('no-results');
    noRes.style.display = (filtered.length === 0) ? 'block' : 'none';
    goBackToHome();
}

// --- NAVIGATION & MODALS ---
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

function openSearchOverlay() {
    document.getElementById('search-overlay').classList.add('active');
    setTimeout(() => document.getElementById('searchInput').focus(), 100);
}
function closeSearchOverlay() {
    document.getElementById('search-overlay').classList.remove('active');
}

// Sourcing & Instagram
function openSourcingModal() { document.getElementById('sourcing-modal').style.display = 'flex'; }
function closeSourcingModal() { document.getElementById('sourcing-modal').style.display = 'none'; }
function sendSourcingRequest() {
    const model = document.getElementById('src-model').value;
    const size = document.getElementById('src-size').value;
    if(!model) return;
    const msg = `Richiesta VIP Sourcing: ${model} (Taglia: ${size})`;
    window.open(`https://ig.me/m/luxury.thread_?text=${encodeURIComponent(msg)}`, "_blank");
    closeSourcingModal();
}

function contactForProduct(type) {
    const title = document.getElementById('detail-title').innerText;
    let msg = type === 'buy' ? `Ciao, voglio acquistare: ${title}` : `Ciao, info su: ${title}`;
    document.getElementById('popup-text').innerText = msg;
    document.getElementById('popup').style.display = 'flex';
}
function closePopup() { document.getElementById('popup').style.display = 'none'; }
function openInstagram() { window.open("https://instagram.com/luxury.thread_", "_blank"); closePopup(); }

// Enter key for search
document.getElementById('searchInput').addEventListener("keyup", function(e) { if (e.key === "Enter") performSearch(); });
