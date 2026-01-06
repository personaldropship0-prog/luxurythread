// --- DATABASE ---
const products = [
    // 1. TRENDING (I pezzi forti: J4, Hoodies, etc.)
    { category: 'trending', name: "JORDAN 4 MILITARY BLACK", price: 450, img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80" },
    { category: 'trending', name: "CORTEIZ ALCATRAZ HOODIE", price: 280, img: "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?auto=format&fit=crop&w=600&q=80" },
    { category: 'trending', name: "NIKE DUNK LOW PANDA", price: 180, img: "https://images.unsplash.com/photo-1637844527273-df6881478839?auto=format&fit=crop&w=600&q=80" },
    { category: 'trending', name: "STUSSY 8 BALL FLEECE", price: 220, img: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=600&q=80" },

    // 2. CINTURE (Belts)
    { category: 'belts', name: "DIESEL 1DR BELT", price: 120, img: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=600&q=80" },
    { category: 'belts', name: "GUCCI MARMONT", price: 390, img: "https://images.unsplash.com/photo-1624223032773-772eb0462052?auto=format&fit=crop&w=600&q=80" },
    { category: 'belts', name: "HERMES H BUCKLE", price: 780, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80" },
    { category: 'belts', name: "FERRAGAMO GANCINI", price: 350, img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=600&q=80" },

    // 3. BORSELLINI (Wallets)
    { category: 'wallets', name: "LV POCKET ORGANIZER", price: 320, img: "https://images.unsplash.com/photo-1627123424574-181ce90b94c0?auto=format&fit=crop&w=600&q=80" },
    { category: 'wallets', name: "GOYARD CARD HOLDER", price: 450, img: "https://images.unsplash.com/photo-1628149455676-e8d1a33753c1?auto=format&fit=crop&w=600&q=80" },
    { category: 'wallets', name: "PRADA CARD HOLDER", price: 290, img: "https://images.unsplash.com/photo-1550523412-40f46c6563e3?auto=format&fit=crop&w=600&q=80" },

    // 4. BORSELLI (Bags)
    { category: 'bags', name: "PRADA RE-NYLON BAG", price: 1100, img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=600&q=80" },
    { category: 'bags', name: "SUPREME SHOULDER BAG", price: 160, img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=600&q=80" },
    { category: 'bags', name: "GUCCI MESSENGER", price: 980, img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80" },
];

// --- INIT ---
document.addEventListener("DOMContentLoaded", () => {
    renderCategory('trending', 'grid-trending');
    renderCategory('belts', 'grid-belts');
    renderCategory('wallets', 'grid-wallets');
    renderCategory('bags', 'grid-bags');
});

// Funzione Render
function renderCategory(cat, elementId) {
    const grid = document.getElementById(elementId);
    if (!grid) return;

    const items = products.filter(p => p.category === cat);
    
    items.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.onclick = () => {
            // Cliccando il prodotto si va su IG col messaggio precompilato
            const msg = `Ciao, sono interessato a: ${p.name}`;
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

// --- BOT LOGIC ---
function toggleBot() {
    const overlay = document.getElementById('bot-overlay');
    const btn = document.getElementById('bot-btn');
    
    if (overlay.style.display === 'block') {
        overlay.style.display = 'none';
        btn.style.opacity = '1';
    } else {
        overlay.style.display = 'block';
        btn.style.opacity = '0'; // Nascondi il bottone sotto
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
        alert("Inserisci Email e Modello.");
        return;
    }

    const recipient = "personal.drop.ship0@gmail.com";
    const subject = `SOURCING REQUEST: ${model}`;
    const body = `Ciao Luxury Thread,\n\nRichiesta Sourcing VIP.\n\nMODELLO: ${model}\nTAGLIA: ${size}\n\nCONTATTO EMAIL: ${email}`;

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    toggleBot();
}
