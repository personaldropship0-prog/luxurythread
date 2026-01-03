<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <title>Luxury Thread</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="bg"></div>

<header class="topbar">
  <div class="logo" onclick="goHome()">Luxury Thread</div>

  <div class="search-box">
    <input id="searchInput" type="text" placeholder="Cerca un prodotto o brand">
    <button onclick="searchProduct()">Cerca</button>
  </div>
</header>

<section class="hero" id="home">
  <h1 class="title-3d">LUXURY<br>THREAD</h1>
  <p class="subtitle">Curated fashion. On demand sourcing.</p>
</section>

<nav class="filters">
  <button onclick="filterProducts('all')">Tutti</button>
  <button onclick="filterProducts('scarpe')">Scarpe</button>
  <button onclick="filterProducts('maglie')">Maglie</button>
  <button onclick="filterProducts('pantaloni')">Pantaloni</button>
</nav>

<section class="products" id="products"></section>

<section id="search-results" class="search-section">
  <h2 id="search-title"></h2>

  <div id="results" class="products"></div>

  <!-- RICHIESTA PRODOTTO -->
  <div id="request-box" class="request-box">
    <p class="request-title">Non trovi quello che cerchi?</p>
    <p class="request-sub">
      Richiedi il prodotto e proveremo a renderlo disponibile per te.
    </p>

    <input id="requestInput" type="text" placeholder="Nome del prodotto">
    <textarea id="requestNote" placeholder="Dettagli (taglia, colore, brand...)"></textarea>

    <button onclick="sendRequest()">Invia richiesta</button>
  </div>

  <button class="back" onclick="goHome()">← Torna alla Home</button>
</section>

<section class="contact">
  <div class="contact-box">
    <h2>Contattaci</h2>
    <p>Per ordini, richieste e collaborazioni</p>
    <a href="https://ig.me/m/luxury.thread_" target="_blank" class="contact-btn">
      @luxury.thread_
    </a>
  </div>
</section>

<footer>
  © 2026 Luxury Thread — All rights reserved
</footer>

<script src="script.js"></script>
</body>
</html>
