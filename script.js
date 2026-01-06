/* === DATABASE === 
   REGOLE:
   - Trending: 5 Prodotti
   - Belts: 6 Prodotti
   - Wallets: 3 Prodotti
   - Bags: 1 Prodotto
*/
const products = [
    // --- TRENDING (5 ITEMS) ---
    { id: 1, category: 'trending', name: "JORDAN 4 MILITARY BLACK", price: 450, img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800", desc: "Top seller del mese." },
    { id: 2, category: 'trending', name: "CORTEIZ HOODIE", price: 280, img: "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?w=800", desc: "Felpa pesante 100% cotone." },
    { id: 3, category: 'trending', name: "NIKE DUNK PANDA", price: 180, img: "https://images.unsplash.com/photo-1637844527273-df6881478839?w=800", desc: "Classica low top." },
    { id: 4, category: 'trending', name: "STUSSY FLEECE", price: 220, img: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800", desc: "Giacca in pile reversibile." },
    { id: 5, category: 'trending', name: "TRAVIS SCOTT J1", price: 1100, img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=800", desc: "Edizione limitata rara." },

    // --- CINTURE (6 ITEMS) ---
    { id: 6, category: 'belts', name: "DIESEL 1DR", price: 120, img: "https://images.unsplash.com/photo-1559563458-527698bf5295?w=800", desc: "Fibbia logo D." },
    { id: 7, category: 'belts', name: "GUCCI MARMONT", price: 390, img: "https://images.unsplash.com/photo-1624223032773-772eb0462052?w=800", desc: "Pelle nera." },
    { id: 8, category: 'belts', name: "HERMES H", price: 780, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800", desc: "Fibbia gold." },
    { id: 9, category: 'belts', name: "LV INITIALES", price: 490, img: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800", desc: "Monogram canvas." },
    { id: 10, category: 'belts', name: "FERRAGAMO", price: 350, img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800", desc: "Gancini reversible." },
    { id: 11, category: 'belts', name: "BOTTEGA VENETA", price: 450, img: "https://images.unsplash.com/photo-1605763240004-7e93b172d754?w=800", desc: "Intrecciato weave." },

    // --- PORTAFOGLI (3 ITEMS) ---
    { id: 12, category: 'wallets', name: "LV ORGANIZER", price: 320, img: "https://images.unsplash.com/photo-1627123424574-181ce90b94c0?w=800", desc: "Compatto ed elegante." },
    { id: 13, category: 'wallets', name: "GOYARD CARD", price: 450, img: "https://images.unsplash.com/photo-1628149455676-e8d1a33753c1?w=800", desc: "Saint Sulpice." },
    { id: 14, category: 'wallets', name: "PRADA HOLDER", price: 290, img: "https://images.unsplash.com/photo-1550523412-40f46c6563e3?w=800", desc: "Saffiano leather." },

    // --- BORSELLI (1 ITEM) ---
    { id: 15, category: 'bags', name: "PRADA RE-NYLON", price: 1100, img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800", desc: "Iconica tracolla Prada." }
];

/* === INIT === */
document.addEventListener("DOMContentLoaded", () => {
    // Carica la home (trending) di default
    renderGrid('trending');
});

/* === TAB SYSTEM === */
function switchTab(category, btnElement) {
    // 1. Aggiorna stile bottoni
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');

    // 2. Ricarica griglia
    renderGrid(category);
}

function renderGrid(category) {
    const grid = document.getElementById('main-grid');
    grid.innerHTML = ''; // Pulisci

    const items = products.filter(p => p.category === category);

    items.forEach(p => {
        const div = document.createElement('div');
        div.className = 'card';
        div.onclick = () => openModal(p);
        div.innerHTML = `
            <div class="card-img"><img src="${p.img}" alt="${p.name}"></div>
            <div class="card-info">
                <div class="card-name">${p.name}</div>
                <div class="card-price">€${p.price}</div>
            </div>
        `;
        grid.appendChild(div);
    });
}

/* === SEARCH LOGIC (REDIRECT TO HELP) === */
function openSearch() {
    document.getElementById('search-overlay').style.display = 'flex';
    document.getElementById('search-input').focus();
    document.body.style.overflow = 'hidden';
}

function closeSearch() {
    document.getElementById('search-overlay').style.display = 'none';
    document.getElementById('search-results').innerHTML = '';
    document.getElementById('search-input').value = '';
    document.body.style.overflow = 'auto';
}

function performSearch() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const resDiv = document.getElementById('search-results');
    resDiv.innerHTML = '';

    if(query.length < 2) return;

    const found = products.filter(p => p.name.toLowerCase().includes(query));

    if(found.length === 0) {
        // QUI È LA MODIFICA: SE NON TROVA NULLA, MOSTRA BOTTONE PER SOURCING
        resDiv.innerHTML = `
            <div class="no-res-box">
                <p>NESSUN PRODOTTO TROVATO.</p>
                <button onclick="goToSourcingFromSearch()">RICHIEDI PRODOTTO (SOURCING)</button>
            </div>
        `;
    } else {
        found.forEach(p => {
            const div = document.createElement('div');
            div.className = 'card';
            div.onclick = () => { closeSearch(); openModal(p); };
            div.innerHTML = `
                <div class="card-img"><img src="${p.img}"></div>
                <div class="card-info"><div class="card-name">${p.name}</div></div>
            `;
            resDiv.appendChild(div);
        });
    }
}

function goToSourcingFromSearch() {
    closeSearch();
    toggleBot(); // Apre il pannello assistenza
    showSourcing(); // Va diretto al form
}

/* === MODAL & BOT LOGIC === */
const modal = document.getElementById('product-modal');

function openModal(p) {
    document.getElementById('m-img').src = p.img;
    document.getElementById('m-title').innerText = p.name;
    document.getElementById('m-price').innerText = `€${p.price}`;
    document.getElementById('m-desc').innerText = p.desc;
    
    document.getElementById('m-buy-btn').onclick = () => {
        const msg = `Ciao, sono interessato a: ${p.name}`;
        window.open(`https://ig.me/m/luxury.thread_?text=${encodeURIComponent(msg)}`, '_blank');
    };

    modal.style.display = 'flex';
}

function closeModal() { modal.style.display = 'none'; }

// BOT
function toggleBot() {
    const el = document.getElementById('bot-overlay');
    if(el.style.display === 'flex') {
        el.style.display = 'none';
    } else {
        el.style.display = 'flex';
        resetBot();
    }
}
function resetBot() {
    document.getElementById('bot-home').style.display = 'flex';
    document.getElementById('bot-form').style.display = 'none';
}
function showSourcing() {
    document.getElementById('bot-home').style.display = 'none';
    document.getElementById('bot-form').style.display = 'flex';
}
function contactIG() {
    window.open("https://instagram.com/luxury.thread_", "_blank");
}
function sendSourcing() {
    const email = document.getElementById('s-email').value;
    const model = document.getElementById('s-model').value;
    const size = document.getElementById('s-size').value;
    
    if(!email || !model) return alert('Compila i campi.');
    
    window.location.href = `mailto:personal.drop.ship0@gmail.com?subject=SOURCING ${model}&body=Modello: ${model}, Taglia: ${size}, Email: ${email}`;
    toggleBot();
}
