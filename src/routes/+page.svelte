<script>
  export let data;
  $: ({ animes, genres, studios } = data);

  import AnimeCard1 from '$lib/components/AnimeCard1.svelte';
  import GenreCard from '$lib/components/GenreCard.svelte';
  import StudioCard from '$lib/components/StudioCard.svelte';
</script>

<main>
  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-content">
      <h1>
        <span class="glitch" data-text="AniBuddy">AniBuddy</span>
      </h1>
      <p class="cyber-subtitle">Your Gateway to Anime Excellence</p>
      <div class="cta-container">
      </div>
    </div>
    <div class="hero-grid">
      {#each animes.slice(0, 6) as anime}
        <div class="grid-item" style="background-image: url({anime.poster})"></div>
      {/each}
    </div>
  </section>

  <!-- Featured Section -->
  <section class="featured-section">
    <div class="section-header">
      <h2>Popular Animes</h2>
      <div class="neon-line"></div>
    </div>
    <div class="featured-grid">
      {#each animes.slice(0, 3) as anime}
        <AnimeCard1 {anime} />
      {/each}
    </div>
  </section>

  <!-- Genres Section -->
  <section class="genres-section">
    <div class="section-header">
      <h2>Popular Genres</h2>
      <div class="neon-line"></div>
    </div>
    <div class="genres-grid">
      {#each genres.slice(0, 3) as genre}
        <GenreCard {genre} />
      {/each}
    </div>
  </section>

  <!-- Studios Showcase -->
  <section class="studios-section">
    <div class="section-header">
      <h2>Featured Studios</h2>
      <div class="neon-line"></div>
    </div>
    <div class="studios-grid">
      {#each studios.slice(0, 3) as studio}
        <StudioCard {studio} />
      {/each}
    </div>
  </section>
</main>

<style>
  main {
    background: #0a0a0a;
    min-height: 100vh;
    color: #fff;
  }

  .hero {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 2;
  }

  .glitch {
    font-size: 4rem;
    font-weight: bold;
    text-transform: uppercase;
    position: relative;
    text-shadow: 0.05em 0 0 #ff00ff, -0.05em -0.05em 0 #00ffcc;
    animation: glitch 1s infinite;
  }

  .cyber-subtitle {
    font-size: 1.5rem;
    color: #00ffcc;
    margin: 1rem 0 2rem;
    text-shadow: 0 0 10px #00ffcc;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    padding: 1rem;
  }

  .grid-item {
    aspect-ratio: 1;
    background-size: cover;
    background-position: center;
    border: 2px solid #ff00ff;
    transition: all 0.3s ease;
  }

  .grid-item:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px #ff00ff;
  }

  .section-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .neon-line {
    height: 2px;
    background: linear-gradient(90deg, transparent, #ff00ff, #00ffcc, transparent);
    margin: 1rem auto;
    width: 200px;
  }

  .featured-grid, .genres-grid, .studios-grid {
    display: grid;
    gap: 2rem;
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  .featured-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .genres-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .studios-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  @keyframes glitch {
    0% {
      text-shadow: 0.05em 0 0 #ff00ff, -0.05em -0.05em 0 #00ffcc;
    }
    14% {
      text-shadow: 0.05em 0 0 #ff00ff, -0.05em -0.05em 0 #00ffcc;
    }
    15% {
      text-shadow: -0.05em -0.025em 0 #ff00ff, 0.025em 0.025em 0 #00ffcc;
    }
    49% {
      text-shadow: -0.05em -0.025em 0 #ff00ff, 0.025em 0.025em 0 #00ffcc;
    }
    50% {
      text-shadow: 0.025em 0.05em 0 #ff00ff, 0.05em 0 0 #00ffcc;
    }
    99% {
      text-shadow: 0.025em 0.05em 0 #ff00ff, 0.05em 0 0 #00ffcc;
    }
    100% {
      text-shadow: -0.025em 0 0 #ff00ff, -0.025em -0.025em 0 #00ffcc;
    }
  }

  @media (max-width: 768px) {
    .hero {
      grid-template-columns: 1fr;
    }
    
    .hero-grid {
      display: none;
    }
    
    .glitch {
      font-size: 3rem;
    }
  }
</style>