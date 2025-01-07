<!-- filepath: /c:/Users/lukas/Prototyping/Einzelleistungsnachweis_oetiklu1/myProject/src/routes/animes/create/+page.svelte -->
<script>
  import { enhance } from "$app/forms";
  export let data;
  let selectedGenres = [];
  let selectedStudios = [];
  let posterUrl = "/images/placeholder.jpg";
</script>

<div class="container">
  <h2 class="black-text mb-4">Create New Anime</h2>
  
  <div class="cyber-card">
    <div class="card-body">
      <form method="POST" action="?/create" use:enhance>
        <!-- Title -->
        <div class="mb-3">
          <label for="title" class="form-label neon-text">Title</label>
          <input type="text" class="cyber-input" id="title" name="title" required>
        </div>
        
        <!-- Year & Episodes in one row -->
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="year" class="form-label neon-text">Year</label>
            <input type="number" class="cyber-input" id="year" name="year" required>
          </div>
          <div class="col-md-6 mb-3">
            <label for="episodes" class="form-label neon-text">Episodes</label>
            <input type="number" class="cyber-input" id="episodes" name="episodes" required>
          </div>
        </div>

        <!-- Rating & Poster URL -->
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="rating" class="form-label neon-text">Rating</label>
            <input type="number" step="0.1" class="cyber-input" id="rating" name="rating" min="0" max="10" required>
          </div>
          <div class="col-md-6 mb-3">
            <label for="poster" class="form-label neon-text">Poster URL</label>
            <input type="text" class="cyber-input" id="poster" name="poster" bind:value={posterUrl} required>
          </div>
        </div>

        <!-- Description -->
        <div class="mb-4">
          <label for="description" class="form-label neon-text">Description</label>
          <textarea class="cyber-input" id="description" name="description" rows="4" required></textarea>
        </div>

        <!-- Genres -->
        <div class="mb-4">
          <label for="genres" class="form-label neon-text d-block">Genres</label>
          <div class="cyber-checkbox-grid">
            {#each data.genres as genre}
              <div class="cyber-checkbox">
                <input
                  type="checkbox"
                  name="genres"
                  value={genre._id}
                  id={`genre-${genre._id}`}
                  bind:group={selectedGenres}
                >
                <label for={`genre-${genre._id}`}>
                  {genre.genre}
                </label>
              </div>
            {/each}
          </div>
        </div>

        <!-- Studios -->
        <div class="mb-4">
          <label for="studios" class="form-label neon-text d-block">Studios</label>
          <div class="cyber-checkbox-grid">
            {#each data.studios as studio}
              <div class="cyber-checkbox">
                <input
                  type="checkbox"
                  name="studios"
                  value={studio._id}
                  id={`studio-${studio._id}`}
                  bind:group={selectedStudios}
                >
                <label for={`studio-${studio._id}`}>
                  {studio.studio}
                </label>
              </div>
            {/each}
          </div>
        </div>

        <div class="d-flex gap-2">
          <a href="/animes" class="cyber-button">Cancel</a>
          <button type="submit" class="cyber-button flex-grow-1">Create Anime</button>
        </div>
      </form>
    </div>
  </div>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 2rem auto;
  }
  
  .neon-text {
    color: #00ffcc;
    text-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
  }
  
  .cyber-card {
    background: #1a1a1a;
    border: 1px solid #ff00ff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(255, 0, 255, 0.2);
    padding: 2rem;
    animation: glow 2s infinite alternate;
  }
  
  @keyframes glow {
    from {
      box-shadow: 0 0 20px rgba(255, 0, 255, 0.2);
    }
    to {
      box-shadow: 0 0 30px rgba(255, 0, 255, 0.4);
    }
  }
  
  .cyber-input {
    width: 100%;
    background: #2a2a2a;
    border: 1px solid #00ffcc;
    border-radius: 4px;
    color: #ffffff;
    padding: 0.5rem;
    transition: all 0.3s ease;
  }
  
  .cyber-input:focus {
    background: #333;
    border-color: #ff00ff;
    box-shadow: 0 0 15px rgba(255, 0, 255, 0.3);
    outline: none;
  }

  .cyber-checkbox-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .cyber-checkbox {
    position: relative;
    padding: 0.5rem;
    background: #2a2a2a;
    border: 1px solid #00ffcc;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  
  .cyber-checkbox:hover {
    background: #333;
    border-color: #ff00ff;
  }
  
  .cyber-checkbox input {
    margin-right: 0.5rem;
  }
  
  .cyber-checkbox label {
    color: #00ffcc;
    cursor: pointer;
  }
  
  .cyber-button {
    background: #ff00ff;
    color: #000;
    border: none;
    padding: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .cyber-button:hover {
    background: #00ffcc;
    transform: scale(1.02);
    box-shadow: 0 0 20px rgba(0, 255, 204, 0.4);
  }
</style>