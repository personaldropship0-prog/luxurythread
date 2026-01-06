/* DATABASE PRODOTTI 
   Ho aggiornato le immagini per essere più "Streetwear" e specifiche.
*/

const products = [
    // --- TRENDING (5 Prodotti) ---
    { 
        id: 1, category: 'trending', name: "JORDAN 4 BLACK MILITARY", price: 450, 
        img: "https://si.geilicdn.com/open1848188377-1848188377-605e00000192c797c77e0a22d234-unadjust_800_800.gif", 
        desc: "Best seller. Sneaker iconica in colorazione Military Black. Autenticità garantita al 100%." 
    },
    { 
        id: 2, category: 'trending', name: "CORTEIZ ALCATRAZ HOODIE", price: 280, 
        img: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800&auto=format&fit=crop", // Foto hoodie bianca generica streetwear
        desc: "Felpa pesante con stampa iconica Alcatraz. Fit boxy, alta grammatura." 
    },
    { 
        id: 3, category: 'trending', name: "NIKE DUNK LOW PANDA", price: 180, 
        img: "https://images.unsplash.com/photo-1637844527273-df6881478839?q=80&w=800&auto=format&fit=crop", 
        desc: "La scarpa più versatile. Colorazione bianco/nera classica." 
    },
    { 
        id: 4, category: 'trending', name: "STUSSY 8 BALL FLEECE", price: 220, 
        img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop", // Foto outfit streetwear
        desc: "Giacca in pile reversibile con logo 8 Ball sulla schiena." 
    },
    { 
        id: 5, category: 'trending', name: "TRAVIS SCOTT J1 OLIVE", price: 1100, 
        img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=800&auto=format&fit=crop", 
        desc: "Collaborazione esclusiva Travis Scott. Swoosh rovesciato e materiali premium." 
    },

    // --- CINTURE (6 Prodotti) ---
    { 
        id: 6, category: 'belts', name: "DIESEL 1DR BELT", price: 120, 
        img: "https://si.geilicdn.com/open1848188377-1848188377-605e00000192c797c77e0a22d234-unadjust_800_800.gif", 
        desc: "Cintura in pelle con maxi logo D metallico." 
    },
    { 
        id: 7, category: 'belts', name: "GUCCI GG MARMONT", price: 390, 
        img: "https://si.geilicdn.com/pcitem1861886529-712c0000018fea87b0e00a20e273-unadjust_923_923.png", 
        desc: "L'iconica cintura GG. Pelle nera martellata." 
    },
    { 
        id: 8, category: 'belts', name: "HERMES H BUCKLE", price: 780, 
        img: "https://images.unsplash.com/photo-1605763240004-7e93b172d754?q=80&w=800&auto=format&fit=crop", 
        desc: "Eleganza senza tempo. Fibbia H placcata oro." 
    },
    { 
        id: 9, category: 'belts', name: "LV MONOGRAM BELT", price: 490, 
        img: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=800&auto=format&fit=crop", 
        desc: "Canvas Monogram classico con fibbia LV." 
    },
    { 
        id: 10, category: 'belts', name: "FERRAGAMO GANCINI", price: 350, 
        img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop", 
        desc: "Cintura reversibile con fibbia Gancini." 
    },
    { 
        id: 11, category: 'belts', name: "BOTTEGA VENETA", price: 450, 
        img: "https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=800&auto=format&fit=crop", 
        desc: "Pelle intrecciata motivo signature." 
    },

    // --- PORTAFOGLI (3 Prodotti) ---
    { 
        id: 12, category: 'wallets', name: "LV POCKET ORGANIZER", price: 320, 
        img: "https://si.geilicdn.com/wdseller169153426-4802000001872c2910950a2313df_2560_1920.jpg", 
        desc: "Il portacarte definitivo. Canvas Eclipse." 
    },
    { 
        id: 13, category: 'wallets', name: "GOYARD SAINT SULPICE", price: 450, 
        img: "https://si.geilicdn.com/pcitem1910834196-5e29000001938d26256f0a2395a3_2560_3413.jpg", 
        desc: "Pattern Goyardine verde. Esclusivo e raro." 
    },
    { 
        id: 14, category: 'wallets', name: "PRADA CARD HOLDER", price: 290, 
        img: "https://si.geilicdn.com/open1687670541-252808396-48810000019a4dcecb360a23b491_1152_1152.jpg", 
        desc: "Pelle Saffiano nera con logo triangolo." 
    },

    // --- BORSELLI (1 Prodotto) ---
    { 
        id: 15, category: 'bags', name: "PRADA RE-NYLON BAG", price: 1100, 
        img: "https://si.geilicdn.com/open1687670541-252808396-0b160000019a521ee8a30a231226_800_800.jpg", 
        desc: "Tracolla in nylon rigenerato. Icona street-luxury." 
    }
];

/* === INIZIALIZZAZIONE === */
document.addEventListener("DOMContentLoaded", () => {
    // Carica la home di default
    renderGrid('trending');
});

/* === TAB SYSTEM === */
function switchTab(category, btnElement) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
    renderGrid(category);
}

function renderGrid(category) {
    const grid = document.getElementById('main-grid');
    grid.innerHTML = ''; 

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

/* === SEARCH LOGIC === */
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
        resDiv.innerHTML = `
            <div class="no-res-box">
                <p>NESSUN RISULTATO PER "${query}"</p>
                <button onclick="goToSourcingFromSearch()">RICHIESTA SOURCING</button>
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
    toggleBot();
    showSourcing();
}

/* === MODAL & BOT === */
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
    document.body.style.overflow = 'hidden';
}

function closeModal() { 
    modal.style.display = 'none'; 
    document.body.style.overflow = 'auto';
}

// Bot logic
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
    
    if(!email || !model) return alert('Compila i campi richiesti.');
    
    window.location.href = `mailto:personal.drop.ship0@gmail.com?subject=SOURCING ${model}&body=Richiesta modello: ${model}, Email: ${email}`;
    toggleBot();
}






