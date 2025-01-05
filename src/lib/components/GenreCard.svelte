<!-- lib/components/GenreCard.svelte -->
<script>
    export let genre;
  </script>
  
  <div class="genre-card">
    <a href={"/genres/" + genre._id}>
      <div class="content">
        <h3>{genre.genre}</h3>
        <p class="description">{genre.description}</p>
      </div>
    </a>
  </div>
  
  <style>
    .genre-card {
      background: #2a2a2a;
      border-radius: 8px;
      overflow: hidden;
      height: 100%;
      transition: transform 0.2s;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    }
  
    .genre-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 12px rgba(0, 0, 0, 0.5);
    }
  
    .content {
      padding: 1.5rem;
    }
  
    h3 {
      color: #cc66cc;
      margin: 0 0 1rem 0;
    }
  
    .description {
      color: #bbb;
      font-size: 0.9rem;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  
    a {
      text-decoration: none;
    }
  </style>