/* --- DATI PRODOTTI FITTIZI --- */
const products = [
    { id:1, name: "Calacatta Gold", price: "€120.00", category: "marble", img: "img/p1.jpg", verified: true, badges:["Best Seller"] },
    { id:2, name: "Nero Marquinia", price: "€95.00", category: "marble", img: "img/p2.jpg", verified: true, badges:[] },
    { id:3, name: "Travertino Classico", price: "€80.00", category: "travertine", img: "img/p3.jpg", verified: false, badges:["Nuovo Arrivo"] },
    { id:4, name: "Statuario Venato", price: "€150.00", category: "marble", img: "img/p4.jpg", verified: true, badges:["Premium"] },
    { id:5, name: "Onyx Pink", price: "€210.00", category: "onyx", img: "img/p5.jpg", verified: true, badges:["Raro"] },
    { id:6, name: "Granito Alaska", price: "€75.00", category: "granite", img: "img/p6.jpg", verified: false, badges:[] },
    { id:7, name: "Arabescato", price: "€130.00", category: "marble", img: "img/p7.jpg", verified: true, badges:[] },
    { id:8, name: "Blue Bahia", price: "€180.00", category: "granite", img: "img/p8.jpg", verified: true, badges:["Esclusivo"] },
];

/* --- ELEMENTI DOM --- */
const grid = document.getElementById('product-grid');
const noResults = document.getElementById('no-results');
const searchInput = document.getElementById('search-input');
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
const detailBadges = document.getElementById('detail-badges');

/* Modali */
const modalOverlay = document.getElementById('modal-overlay');
const buyModal = document.getElementById('buy-modal');
const reviewsModal = document.getElementById('reviews-modal');

/* Header e Ticker */
const mainHeader = document.querySelector('.main-header');
const newsTicker = document.querySelector('.news-ticker');
let lastScrollY = window.scrollY;

/* --- INIZIALIZZAZIONE --- */
renderProducts(products);

/* --- SCROLL LOGIC: Nasconde Header e Ticker --- */
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        if (window.scrollY > lastScrollY) {
            // SCROLL GIÙ: Nascondi tutto
            mainHeader.classList.add('hidden');
            if(newsTicker) newsTicker.classList.add('hidden');
        } else {
            // SCROLL SU: Mostra tutto
            mainHeader.classList.remove('hidden');
            if(newsTicker) newsTicker.classList.remove('hidden');
        }
    } else {
        // In cima alla pagina: Mostra tutto
        mainHeader.classList.remove('hidden');
        if(newsTicker) newsTicker.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
});

/* --- FILTRI E RICERCA --- */
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        filterProducts();
    });
});

searchInput.addEventListener('input', filterProducts);

function filterProducts() {
    const category = document.querySelector('.filter-btn.active').dataset.filter;
    const term = searchInput.value.toLowerCase();

    const filtered = products.filter(p => {
        const matchesCat = (category === 'all') || (p.category === category);
        const matchesTerm = p.name.toLowerCase().includes(term);
        return matchesCat && matchesTerm;
    });

    renderProducts(filtered);
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
            <img src="${p.img}" alt="${p.name}" class="card-img">
            <div class="card-details">
                <h3>${p.name}</h3>
                <div class="price">${p.price}</div>
            </div>
        `;
        grid.appendChild(card);
    });
}

/* --- APERTURA PRODOTTO --- */
function openProduct(p) {
    // Popola Dati
    detailImg.src = p.img;
    detailTitle.textContent = p.name;
    detailPrice.textContent = p.price;
    
    // Badges
    detailBadges.innerHTML = '';
    if(p.verified) detailBadges.innerHTML += `<span class="verified-badge">Verified Stock</span>`;
    p.badges.forEach(b => {
        detailBadges.innerHTML += `<span class="badge">${b}</span>`;
    });

    // Switch View
    homeView.style.display = 'none';
    productView.style.display = 'block';
    
    // Reset scroll
    window.scrollTo(0,0);
}

function closeProduct() {
    productView.style.display = 'none';
    homeView.style.display = 'block';
    // Fix layout glitch
    window.dispatchEvent(new Event('resize'));
}

/* --- THEME TOGGLE --- */
themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    themeBtn.textContent = body.classList.contains('dark-mode') ? "Light Mode" : "Dark Mode";
});

/* --- MODALS --- */
function openBuyModal() {
    modalOverlay.style.display = 'flex';
    buyModal.style.display = 'block';
    reviewsModal.style.display = 'none';
}

function openReviewsModal() {
    modalOverlay.style.display = 'flex';
    buyModal.style.display = 'none';
    reviewsModal.style.display = 'block';
}

function closeModal() {
    modalOverlay.style.display = 'none';
}

// Chiudi cliccando fuori
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

/* --- LOGO CLICK --- */
// Ricarica la pagina o torna alla home se clicchi sul logo
document.querySelector('.logo-slot').addEventListener('click', () => {
    if(productView.style.display === 'block') {
        closeProduct();
    } else {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
});
