// --- DATI PRODOTTI ---
// Aggiungo il campo 'description' per la scheda prodotto
const products = [
    // 1. TRENDING
    { 
        id: 1, category: 'trending', name: "JORDAN 4 MILITARY BLACK", price: 450, 
        img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
        desc: "L'iconica Jordan 4 nella colorazione Military Black. Pelle premium, dettagli in mesh e comfort superiore. Un must-have per ogni collezionista."
    },
    { 
        id: 2, category: 'trending', name: "CORTEIZ HOODIE GREY", price: 280, 
        img: "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?auto=format&fit=crop&w=800&q=80",
        desc: "Felpa Corteiz originale. Tessuto pesante di alta qualità, stampa Alcatraz sul petto. Vestibilità boxy fit."
    },
    { 
        id: 3, category: 'trending', name: "NIKE DUNK LOW PANDA", price: 180, 
        img: "https://images.unsplash.com/photo-1637844527273-df6881478839?auto=format&fit=crop&w=800&q=80",
        desc: "La scarpa più venduta dell'anno. Colorazione Black & White versatile per ogni outfit."
    },

    // 2. CINTURE
    { 
        id: 4, category: 'belts', name: "DIESEL 1DR BELT", price: 120, 
        img: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=800&q=80",
        desc: "Cintura Diesel con fibbia logo D. Pelle liscia nera, hardware argento. Taglia regolabile."
    },
    { 
        id: 5, category: 'belts', name: "GUCCI MARMONT", price: 390, 
        img: "https://images.unsplash.com/photo-1624223032773-772eb0462052?auto=format&fit=crop&w=800&q=80",
        desc: "Classica cintura Gucci GG Marmont. Pelle nera martellata, fibbia ottone anticato."
    },

    // 3. BORSELLINI
    { 
        id: 6, category: 'wallets', name: "LV POCKET ORGANIZER", price: 320, 
        img: "https://images.unsplash.com/photo-1627123424574-181ce90b94c0?auto=format&fit=crop&w=800&q=80",
        desc: "Portacarte Louis Vuitton compatto ed elegante. Canvas Monogram Eclipse. Vari scomparti."
    },
    { 
        id: 7, category: 'wallets', name: "GOYARD CARD HOLDER", price: 450, 
        img: "https://images.unsplash.com/photo-1628149455676-e8d1a33753c1?auto=format&fit=crop&w=800&q=80",
        desc: "Card holder Goyard Saint Sulpice. L'iconico pattern Goyardine dipinto a mano."
    },

    // 4. BORSELLI
    { 
        id: 8, category: 'bags', name: "PRADA RE-NYLON BAG", price: 1100, 
        img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80",
        desc: "Borsa a tracolla Prada in Re-Nylon. Logo triangolare smaltato. Design minimalista e funzionale."
    },
];

// --- INIZIALIZZAZIONE ---
document.addEventListener("DOMContentLoaded", () => {
    loadGrid('trending', 'grid-trending');
    loadGrid('belts', 'grid-belts');
    loadGrid('wallets', 'grid-wallets');
    loadGrid('bags', 'grid-bags');
});

function loadGrid(cat, elementId) {
    const grid = document.getElementById(elementId);
    if (!grid) return;

    const items = products.filter(p => p.category === cat);
    
    items.forEach(p => {
        const card = createCardElement(p);
        grid.appendChild(card);
    });
}

function createCardElement(p) {
    const div = document.createElement('div');
    div.className = 'card';
    // QUI STA LA MAGIA: Cliccando apre openModal invece di IG
    div.onclick = () => openModal(p); 

    div.innerHTML = `
        <div class="card-img">
            <img src="${p.img}" alt="${p.name}">
        </div>
        <div class="card-info">
            <div class="card-name">${p.name}</div>
            <div class="card-price">€${p.price}</div>
        </div>
    `;
    return div;
}

// --- LOGICA MODALE PRODOTTO ---
const modal = document.getElementById('product-modal');

function openModal(product) {
    // Popola i dati
    document.getElementById('m-img').src = product.img;
    document.getElementById('m-title').innerText = product.name;
    document.getElementById('m-price').innerText = "€" + product.price;
    document.getElementById('m-desc').innerText = product.desc;
    
    // Imposta il link per il bottone acquista
    const btn = document.getElementById('m-buy-btn');
    btn.onclick = () => {
        const msg = `Ciao, voglio acquistare: ${product.name} (€${product.price})`;
        window.open(`https://ig.me/m/luxury.thread_?text=${encodeURIComponent(msg)}`, '_blank');
    };

    // Mostra modale
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Blocca lo scroll del sito sotto
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Riabilita scroll
}

// Chiudi se clicchi fuori dalla parte bianca
window.onclick = (event) => {
    if (event.target == modal) {
        closeModal();
    }
}

// --- LOGICA RICERCA (FULLSCREEN) ---
function openSearch() {
    document.getElementById('search-overlay').style.display = 'flex';
    document.getElementById('search-input').focus();
    document.body.style.overflow = 'hidden';
}

function closeSearch() {
    document.getElementById('search-overlay').style.display = 'none';
    document.getElementById('search-results').innerHTML = ''; // Pulisci risultati
    document.getElementById('search-input').value = '';
    document.body.style.overflow = 'auto';
}

function performSearch() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Reset

    if(query.length < 2) return;

    const found = products.filter(p => p.name.toLowerCase().includes(query));

    found.forEach(p => {
        const card = createCardElement(p); // Riutilizza la funzione crea card
        resultsContainer.appendChild(card);
    });

    if(found.length === 0) {
        resultsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">NESSUN RISULTATO</p>';
    }
}

// --- LOGICA BOT ---
function toggleBot() {
    const win = document.getElementById('bot-window');
    const trigger = document.getElementById('bot-trigger');
    
    if (win.style.display === 'block') {
        win.style.display = 'none';
        trigger.style.opacity = '1';
    } else {
        win.style.display = 'block';
        trigger.style.opacity = '0';
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

    if(!email || !model) {
        alert("Inserisci i dati richiesti.");
        return;
    }

    const dest = "personal.drop.ship0@gmail.com";
    const sub = `SOURCING: ${model}`;
    const body = `Modello: ${model}\nTaglia: ${size}\nEmail: ${email}`;

    window.location.href = `mailto:${dest}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
    toggleBot();
}
