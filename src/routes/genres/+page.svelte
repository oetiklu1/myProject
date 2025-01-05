<script>
  import GenreCard from '$lib/components/GenreCard.svelte';
  export let data;
</script>

<div class="container my-4">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h2 class="text-black">Anime Genres</h2>
    <a href="/genres/create" class="btn btn-primary">Add New Genre</a>
  </div>

  <div class="row row-cols-1 row-cols-md-3 g-4">
    {#each data.genres as genre}
      <div class="col">
        <GenreCard {genre} />
      </div>
    {/each}
  </div>
</div>