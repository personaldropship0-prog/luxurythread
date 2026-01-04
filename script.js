/* --- DATI PRODOTTI STREETWEAR (Esempio) --- */
const products = [
    { id:1, name: "Jordan 1 Retro High Mocha", price: "€480", category: "sneakers", img: "img/shoe1.jpg" },
    { id:2, name: "Yeezy Boost 350 V2 Onyx", price: "€320", category: "sneakers", img: "img/shoe2.jpg" },
    { id:3, name: "Essentials Hoodie Fear of God", price: "€140", category: "hoodies", img: "img/hoodie1.jpg" },
    { id:4, name: "Travis Scott x Jordan 1 Low", price: "€1250", category: "sneakers", img: "img/shoe3.jpg" },
    { id:5, name: "Palm Angels Track Pants", price: "€290", category: "pants", img: "img/pants1.jpg" },
    { id:6, name: "Supreme Box Logo Crewneck", price: "€350", category: "hoodies", img: "img/hoodie2.jpg" },
    { id:7, name: "Chrome Hearts Trucker Hat", price: "€450", category: "accessories", img: "img/acc1.jpg" },
    { id:8, name: "Dunk Low Panda", price: "€180", category: "sneakers", img: "img/shoe4.jpg" },
];

/* --- ELEMENTI DOM --- */
const grid = document.getElementById('product-grid');
const noResults = document.getElementById('no-results');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const themeBtn = document.getElementById('footer-theme-btn');
const body = document.body;

/* Viste */
const homeView = document.getElementById('home-view');
const productView = document.getElementById('single-product-view');

/* Elementi Dettaglio */
const detailImg = document.getElementById('detail-img');
const detailTitle = document.getElementById('detail-title');
const detailPrice = document.getElementById('detail-price');
const detailCategory = document.getElementById('detail-category');

/* Modali */
const modalOverlay = document.getElementById('sourcing-modal'); // Riutilizzato per overlay generico
const sourcingModal = document.getElementById('sourcing-modal');
const reviewsModal = document.getElementById('reviews-modal');

/* Header e Ticker Scroll Logic */
const mainHeader = document.querySelector('.main-header');
const newsTicker = document.querySelector('.news-ticker');
let lastScrollY = window.scrollY;

/* --- INIZIALIZZAZIONE --- */
renderProducts(products);

/* --- SCROLL: NASCONDE MENU E TICKER --- */
window.addEventListener('scroll', () => {
    // Se scorri giù per più di 50px
    if (window.scrollY > 50) {
        if (window.scrollY > lastScrollY) {
            // SCROLL GIÙ: Nascondi
            mainHeader.classList.add('hidden');
            newsTicker.classList.add('hidden');
        } else {
            // SCROLL SU: Mostra
            mainHeader.classList.remove('hidden');
            newsTicker.classList.remove('hidden');
        }
    } else {
        // In cima: Mostra
        mainHeader.classList.remove('hidden');
        newsTicker.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
});

/* --- LOGICA FILTRI --- */
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Gestione classe active
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const cat = btn.dataset.filter;
        
        if (cat === 'all') {
            renderProducts(products);
        } else {
            const filtered = products.filter(p => p.category === cat);
            renderProducts(filtered);
        }
    });
});

/* --- LOGICA RICERCA --- */
if(searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(term));
        renderProducts(filtered);
    });
}

/* --- RENDER PRODOTTI --- */
function renderProducts(list) {
    grid.innerHTML = '';
    
    if(list.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    noResults.style.display = 'none';

    list.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openProduct(p);
        
        card.innerHTML = `
            <img src="${p.img}" alt="${p.name}" class="card-img" onerror="this.src='https://via.placeholder.com/300?text=No+Image'">
            <div class="card-details">
                <h3>${p.name}</h3>
                <div class="price">${p.price}</div>
            </div>
        `;
        grid.appendChild(card);
    });
}

/* --- APERTURA SCHEDA PRODOTTO --- */
function openProduct(p) {
    detailImg.src = p.img;
    // Fallback immagine se non esiste
    detailImg.onerror = function() { this.src = 'https://via.placeholder.com/500?text=Image+N/A'; };
    
    detailTitle.textContent = p.name;
    detailPrice.textContent = p.price;
    detailCategory.textContent = p.category.toUpperCase();

    // Nascondi home, mostra prodotto
    homeView.style.display = 'none';
    productView.style.display = 'block';
    
    window.scrollTo(0,0);
}

function closeProduct() {
    productView.style.display = 'none';
    homeView.style.display = 'block';
}

/* --- GESTIONE LOGO --- */
function goHome() {
    closeProduct();
    window.scrollTo({top: 0, behavior: 'smooth'});
}

/* --- MODALI --- */
function openSourcingModal() {
    document.getElementById('sourcing-modal').style.display = 'flex';
}
function closeSourcingModal() {
    document.getElementById('sourcing-modal').style.display = 'none';
}

function openReviewsModal() {
    document.getElementById('reviews-modal').style.display = 'flex';
}
function closeModal() {
    document.querySelectorAll('.popup-overlay').forEach(el => el.style.display = 'none');
}

/* --- THEME TOGGLE --- */
themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

/* --- SOCIAL --- */
function openInstagram() {
    window.open('https://instagram.com', '_blank');
}
