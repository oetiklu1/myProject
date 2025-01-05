<script>
  import { enhance } from "$app/forms";
  export let data;

  function getAnimeGenres(anime) {
  if (!anime?.genres || anime.genres.length === 0) return "No genres";
  return anime.genres.map(g => g.genre).join(", ");
}

function getAnimeStudio(anime) {
  if (!anime?.studio) return "Unknown Studio";
  return anime.studio.studio || "Unknown Studio";
}

  function handleRatingSubmit(event) {
    return async ({ result }) => {
      if (result.type === "success") {
        window.location.reload();
      }
    };
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleString();
  }
</script>

<div class="container">
  <button class="btn btn-secondary mb-4" on:click={() => (window.location.href = "/animes")}>← Back</button>

  <h1 class="mb-4">{data.anime.title}</h1>
  <div class="row">
    <div class="col-md-3">
      <img class="img-fluid rounded" src={data.anime.poster} alt="{data.anime.title} poster" />
    </div>

    <div class="col-md-9">
      <div class="anime-info">
        <p><strong>Year:</strong> {data.anime.year}</p>
        <p><strong>Episodes:</strong> {data.anime.episodes}</p>
        <p><strong>Rating:</strong> {data.anime.rating}</p>
        <p><strong>Description:</strong> {data.anime.description}</p>
        <p><strong>Genres:</strong> {getAnimeGenres(data.anime)}</p>
        <p><strong>Studio:</strong> {getAnimeStudio(data.anime)}</p>

        <form method="POST" action="?/delete" use:enhance>
          <input type="hidden" name="id" value={data.anime._id} />
          <button class="btn btn-danger">Delete Anime</button>
        </form>
      </div>
    </div>
  </div>

  <div class="anime-details mt-5">
    <h2>Rate this Anime</h2>
    <form method="POST" action="?/addRating" use:enhance={handleRatingSubmit} class="rating-form">
      <div class="stars">
        {#each Array(5) as _, i}
          <input type="radio" id="star{i + 1}" name="rating" value={5 - i} required />
          <label for="star{i + 1}">★</label>
        {/each}
      </div>
      <textarea
        name="comment"
        placeholder="Give your Rating..."
        required
        minlength="3"
        maxlength="1000"
        class="comment-input"
      ></textarea>
      <button type="submit" class="btn btn-primary">Send Rating</button>
    </form>

    <div class="ratings-list mt-4">
      <h3>User Ratings</h3>
      {#if data.ratings && data.ratings.length > 0}
        {#each data.ratings as rating}
          <div class="rating-item">
            <div class="stars">
              {#each Array(5) as _, i}
                <span class="star">{i < rating.rating ? "★" : "☆"}</span>
              {/each}
            </div>
            <p class="rating-comment">{rating.comment}</p>
            <small class="rating-date">{formatDate(rating.timestamp)}</small>
          </div>
        {/each}
      {:else}
        <p>No ratings yet. Be the first to rate!</p>
      {/if}
    </div>
  </div>
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

  .anime-info p {
    margin-bottom: 0.5rem;
    color: #000000;
  }

  .rating-form {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #0d0d0d;
    border-radius: 8px;
    color: #00ffcc;
  }

  .stars {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }

  .stars input {
    display: none;
  }

  .stars label {
    cursor: pointer;
    padding: 5px;
    color: #ddd;
    font-size: 24px;
    transition: color 0.2s ease;
  }

  .stars label:hover,
  .stars label:hover ~ label,
  .stars input:checked ~ label {
    color: #ff00ff;
  }

  .comment-input {
    width: 100%;
    margin: 1rem 0;
    padding: 0.75rem;
    background: #2a2a2d;
    border: 1px solid #444;
    color: #00ffcc;
    border-radius: 4px;
    resize: vertical;
    min-height: 100px;
  }

  .rating-item {
    margin: 1rem 0;
    padding: 1.5rem;
    background: #0d0d0d;
    border-radius: 8px;
    color: #00ffcc;
  }

  .rating-item .stars {
    color: #ff00ff;
    margin-bottom: 0.5rem;
    justify-content: flex-start;
    flex-direction: row;
  }

  .rating-item .star {
    color: #ff00ff;
    font-size: 20px;
    margin-right: 2px;
  }

  .rating-comment {
    margin: 0.5rem 0;
    color: #00ffcc;
  }

  .rating-date {
    color: #ffffff;
    font-size: 0.9rem;
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

  .btn-primary {
    background: #ff00ff;
    color: #0d0d0d;
  }

  .btn-primary:hover {
    background: #00ffff;
    transform: scale(1.05);
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