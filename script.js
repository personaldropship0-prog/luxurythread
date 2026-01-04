// DATABASE PRODOTTI (Simulato)
const products = [
    { id: 1, name: "Jordan 1 Retro High OG", category: "sneakers", price: 450, img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80", desc: "Iconica silhouette Chicago colorway. Pelle premium." },
    { id: 2, name: "Yeezy Boost 350 V2", category: "sneakers", price: 320, img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=800&q=80", desc: "Comfort imbattibile con tecnologia Boost." },
    { id: 3, name: "Supreme Box Logo Hoodie", category: "hoodies", price: 800, img: "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?auto=format&fit=crop&w=800&q=80", desc: "Il classico streetwear. Heavyweight cotton." },
    { id: 4, name: "Essentials Fear of God", category: "hoodies", price: 180, img: "https://images.unsplash.com/photo-1556906781-9a412961d28c?auto=format&fit=crop&w=800&q=80", desc: "Minimalismo di lusso. Oversized fit." },
    { id: 5, name: "Gallery Dept. Flared Sweatpants", category: "pants", price: 450, img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80", desc: "Hand painted vintage wash." },
    { id: 6, name: "Chrome Hearts Ring", category: "accessories", price: 650, img: "https://images.unsplash.com/photo-1617038224558-2834fd2d6323?auto=format&fit=crop&w=800&q=80", desc: "Argento sterling .925 lavorato a mano a LA." }
];

// INIT
document.addEventListener("DOMContentLoaded", () => {
    renderProducts(products);
    
    // --- FUNZIONE SCROLL ANIMATA ---
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        const homeBtn = document.querySelector('.floating-home-btn');
        const scrollPosition = window.scrollY;

        // Se scorri giù più di 100px
        if (scrollPosition > 100) {
            header.classList.add('hidden');       // Nascondi Header (va su)
            homeBtn.classList.add('visible');     // Mostra Tasto Home (da sotto)
        } else {
            // Se sei tornato in cima
            header.classList.remove('hidden');    // Mostra Header (torna giù)
            homeBtn.classList.remove('visible');  // Nascondi Tasto Home
        }
    });
});

// FUNZIONE PER TORNARE SU (Collegata al nuovo tasto Home)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// RENDER GRID
function renderProducts(list) {
    const grid = document.getElementById('products-grid');
    const noResults = document.getElementById('no-results');
    grid.innerHTML = "";

    if (list.length === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
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
}

// FILTRI
function filterProducts(category) {
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    if (category === 'all') renderProducts(products);
    else renderProducts(products.filter(p => p.category === category));
}

// SEARCH
function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    renderProducts(filtered);
    
    // Se siamo nella single view, chiudiamola per mostrare i risultati
    goBackToHome();
}
// Enter key su search
document.getElementById('searchInput').addEventListener("keyup", function(event) {
    if (event.key === "Enter") performSearch();
});

// NAVIGAZIONE PAGINE (SPA Logic)
function openProduct(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    // Popola dati
    document.getElementById('detail-img').src = p.img;
    document.getElementById('detail-title').innerText = p.name;
    document.getElementById('detail-desc').innerText = p.desc;
    document.getElementById('detail-price').innerText = "€" + p.price;
    document.getElementById('detail-category').innerText = p.category.toUpperCase();

    // Switch view
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('single-product-page').style.display = 'block';
    
    // Scrolla in cima
    window.scrollTo(0,0);
}

function goBackToHome() {
    document.getElementById('single-product-page').style.display = 'none';
    document.getElementById('home-view').style.display = 'block';
}

function goHome() {
    goBackToHome();
    filterProducts('all');
    // Resetta tasto all attivo
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    document.querySelector('.filters button:first-child').classList.add('active');
    scrollToTop();
}

// POPUP & MODALS
function contactForProduct(type) {
    const title = document.getElementById('detail-title').innerText;
    let msg = "";
    if (type === 'buy') msg = `Ciao, sono interessato ad acquistare: ${title}. È ancora disponibile?`;
    else msg = `Ciao, vorrei maggiori info su: ${title}.`;

    document.getElementById('popup-text').innerText = msg;
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() { document.getElementById('popup').style.display = 'none'; }

function openInstagram() {
    window.open("https://instagram.com/luxury.thread_", "_blank");
    closePopup();
}

// SOURCING MODAL
function openSourcingModal() { document.getElementById('sourcing-modal').style.display = 'flex'; }
function closeSourcingModal() { document.getElementById('sourcing-modal').style.display = 'none'; }

function sendSourcingRequest() {
    const model = document.getElementById('src-model').value;
    const size = document.getElementById('src-size').value;
    if(!model) { alert("Inserisci il modello"); return; }
    
    const msg = `Ciao, richiesta sourcing VIP per: ${model} (Taglia: ${size})`;
    window.open(`https://ig.me/m/luxury.thread_?text=${encodeURIComponent(msg)}`, "_blank");
    closeSourcingModal();
}

// REVIEWS MODAL
function openReviewsModal() { document.getElementById('reviews-modal').style.display = 'flex'; }
function closeReviewsModal() { document.getElementById('reviews-modal').style.display = 'none'; }

// DARK MODE TOGGLE
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}
