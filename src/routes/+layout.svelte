<!-- Navbar -->
<nav class="navbar navbar-expand-lg">
  <div class="container">
    <!-- Logo -->
    <a class="navbar-brand" href="/" style="font-weight: bold; font-size: 2rem; color: #0ff;">
      Ani<span style="color: #f0f;">Buddy</span>
    </a>
    
    <!-- Toggle Button -->
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Navigation Items -->
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link text-uppercase fw-bold" href="/animes">Animes</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-uppercase fw-bold" href="/genres">Genres</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-uppercase fw-bold" href="/studios">Studios</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<slot />

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

  .navbar {
    background-color: #0a0a0a;
    padding: 1rem;
    border-bottom: 2px solid #0ff;
    box-shadow: 0 0 10px #0ff;
  }

  .navbar-brand {
    text-transform: uppercase;
    font-family: 'Orbitron', sans-serif;
    letter-spacing: 2px;
  }

  .navbar-toggler {
    border: 1px solid #0ff;
  }

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 255, 255, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  }

  .nav-link {
    color: #fff !important;
    font-size: 1.1rem;
    transition: color 0.2s ease;
    padding: 0.5rem 1rem !important;
    font-family: 'Orbitron', sans-serif;
  }

  .nav-link:hover {
    color: #0ff !important;
    text-shadow: 0 0 5px #0ff;
  }

  @media (max-width: 991px) {
    .navbar-collapse {
      background-color: #0a0a0a;
      padding: 1rem;
      margin-top: 1rem;
      box-shadow: 0 0 10px #0ff;
    }
    
    .navbar-nav {
      gap: 1rem;
    }
  }
</style>