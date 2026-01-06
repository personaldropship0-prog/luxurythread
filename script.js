/* === DATABASE PRODOTTI (NO EMOJIS) === */
const products = [
    // 1. TRENDING
    { category: 'trending', name: "JORDAN 4 MILITARY BLACK", price: 450, img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80" },
    { category: 'trending', name: "CORTEIZ ALCATRAZ HOODIE", price: 280, img: "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?auto=format&fit=crop&w=800&q=80" },
    { category: 'trending', name: "NIKE DUNK LOW PANDA", price: 180, img: "https://images.unsplash.com/photo-1637844527273-df6881478839?auto=format&fit=crop&w=800&q=80" },
    { category: 'trending', name: "STUSSY 8 BALL FLEECE", price: 220, img: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80" },
    { category: 'trending', name: "TRAVIS SCOTT J1 LOW", price: 1100, img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=800&q=80" },

    // 2. CINTURE
    { category: 'belts', name: "DIESEL 1DR BELT", price: 120, img: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=800&q=80" },
    { category: 'belts', name: "GUCCI MARMONT", price: 390, img: "https://images.unsplash.com/photo-1624223032773-772eb0462052?auto=format&fit=crop&w=800&q=80" },
    { category: 'belts', name: "HERMES H BUCKLE", price: 780, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80" },
    { category: 'belts', name: "FERRAGAMO GANCINI", price: 350, img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80" },
    { category: 'belts', name: "BOTTEGA VENETA BELT", price: 450, img: "https://images.unsplash.com/photo-1605763240004-7e93b172d754?auto=format&fit=crop&w=800&q=80" },
    { category: 'belts', name: "LV INITIALES", price: 490, img: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80" },

    // 3. BORSELLINI
    { category: 'wallets', name: "LV POCKET ORGANIZER", price: 320, img: "https://images.unsplash.com/photo-1627123424574-181ce90b94c0?auto=format&fit=crop&w=800&q=80" },
    { category: 'wallets', name: "GOYARD CARD HOLDER", price: 450, img: "https://images.unsplash.com/photo-1628149455676-e8d1a33753c1?auto=format&fit=crop&w=800&q=80" },
    { category: 'wallets', name: "PRADA CARD HOLDER", price: 290, img: "https://images.unsplash.com/photo-1550523412-40f46c6563e3?auto=format&fit=crop&w=800&q=80" },

    // 4. BORSELLI
    { category: 'bags', name: "PRADA RE-NYLON BAG", price: 1100, img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80" },
    { category: 'bags', name: "SUPREME SHOULDER BAG", price: 160, img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80" },
    { category: 'bags', name: "GUCCI MESSENGER", price: 980, img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80" },
];

/* === INIT === */
document.addEventListener("DOMContentLoaded", () => {
    renderCategory('trending', 'grid-trending');
    renderCategory('belts', 'grid-belts');
    renderCategory('wallets', 'grid-wallets');
    renderCategory('bags', 'grid-bags');
});

/* === RENDER LOGIC === */
function renderCategory(cat, elementId) {
    const grid = document.getElementById(elementId);
    if (!grid) return;

    // Filtra prodotti per categoria
    const items = products.filter(p => p.category === cat);
    
    items.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.onclick = () => {
            // Messaggio IG pulito
            const msg = `Salve, sono interessato a: ${p.name}`;
            window.open(`https://ig.me/m/luxury.thread_?text=${encodeURIComponent(msg)}`, '_blank');
        };

        div.innerHTML = `
            <div class="img-box">
                <img src="${p.img}" alt="${p.name}">
            </div>
            <div class="info-box">
                <div class="p-name">${p.name}</div>
                <div class="p-price">€${p.price}</div>
            </div>
        `;
        grid.appendChild(div);
    });
}

/* === SEARCH LOGIC === */
function toggleSearch() {
    const panel = document.getElementById('search-panel');
    const input = document.getElementById('search-input');
    
    if(panel.style.display === 'flex') {
        panel.style.display = 'none';
    } else {
        panel.style.display = 'flex';
        input.focus();
    }
}

function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const allCards = document.querySelectorAll('.product-card');
    let foundCount = 0;

    allCards.forEach(card => {
        const name = card.querySelector('.p-name').innerText.toLowerCase();
        if(name.includes(query)) {
            card.parentElement.style.display = "grid"; // Assicura che la griglia sia visibile
            card.style.display = "block";
            foundCount++;
        } else {
            card.style.display = "none";
        }
    });

    // Gestione visualizzazione sezioni
    const sections = document.querySelectorAll('.section-header');
    const noRes = document.getElementById('no-results');

    if(query.length > 0) {
        // Nascondi titoli sezioni durante la ricerca
        sections.forEach(s => s.style.display = 'none');
        noRes.style.display = (foundCount === 0) ? 'block' : 'none';
    } else {
        // Ripristina tutto
        sections.forEach(s => s.style.display = 'block');
        allCards.forEach(c => c.style.display = 'block');
        noRes.style.display = 'none';
    }
}

/* === BOT LOGIC === */
function toggleBot() {
    const overlay = document.getElementById('bot-overlay');
    if (overlay.style.display === 'block') {
        overlay.style.display = 'none';
    } else {
        overlay.style.display = 'block';
        resetBot();
    }
}

function resetBot() {
    document.getElementById('bot-menu').style.display = 'flex';
    document.getElementById('bot-sourcing').style.display = 'none';
}

function showSourcing() {
    document.getElementById('bot-menu').style.display = 'none';
    document.getElementById('bot-sourcing').style.display = 'flex';
}

function openIG() {
    window.open("https://instagram.com/luxury.thread_", "_blank");
}

function sendMail() {
    const email = document.getElementById('src-email').value;
    const model = document.getElementById('src-model').value;
    const size = document.getElementById('src-size').value;

    if (!email || !model) {
        alert("INSERISCI EMAIL E MODELLO.");
        return;
    }

    const recipient = "personal.drop.ship0@gmail.com";
    const subject = `RICHIESTA SOURCING: ${model}`;
    const body = `RICHIESTA SOURCING\n\nMODELLO: ${model}\nTAGLIA: ${size}\nEMAIL: ${email}`;

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    toggleBot();
}
