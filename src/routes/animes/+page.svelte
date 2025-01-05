<script>
  import AnimeCard from "$lib/components/AnimeCard.svelte";
  /** @type {import('./$types').PageData} */
  export let data;
  let filterByWatchlist = false;

  $: {
    console.log("Client-side data:", data); // Debug output
    console.log("Animes:", data.animes); // Debug output
  }

  $: animes = filterByWatchlist 
    ? data.animes.filter((anime) => anime.watchlist)
    : data.animes;
</script>

<div class="d-flex justify-content-between align-items-center mb-3">
  <h1 class="text-black">Animes</h1>
  <div class="d-flex align-items-center">
    <div class="form-check form-check-inline me-2">
      <input
        class="form-check-input"
        type="checkbox"
        id="filter"
        bind:checked={filterByWatchlist}
      />
      <label class="form-check-label" for="filter">
        Show only animes on watchlist
      </label>
    </div>
    <a href="/animes/create" class="btn btn-primary">Add New Anime</a>
  </div>
</div>

<div class="row mt-3">
  {#each animes as anime}
    <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
      <AnimeCard {anime}></AnimeCard>
    </div>
  {/each}
</div>

<style>
  .form-check-inline {
    display: flex;
    align-items: center;
  }
</style>