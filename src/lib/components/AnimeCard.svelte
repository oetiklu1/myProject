<script>
  import { enhance } from "$app/forms";
  export let anime;
</script>

<div class="anime-card">
  <a href={"/animes/" + anime._id} class="poster">
    <img src={anime.poster} alt={anime.title} />
    <div class="rating">★ {anime.rating}</div>
  </a>
  
  <div class="content">
    <h3><a href={"/animes/" + anime._id}>{anime.title}</a></h3>
    
    <div class="info">
      <div class="meta">
        <span>Year: {anime.year}</span>
        <span>Episodes: {anime.episodes}</span>
      </div>
      <p class="description">{anime.description?.slice(0, 100)}...</p>
    </div>
    <form 
      method="POST" 
      action={anime.watchlist ? "?/removeFromWatchlist" : "?/addToWatchlist"}
      use:enhance
    >
      <input type="hidden" name="id" value={anime._id} />
      <button class="watchlist-btn" class:on-list={anime.watchlist}>
        {anime.watchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </button>
    </form>
  </div>
</div>

<style>
  .anime-card {
    background: #1a1a1a;
    border: 1px solid #ff00ff;
    border-radius: 8px;
    overflow: hidden;
    height: 100%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }

  .anime-card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 12px rgba(255, 0, 255, 0.4);
  }

  .poster {
    position: relative;
    display: block;
    aspect-ratio: 3/4;
  }

  .poster img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .rating {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(0, 0, 0, 0.7);
    color: #ffd700;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: bold;
  }

  .content {
    padding: 1rem;
  }

  h3 {
    margin: 0 0 0.5rem;
  }

  h3 a {
    color: #ff00ff;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  h3 a:hover {
    color: #00ffcc;
  }

  .meta {
    display: flex;
    gap: 1rem;
    color: #aaa;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .description {
    color: #bbb;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .watchlist-btn {
    width: 100%;
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    background: #ff00ff;
    color: #000;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.2s;
    font-weight: bold;
    text-transform: uppercase;
  }

  .watchlist-btn:hover {
    background: #00ffcc;
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 255, 204, 0.4);
  }

  .watchlist-btn.on-list {
    background: #cc6666;
  }

  .watchlist-btn.on-list:hover {
    background: #cc9999;
  }
</style>