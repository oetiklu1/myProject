<!-- routes/genres/[genre_id]/+page.svelte -->
<script>
  import { enhance } from "$app/forms";
  export let data;
 </script>
 
 <div class="container my-4">
  <button class="btn btn-secondary mb-4" on:click={() => (window.location.href = "/genres")}>← Back</button>
 
  {#if data.genre}
    <div class="genre-header">
      <h1>{data.genre.genre}</h1>
      <p class="description">{data.genre.description}</p>
 
      <form method="POST" action="?/delete" use:enhance>
        <input type="hidden" name="id" value={data.genre._id} />
        <button class="btn btn-danger">Delete Genre</button>
      </form>
    </div>
 
    {#if data.animes && data.animes.length > 0}
      <div class="anime-grid mt-4">
        <div class="row g-4">
          {#each data.animes as anime}
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <div class="anime-card">
                <a href="/animes/{anime._id}">
                  <img src={anime.poster} alt={anime.title} class="anime-image" />
                  <div class="anime-info">
                    <h3>{anime.title}</h3>
                    <div class="meta">
                      <span>Year: {anime.year}</span>
                      <span>Rating: {anime.rating}</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {:else}
      <div class="alert">No animes found for this genre.</div>
    {/if}
  {:else}
    <div class="alert alert-danger">Genre nicht gefunden</div>
  {/if}
 </div>
 
 <style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.7);
    animation: fadeIn 0.5s ease-in-out;
  }
 
  .genre-header {
    background: #2a2a2a;
    padding: 2rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    color: #fff;
  }
 
  .description {
    color: #bbb;
    font-size: 1.1rem;
    margin: 1rem 0 2rem 0;
  }
 
  .anime-card {
    background: #2a2a2a;
    border-radius: 8px;
    overflow: hidden;
    height: 100%;
    transition: transform 0.2s;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }
 
  .anime-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.5);
  }
 
  .anime-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
 
  .anime-info {
    padding: 1rem;
  }
 
  h3 {
    color: #fff;
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
  }
 
  .meta {
    color: #aaa;
    font-size: 0.9rem;
    display: flex;
    gap: 1rem;
  }
 
  a {
    text-decoration: none;
  }
 
  .alert {
    background: #2a2a2a;
    color: #fff;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
  }
 
  .btn {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    transition: background-color 0.2s ease, transform 0.2s ease;
    font-weight: bold;
    text-transform: uppercase;
  }
 
  .btn-danger {
    background: #dc3545;
    color: white;
  }
 
  .btn-danger:hover {
    background: #c82333;
  }
 
  .btn-secondary {
    background: #6c757d;
    color: white;
  }
 
  .btn-secondary:hover {
    background: #5a6268;
  }
 
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
 </style>